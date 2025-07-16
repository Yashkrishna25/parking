// ================= Utility helpers =================//
function $(selector) {
  return document.querySelector(selector);
}

function getUsers() {
  return JSON.parse(localStorage.getItem('users') || '[]');
}

function saveUsers(users) {
  localStorage.setItem('users', JSON.stringify(users));
}

function getBookings() {
  return JSON.parse(localStorage.getItem('bookings') || '[]');
}

function saveBookings(bookings) {
  localStorage.setItem('bookings', JSON.stringify(bookings));
}

// ================= Additional global helpers =================//
const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30-minute session timeout

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }[m]));
}

function isSessionExpired() {
  const expiry = parseInt(sessionStorage.getItem('sessionExpiry') || '0', 10);
  return expiry && Date.now() > expiry;
}

function renewSession() {
  sessionStorage.setItem('sessionExpiry', Date.now() + SESSION_TIMEOUT_MS);
}

function showMessage(message, type = 'error') {
  let box = document.getElementById('flashMsg');
  if (!box) {
    box = document.createElement('div');
    box.id = 'flashMsg';
    document.body.prepend(box);
  }
  box.className = `msg ${type}`;
  box.textContent = message;
  // auto-dismiss
  setTimeout(() => {
    box.remove();
  }, 4000);
}

// Invalidate expired sessions immediately on every page load
if (isSessionExpired()) {
  sessionStorage.clear();
}

function getCurrentUser() {
  if (isSessionExpired()) {
    sessionStorage.clear();
    return null;
  }
  return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
}

function setCurrentUser(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
  renewSession();
}

function ensureDefaultAdmin() {
  const users = getUsers();
  if (!users.find((u) => u.isAdmin)) {
    users.push({
      id: Date.now(),
      name: 'Admin',
      email: 'admin@park.com',
      password: 'admin123',
      isAdmin: true,
    });
    saveUsers(users);
  }
}

ensureDefaultAdmin();

// ================= Registration =================//
const registerForm = $('#registerForm');
if (registerForm) {
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#regName').value.trim();
    const email = $('#regEmail').value.trim();
    const password = $('#regPassword').value;

    // Basic validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (name.length < 3) {
      showMessage('Name must be at least 3 characters long');
      return;
    }
    if (!emailRegex.test(email)) {
      showMessage('Please enter a valid email');
      return;
    }
    if (password.length < 6) {
      showMessage('Password must be at least 6 characters');
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      showMessage('Email already registered');
      return;
    }

    const newUser = {
      id: Date.now(),
      name: escapeHTML(name),
      email: escapeHTML(email.toLowerCase()),
      password,
      isAdmin: false,
    };
    users.push(newUser);
    saveUsers(users);
    showMessage('Registration successful. Please login.', 'success');
    setTimeout(() => {
      window.location.href = 'login.html';
    }, 500);
  });
}

// ================= Login =================//
const loginForm = $('#loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#loginEmail').value.trim().toLowerCase();
    const password = $('#loginPassword').value;

    const user = getUsers().find((u) => u.email === email && u.password === password);
    if (!user) {
      showMessage('Invalid credentials');
      return;
    }
    setCurrentUser(user);
    renewSession();
    if (user.isAdmin) {
      window.location.href = 'admin.html';
    } else {
      window.location.href = 'profile.html';
    }
  });
}

// ================= Logout =================//
const logoutBtn = $('#logoutBtn');
if (logoutBtn) {
  logoutBtn.addEventListener('click', () => {
    sessionStorage.removeItem('currentUser');
    sessionStorage.removeItem('sessionExpiry');
    window.location.href = 'login.html';
  });
}

// ================= Profile =================//
const profileSection = $('#profileSection');
if (profileSection) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
  } else {
    $('#profileName').textContent = user.name;
    $('#profileEmail').textContent = user.email;

    const tableBody = document.getElementById('userBookingsBody');
    function renderUserBookings() {
      const bookings = getBookings().filter((b) => b.userEmail === user.email);
      if (!tableBody) return;
      tableBody.innerHTML = bookings
        .map(
          (b) => `
        <tr>
          <td>${b.id}</td>
          <td>${b.slot}</td>
          <td>${b.date}</td>
          <td>${b.time}</td>
          <td>${b.status || 'confirmed'}</td>
          <td>
            ${b.status === 'canceled' ? '' : `<button data-cancel="${b.id}" class="btn">Cancel</button>`}
          </td>
        </tr>`
        )
        .join('');
    }

    renderUserBookings();

    // Delegated cancel handler
    profileSection.addEventListener('click', (e) => {
      const target = e.target;
      if (target.matches('button[data-cancel]')) {
        const id = target.getAttribute('data-cancel');
        if (confirm('Are you sure you want to cancel this booking?')) {
          const bookings = getBookings();
          const booking = bookings.find((b) => b.id === id);
          if (booking) {
            booking.status = 'canceled';
            saveBookings(bookings);
            showMessage('Booking canceled', 'success');
            renderUserBookings();
          }
        }
      }
    });
  }
}

