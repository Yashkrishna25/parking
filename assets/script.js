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

function getCurrentUser() {
  return JSON.parse(sessionStorage.getItem('currentUser') || 'null');
}

function setCurrentUser(user) {
  sessionStorage.setItem('currentUser', JSON.stringify(user));
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

    if (!name || !email || !password) {
      alert('All fields are required');
      return;
    }

    const users = getUsers();
    if (users.find((u) => u.email === email)) {
      alert('Email already registered');
      return;
    }

    const newUser = {
      id: Date.now(),
      name,
      email,
      password,
      isAdmin: false,
    };
    users.push(newUser);
    saveUsers(users);
    alert('Registration successful. Please login.');
    window.location.href = 'login.html';
  });
}

// ================= Login =================//
const loginForm = $('#loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = $('#loginEmail').value.trim();
    const password = $('#loginPassword').value;

    const user = getUsers().find((u) => u.email === email && u.password === password);
    if (!user) {
      alert('Invalid credentials');
      return;
    }
    setCurrentUser(user);
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
      alert('Please complete all fields');
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
      createdAt: new Date().toISOString(),
    };
    const bookings = getBookings();
    bookings.push(newBooking);
    saveBookings(bookings);

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
  } else {
    ticketContainer.innerHTML = `
      <div class="ticket slide-up">
        <h2>Parking Ticket</h2>
        <p><strong>Ticket ID:</strong> ${booking.id}</p>
        <p><strong>Slot:</strong> ${booking.slot}</p>
        <p><strong>Date:</strong> ${booking.date}</p>
        <p><strong>Time:</strong> ${booking.time}</p>
        <p><strong>Amount Paid:</strong> $${booking.amount}</p>
        <p><strong>User:</strong> ${booking.userEmail}</p>
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

  function renderBookings() {
    const bookings = getBookings();
    bookingsTableBody.innerHTML = bookings
      .map(
        (b) => `
      <tr>
        <td>${b.id}</td>
        <td>${b.userEmail}</td>
        <td>${b.slot}</td>
        <td>${b.date}</td>
        <td>${b.time}</td>
        <td>$${b.amount}</td>
      </tr>`
      )
      .join('');
  }
  renderBookings();
}

// ================= Google Sign-In (placeholder) =================//
const googleBtn = $('#googleSignIn');
if (googleBtn) {
  googleBtn.addEventListener('click', () => {
    alert('Google Sign-In is a demo placeholder. Implement OAuth to enable.');
  });
}