// ================= Booking =================//
const bookingForm = $('#bookingForm');
if (bookingForm) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = 'login.html';
  }

  bookingForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const slot = $('#slotNumber').value;
    const date = $('#bookDate').value;
    const time = $('#bookTime').value;

    if (!slot || !date || !time) {
      showMessage('Please complete all fields');
      return;
    }

    // Prevent booking past dates
    const selectedDate = new Date(`${date}T${time}`);
    if (selectedDate < new Date()) {
      showMessage('Cannot book a slot in the past');
      return;
    }

    // Booking conflict prevention
    const existing = getBookings().find(
      (b) => b.slot === slot && b.date === date && b.time === time && b.status !== 'canceled'
    );
    if (existing) {
      showMessage('Selected slot is already booked for that time');
      return;
    }

    const amount = 10; // flat rate for demo

    // Simulate payment success
    const bookingId = 'BK' + Date.now();
    const newBooking = {
      id: bookingId,
      userEmail: user.email,
      slot,
      date,
      time,
      amount,
      paid: true,
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };
    const bookings = getBookings();
    bookings.push(newBooking);
    saveBookings(bookings);

    renewSession();

    // redirect to ticket
    window.location.href = `ticket.html?id=${bookingId}`;
  });
}

// ================= Ticket =================//
const ticketContainer = $('#ticketContainer');
if (ticketContainer) {
  const params = new URLSearchParams(window.location.search);
  const bookingId = params.get('id');
  const booking = getBookings().find((b) => b.id === bookingId);
  if (!booking) {
    ticketContainer.innerHTML = '<p>Ticket not found.</p>';
  } else if (booking.status === 'canceled') {
    ticketContainer.innerHTML = '<p>This booking has been canceled.</p>';
  } else {
    ticketContainer.innerHTML = `
      <div class="ticket slide-up">
        <h2>Parking Ticket</h2>
        <p><strong>Ticket ID:</strong> ${escapeHTML(booking.id)}</p>
        <p><strong>Slot:</strong> ${escapeHTML(booking.slot)}</p>
        <p><strong>Date:</strong> ${escapeHTML(booking.date)}</p>
        <p><strong>Time:</strong> ${escapeHTML(booking.time)}</p>
        <p><strong>Amount Paid:</strong> $${escapeHTML(booking.amount)}</p>
        <p><strong>User:</strong> ${escapeHTML(booking.userEmail)}</p>
      </div>
    `;
  }
}

// ================= Admin =================//
const bookingsTableBody = $('#bookingsTableBody');
if (bookingsTableBody) {
  const user = getCurrentUser();
  if (!user || !user.isAdmin) {
    window.location.href = 'login.html';
  }

  const searchInput = $('#bookingSearch');

  function renderBookings(filter = '') {
    let bookings = getBookings();
    if (filter) {
      const f = filter.toLowerCase();
      bookings = bookings.filter(
        (b) =>
          b.id.toLowerCase().includes(f) ||
          b.userEmail.toLowerCase().includes(f) ||
          String(b.slot).includes(f)
      );
    }

    bookingsTableBody.innerHTML = bookings
      .map(
        (b) => `
      <tr>
        <td>${escapeHTML(b.id)}</td>
        <td>${escapeHTML(b.userEmail)}</td>
        <td>${escapeHTML(b.slot)}</td>
        <td>${escapeHTML(b.date)}</td>
        <td>${escapeHTML(b.time)}</td>
        <td>$${escapeHTML(b.amount)}</td>
        <td>${b.status || 'confirmed'}</td>
        <td>
          ${b.status === 'canceled' ? '' : `<button data-admin-cancel="${b.id}" class="btn">Cancel</button>`}
        </td>
      </tr>`
      )
      .join('');
  }

  renderBookings();

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      renderBookings(e.target.value);
    });
  }

  // Cancel booking from admin
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.matches('button[data-admin-cancel]')) {
      const id = target.getAttribute('data-admin-cancel');
      if (confirm('Cancel this booking?')) {
        const bookings = getBookings();
        const booking = bookings.find((b) => b.id === id);
        if (booking) {
          booking.status = 'canceled';
          saveBookings(bookings);
          showMessage('Booking canceled', 'success');
          renderBookings(searchInput ? searchInput.value : '');
        }
      }
    }
  });
}

// ================= Google Sign-In (placeholder) =================//
const googleBtn = $('#googleSignIn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    alert('Google Sign-In is a demo placeholder. Implement OAuth to enable.');
  });
}