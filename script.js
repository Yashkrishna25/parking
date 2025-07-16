// Global Variables
let currentUser = null;
let currentAdmin = null;
let selectedSlot = null;
let bookingData = {};
let slots = [];
let users = [];
let bookings = [];

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    loadStoredData();
    setupEventListeners();
    generateSlots();
    setMinDate();
});

// Initialize application
function initializeApp() {
    showLoading();
    setTimeout(() => {
        hideLoading();
        // Check if user is already logged in
        const savedUser = localStorage.getItem('currentUser');
        const savedAdmin = localStorage.getItem('currentAdmin');
        
        if (savedUser) {
            currentUser = JSON.parse(savedUser);
            showUserDashboard();
        } else if (savedAdmin) {
            currentAdmin = JSON.parse(savedAdmin);
            showAdminDashboard();
        } else {
            showPage('loginPage');
        }
    }, 2000);
}

// Show/Hide loading
function showLoading() {
    document.getElementById('loading').classList.add('active');
}

function hideLoading() {
    document.getElementById('loading').classList.remove('active');
}

// Page management
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    document.getElementById(pageId).classList.add('active');
}

// Load stored data
function loadStoredData() {
    // Load demo users
    if (!localStorage.getItem('users')) {
        const demoUsers = [
            {
                id: 1,
                name: 'John Doe',
                email: 'john@example.com',
                phone: '+1234567890',
                address: '123 Main St, City',
                password: 'password123',
                totalBookings: 5,
                totalSpent: 125,
                status: 'active'
            },
            {
                id: 2,
                name: 'Jane Smith',
                email: 'jane@example.com',
                phone: '+0987654321',
                address: '456 Oak Ave, Town',
                password: 'password123',
                totalBookings: 3,
                totalSpent: 75,
                status: 'active'
            }
        ];
        localStorage.setItem('users', JSON.stringify(demoUsers));
    }
    
    users = JSON.parse(localStorage.getItem('users')) || [];
    bookings = JSON.parse(localStorage.getItem('bookings')) || [];
    
    // Load demo bookings
    if (bookings.length === 0) {
        generateDemoBookings();
    }
}

// Generate demo bookings
function generateDemoBookings() {
    const demoBookings = [
        {
            id: 'PKT-001',
            userId: 1,
            userName: 'John Doe',
            slotId: 'A1',
            vehicleType: 'car',
            vehicleNumber: 'ABC-123',
            date: new Date().toISOString().split('T')[0],
            timeSlot: '10:00-12:00',
            duration: '2',
            zone: 'zone-a',
            amount: 19,
            status: 'active',
            paymentMethod: 'card',
            bookingTime: new Date().toISOString()
        },
        {
            id: 'PKT-002',
            userId: 2,
            userName: 'Jane Smith',
            slotId: 'B5',
            vehicleType: 'suv',
            vehicleNumber: 'XYZ-789',
            date: new Date(Date.now() - 86400000).toISOString().split('T')[0],
            timeSlot: '14:00-16:00',
            duration: '2',
            zone: 'zone-b',
            amount: 18,
            status: 'completed',
            paymentMethod: 'paypal',
            bookingTime: new Date(Date.now() - 86400000).toISOString()
        }
    ];
    
    bookings = demoBookings;
    localStorage.setItem('bookings', JSON.stringify(bookings));
}

// Setup event listeners
function setupEventListeners() {
    // Login forms
    document.getElementById('userLoginForm').addEventListener('submit', handleUserLogin);
    document.getElementById('adminLoginForm').addEventListener('submit', handleAdminLogin);
    document.getElementById('signupForm').addEventListener('submit', handleSignup);
    document.getElementById('profileForm').addEventListener('submit', handleProfileUpdate);
    
    // Booking form
    document.getElementById('bookingForm').addEventListener('submit', handleBookingSubmit);
    document.getElementById('paymentForm').addEventListener('submit', handlePayment);
    
    // Form change listeners
    document.getElementById('duration').addEventListener('change', updateBookingSummary);
    document.getElementById('parkingZone').addEventListener('change', updateBookingSummary);
    
    // Payment method change
    document.querySelectorAll('input[name="paymentMethod"]').forEach(radio => {
        radio.addEventListener('change', togglePaymentDetails);
    });
    
    // Card number formatting
    document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
    document.getElementById('expiryDate').addEventListener('input', formatExpiryDate);
}

// Tab switching
function switchTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.login-form').forEach(form => form.classList.add('hidden'));
    
    if (tab === 'user') {
        document.querySelector('.tab-btn').classList.add('active');
        document.getElementById('userLogin').classList.remove('hidden');
    } else {
        document.querySelectorAll('.tab-btn')[1].classList.add('active');
        document.getElementById('adminLogin').classList.remove('hidden');
    }
}

// Password toggle
function togglePassword(inputId) {
    const input = document.getElementById(inputId);
    const icon = input.nextElementSibling.querySelector('i');
    
    if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
    } else {
        input.type = 'password';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
    }
}

// Show/hide modals
function showSignup() {
    document.getElementById('signupModal').classList.add('active');
}

function closeSignup() {
    document.getElementById('signupModal').classList.remove('active');
}

function showForgotPassword() {
    showToast('Please contact admin for password reset', 'info');
}

// User login
function handleUserLogin(e) {
    e.preventDefault();
    showLoading();
    
    const email = document.getElementById('userEmail').value;
    const password = document.getElementById('userPassword').value;
    
    setTimeout(() => {
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            currentUser = user;
            localStorage.setItem('currentUser', JSON.stringify(user));
            showUserDashboard();
            showToast('Login successful!', 'success');
        } else {
            showToast('Invalid email or password', 'error');
        }
        hideLoading();
    }, 1500);
}

// Admin login
function handleAdminLogin(e) {
    e.preventDefault();
    showLoading();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const code = document.getElementById('adminCode').value;
    
    setTimeout(() => {
        if (username === 'admin' && password === 'admin123' && code === '2024') {
            currentAdmin = { username: 'admin', role: 'administrator' };
            localStorage.setItem('currentAdmin', JSON.stringify(currentAdmin));
            showAdminDashboard();
            showToast('Admin login successful!', 'success');
        } else {
            showToast('Invalid admin credentials', 'error');
        }
        hideLoading();
    }, 1500);
}

// User signup
function handleSignup(e) {
    e.preventDefault();
    
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const phone = document.getElementById('signupPhone').value;
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (password !== confirmPassword) {
        showToast('Passwords do not match', 'error');
        return;
    }
    
    if (users.find(u => u.email === email)) {
        showToast('Email already exists', 'error');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name,
        email,
        phone,
        password,
        address: '',
        totalBookings: 0,
        totalSpent: 0,
        status: 'active'
    };
    
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    
    closeSignup();
    showToast('Account created successfully! Please login.', 'success');
    
    // Auto-fill login form
    document.getElementById('userEmail').value = email;
}

// Google login (mock implementation)
function loginWithGoogle() {
    showLoading();
    setTimeout(() => {
        const mockGoogleUser = {
            id: 999,
            name: 'Google User',
            email: 'google@user.com',
            phone: '+1234567890',
            address: 'Google Address',
            totalBookings: 0,
            totalSpent: 0,
            status: 'active',
            isGoogleUser: true
        };
        
        currentUser = mockGoogleUser;
        localStorage.setItem('currentUser', JSON.stringify(mockGoogleUser));
        showUserDashboard();
        showToast('Google login successful!', 'success');
        hideLoading();
    }, 2000);
}

function handleGoogleLogin(response) {
    // Handle actual Google login response
    console.log('Google login response:', response);
    loginWithGoogle();
}

// Show user dashboard
function showUserDashboard() {
    showPage('userDashboard');
    loadUserData();
    loadUserStats();
    loadRecentBookings();
    showSection('dashboard');
}

// Show admin dashboard
function showAdminDashboard() {
    showPage('adminDashboard');
    loadAdminStats();
    loadAdminData();
    showAdminSection('adminOverview');
}

// Load user data
function loadUserData() {
    if (currentUser) {
        document.getElementById('userName').textContent = currentUser.name;
        document.getElementById('profileName').value = currentUser.name;
        document.getElementById('profileEmail').value = currentUser.email;
        document.getElementById('profilePhone').value = currentUser.phone;
        document.getElementById('profileAddress').value = currentUser.address || '';
    }
}

// Load user stats
function loadUserStats() {
    if (currentUser) {
        const userBookings = bookings.filter(b => b.userId === currentUser.id);
        const activeBookings = userBookings.filter(b => b.status === 'active');
        const totalSpent = userBookings.reduce((sum, b) => sum + b.amount, 0);
        
        document.getElementById('totalBookings').textContent = userBookings.length;
        document.getElementById('activeBookings').textContent = activeBookings.length;
        document.getElementById('totalSpent').textContent = `$${totalSpent}`;
        
        // Update user data
        currentUser.totalBookings = userBookings.length;
        currentUser.totalSpent = totalSpent;
    }
}

// Load recent bookings
function loadRecentBookings() {
    const recentBookingsList = document.getElementById('recentBookingsList');
    if (currentUser) {
        const userBookings = bookings
            .filter(b => b.userId === currentUser.id)
            .sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime))
            .slice(0, 5);
        
        if (userBookings.length === 0) {
            recentBookingsList.innerHTML = '<p>No recent bookings found.</p>';
            return;
        }
        
        recentBookingsList.innerHTML = userBookings.map(booking => `
            <div class="booking-item">
                <div class="booking-info">
                    <h4>Slot ${booking.slotId} - ${booking.zone.toUpperCase()}</h4>
                    <p>${formatDate(booking.date)} | ${booking.timeSlot} | ${booking.duration}h</p>
                </div>
                <div class="booking-amount">$${booking.amount}</div>
            </div>
        `).join('');
    }
}

// Section management
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'tickets') {
        loadTickets();
    }
}

function showAdminSection(sectionId) {
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(sectionId).classList.add('active');
    event.target.classList.add('active');
    
    if (sectionId === 'slotManagement') {
        loadAdminSlots();
    } else if (sectionId === 'bookingManagement') {
        loadAdminBookings();
    } else if (sectionId === 'userManagement') {
        loadAdminUsers();
    } else if (sectionId === 'maintenance') {
        loadMaintenanceLogs();
    }
}

// Generate parking slots
function generateSlots() {
    slots = [];
    const zones = ['A', 'B', 'C'];
    const slotsPerZone = 25;
    
    zones.forEach(zone => {
        for (let i = 1; i <= slotsPerZone; i++) {
            slots.push({
                id: `${zone}${i}`,
                zone: zone,
                status: Math.random() > 0.3 ? 'available' : 'occupied',
                type: 'standard'
            });
        }
    });
    
    updateAvailableSlotsCount();
}

// Update available slots count
function updateAvailableSlotsCount() {
    const availableCount = slots.filter(s => s.status === 'available').length;
    document.getElementById('availableSlots').textContent = availableCount;
}

// Load slots in booking section
function loadBookingSlots() {
    const slotGrid = document.getElementById('slotGrid');
    const availableSlots = slots.filter(s => s.status === 'available').slice(0, 20);
    
    slotGrid.innerHTML = availableSlots.map(slot => `
        <div class="slot ${slot.status}" onclick="selectSlot('${slot.id}')">
            ${slot.id}
        </div>
    `).join('');
}

// Select parking slot
function selectSlot(slotId) {
    // Remove previous selection
    document.querySelectorAll('.slot').forEach(slot => {
        slot.classList.remove('selected');
    });
    
    // Add selection to clicked slot
    event.target.classList.add('selected');
    selectedSlot = slotId;
    
    updateBookingSummary();
}

// Set minimum date to today
function setMinDate() {
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('bookingDate').min = today;
    document.getElementById('bookingDate').value = today;
}

// Update booking summary
function updateBookingSummary() {
    const duration = document.getElementById('duration').value;
    const zone = document.getElementById('parkingZone').value;
    
    if (!duration || !zone) return;
    
    let basePrice = 0;
    switch(duration) {
        case '1': basePrice = 5; break;
        case '2': basePrice = 9; break;
        case '4': basePrice = 16; break;
        case '8': basePrice = 30; break;
        case '24': basePrice = 50; break;
    }
    
    let zoneFee = 0;
    switch(zone) {
        case 'zone-a': zoneFee = 5; break;
        case 'zone-b': zoneFee = 0; break;
        case 'zone-c': zoneFee = -2; break;
    }
    
    const tax = Math.round((basePrice + zoneFee) * 0.1 * 100) / 100;
    const total = basePrice + zoneFee + tax;
    
    document.getElementById('basePrice').textContent = `$${basePrice}`;
    document.getElementById('zoneFee').textContent = `$${zoneFee}`;
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('totalAmount').textContent = `$${total.toFixed(2)}`;
    
    bookingData = {
        basePrice,
        zoneFee,
        tax,
        total: parseFloat(total.toFixed(2))
    };
    
    // Load slots when form is filled
    if (duration && zone) {
        loadBookingSlots();
    }
}

// Handle booking submission
function handleBookingSubmit(e) {
    e.preventDefault();
    
    if (!selectedSlot) {
        showToast('Please select a parking slot', 'error');
        return;
    }
    
    const formData = new FormData(e.target);
    const bookingDetails = {
        vehicleType: document.getElementById('vehicleType').value,
        vehicleNumber: document.getElementById('vehicleNumber').value,
        date: document.getElementById('bookingDate').value,
        timeSlot: document.getElementById('timeSlot').value,
        duration: document.getElementById('duration').value,
        zone: document.getElementById('parkingZone').value,
        slotId: selectedSlot,
        ...bookingData
    };
    
    // Show payment modal
    showPaymentModal(bookingDetails);
}

// Show payment modal
function showPaymentModal(details) {
    const paymentSummary = document.getElementById('paymentSummary');
    paymentSummary.innerHTML = `
        <div class="summary-row">
            <span>Vehicle:</span>
            <span>${details.vehicleType.toUpperCase()} - ${details.vehicleNumber}</span>
        </div>
        <div class="summary-row">
            <span>Slot:</span>
            <span>${details.slotId} (${details.zone.replace('zone-', 'Zone ').toUpperCase()})</span>
        </div>
        <div class="summary-row">
            <span>Date & Time:</span>
            <span>${formatDate(details.date)} | ${details.timeSlot}</span>
        </div>
        <div class="summary-row">
            <span>Duration:</span>
            <span>${details.duration} hour(s)</span>
        </div>
        <div class="summary-row total">
            <span>Total Amount:</span>
            <span>$${details.total}</span>
        </div>
    `;
    
    document.getElementById('paymentModal').classList.add('active');
}

// Close payment modal
function closePayment() {
    document.getElementById('paymentModal').classList.remove('active');
}

// Toggle payment details
function togglePaymentDetails() {
    const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked').value;
    const cardDetails = document.getElementById('cardDetails');
    
    if (paymentMethod === 'card') {
        cardDetails.style.display = 'block';
    } else {
        cardDetails.style.display = 'none';
    }
}

// Format card number
function formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
    
    e.target.value = formattedValue;
}

// Format expiry date
function formatExpiryDate(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0,2) + '/' + value.substring(2,4);
    }
    e.target.value = value;
}

// Handle payment
function handlePayment(e) {
    e.preventDefault();
    showLoading();
    
    setTimeout(() => {
        // Create booking
        const booking = {
            id: generateBookingId(),
            userId: currentUser.id,
            userName: currentUser.name,
            slotId: selectedSlot,
            vehicleType: document.getElementById('vehicleType').value,
            vehicleNumber: document.getElementById('vehicleNumber').value,
            date: document.getElementById('bookingDate').value,
            timeSlot: document.getElementById('timeSlot').value,
            duration: document.getElementById('duration').value,
            zone: document.getElementById('parkingZone').value,
            amount: bookingData.total,
            status: 'active',
            paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
            bookingTime: new Date().toISOString()
        };
        
        bookings.push(booking);
        localStorage.setItem('bookings', JSON.stringify(bookings));
        
        // Update slot status
        const slot = slots.find(s => s.id === selectedSlot);
        if (slot) slot.status = 'occupied';
        
        closePayment();
        showSuccessModal(booking);
        resetBookingForm();
        loadUserStats();
        hideLoading();
    }, 2000);
}

// Generate booking ID
function generateBookingId() {
    return 'PKT-' + String(bookings.length + 1).padStart(3, '0');
}

// Show success modal
function showSuccessModal(booking) {
    const ticketPreview = document.getElementById('ticketPreview');
    ticketPreview.innerHTML = `
        <div class="ticket-detail">
            <strong>Booking ID:</strong> ${booking.id}
        </div>
        <div class="ticket-detail">
            <strong>Slot:</strong> ${booking.slotId}
        </div>
        <div class="ticket-detail">
            <strong>Date:</strong> ${formatDate(booking.date)}
        </div>
        <div class="ticket-detail">
            <strong>Time:</strong> ${booking.timeSlot}
        </div>
        <div class="ticket-detail">
            <strong>Amount:</strong> $${booking.amount}
        </div>
    `;
    
    document.getElementById('successModal').classList.add('active');
}

// Close success modal
function closeSuccessModal() {
    document.getElementById('successModal').classList.remove('active');
    showSection('tickets');
}

// Reset booking form
function resetBookingForm() {
    document.getElementById('bookingForm').reset();
    selectedSlot = null;
    document.getElementById('slotGrid').innerHTML = '';
    document.getElementById('basePrice').textContent = '$0';
    document.getElementById('zoneFee').textContent = '$0';
    document.getElementById('tax').textContent = '$0';
    document.getElementById('totalAmount').textContent = '$0';
    setMinDate();
}

// Load tickets
function loadTickets() {
    const ticketsList = document.getElementById('ticketsList');
    if (!currentUser) return;
    
    const userBookings = bookings
        .filter(b => b.userId === currentUser.id)
        .sort((a, b) => new Date(b.bookingTime) - new Date(a.bookingTime));
    
    if (userBookings.length === 0) {
        ticketsList.innerHTML = '<p>No tickets found.</p>';
        return;
    }
    
    ticketsList.innerHTML = userBookings.map(booking => `
        <div class="ticket">
            <div class="ticket-header">
                <div class="ticket-id">${booking.id}</div>
                <div class="ticket-status ${booking.status}">${booking.status}</div>
            </div>
            <div class="ticket-details">
                <div class="ticket-detail">
                    <label>Vehicle</label>
                    <span>${booking.vehicleType.toUpperCase()} - ${booking.vehicleNumber}</span>
                </div>
                <div class="ticket-detail">
                    <label>Slot</label>
                    <span>${booking.slotId} (${booking.zone.replace('zone-', 'Zone ').toUpperCase()})</span>
                </div>
                <div class="ticket-detail">
                    <label>Date</label>
                    <span>${formatDate(booking.date)}</span>
                </div>
                <div class="ticket-detail">
                    <label>Time</label>
                    <span>${booking.timeSlot}</span>
                </div>
                <div class="ticket-detail">
                    <label>Duration</label>
                    <span>${booking.duration} hour(s)</span>
                </div>
                <div class="ticket-detail">
                    <label>Amount</label>
                    <span>$${booking.amount}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Handle profile update
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const updatedUser = {
        ...currentUser,
        name: document.getElementById('profileName').value,
        email: document.getElementById('profileEmail').value,
        phone: document.getElementById('profilePhone').value,
        address: document.getElementById('profileAddress').value
    };
    
    // Update in users array
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        localStorage.setItem('users', JSON.stringify(users));
    }
    
    currentUser = updatedUser;
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));
    
    document.getElementById('userName').textContent = updatedUser.name;
    showToast('Profile updated successfully!', 'success');
}

// Admin functions
function loadAdminStats() {
    const totalSlots = slots.length;
    const occupiedSlots = slots.filter(s => s.status === 'occupied').length;
    const todayBookings = bookings.filter(b => 
        b.date === new Date().toISOString().split('T')[0]
    ).length;
    const todayRevenue = bookings
        .filter(b => b.date === new Date().toISOString().split('T')[0])
        .reduce((sum, b) => sum + b.amount, 0);
    
    document.getElementById('totalSlots').textContent = totalSlots;
    document.getElementById('occupiedSlots').textContent = occupiedSlots;
    document.getElementById('todayBookings').textContent = todayBookings;
    document.getElementById('todayRevenue').textContent = `$${todayRevenue}`;
}

function loadAdminData() {
    loadAdminBookings();
    loadAdminUsers();
}

function loadAdminSlots() {
    const adminSlotGrid = document.getElementById('adminSlotGrid');
    adminSlotGrid.innerHTML = slots.map(slot => `
        <div class="slot ${slot.status}" onclick="toggleSlotStatus('${slot.id}')">
            ${slot.id}
        </div>
    `).join('');
}

function toggleSlotStatus(slotId) {
    const slot = slots.find(s => s.id === slotId);
    if (slot) {
        slot.status = slot.status === 'available' ? 'occupied' : 'available';
        loadAdminSlots();
        updateAvailableSlotsCount();
        showToast(`Slot ${slotId} status updated`, 'success');
    }
}

function loadAdminBookings() {
    const tableBody = document.getElementById('bookingsTableBody');
    tableBody.innerHTML = bookings.map(booking => `
        <tr>
            <td>${booking.id}</td>
            <td>${booking.userName}</td>
            <td>${booking.slotId}</td>
            <td>${formatDate(booking.date)}</td>
            <td>${booking.timeSlot}</td>
            <td><span class="ticket-status ${booking.status}">${booking.status}</span></td>
            <td>$${booking.amount}</td>
            <td>
                <button onclick="cancelBooking('${booking.id}')" class="btn-sm btn-danger">Cancel</button>
            </td>
        </tr>
    `).join('');
}

function loadAdminUsers() {
    const tableBody = document.getElementById('usersTableBody');
    tableBody.innerHTML = users.map(user => `
        <tr>
            <td>${user.id}</td>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.phone}</td>
            <td>${user.totalBookings}</td>
            <td><span class="status ${user.status}">${user.status}</span></td>
            <td>
                <button onclick="toggleUserStatus(${user.id})" class="btn-sm btn-primary">
                    ${user.status === 'active' ? 'Deactivate' : 'Activate'}
                </button>
            </td>
        </tr>
    `).join('');
}

function cancelBooking(bookingId) {
    const booking = bookings.find(b => b.id === bookingId);
    if (booking && booking.status === 'active') {
        booking.status = 'cancelled';
        
        // Free up the slot
        const slot = slots.find(s => s.id === booking.slotId);
        if (slot) slot.status = 'available';
        
        localStorage.setItem('bookings', JSON.stringify(bookings));
        loadAdminBookings();
        loadAdminStats();
        showToast(`Booking ${bookingId} cancelled`, 'success');
    }
}

function toggleUserStatus(userId) {
    const user = users.find(u => u.id === userId);
    if (user) {
        user.status = user.status === 'active' ? 'inactive' : 'active';
        localStorage.setItem('users', JSON.stringify(users));
        loadAdminUsers();
        showToast(`User ${user.name} status updated`, 'success');
    }
}

function loadMaintenanceLogs() {
    const logsContainer = document.getElementById('maintenanceLogs');
    const logs = [
        `[${new Date().toISOString()}] System maintenance completed`,
        `[${new Date(Date.now() - 3600000).toISOString()}] Database backup created`,
        `[${new Date(Date.now() - 7200000).toISOString()}] Security scan completed`,
        `[${new Date(Date.now() - 10800000).toISOString()}] Performance optimization applied`,
        `[${new Date(Date.now() - 14400000).toISOString()}] System update installed`
    ];
    
    logsContainer.innerHTML = logs.join('\n');
}

function performMaintenance() {
    showLoading();
    setTimeout(() => {
        const newLog = `[${new Date().toISOString()}] Manual maintenance performed by admin`;
        const logsContainer = document.getElementById('maintenanceLogs');
        logsContainer.innerHTML = newLog + '\n' + logsContainer.innerHTML;
        hideLoading();
        showToast('Maintenance completed successfully!', 'success');
    }, 3000);
}

// Utility functions
function formatDate(dateString) {
    return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `
        <div class="toast-content">
            <span>${message}</span>
        </div>
    `;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideInRight 0.3s ease-out reverse';
        setTimeout(() => {
            toastContainer.removeChild(toast);
        }, 300);
    }, 3000);
}

// Logout function
function logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentAdmin');
    currentUser = null;
    currentAdmin = null;
    showPage('loginPage');
    showToast('Logged out successfully!', 'success');
    
    // Reset forms
    document.getElementById('userLoginForm').reset();
    document.getElementById('adminLoginForm').reset();
}

// Window resize handler
window.addEventListener('resize', function() {
    // Handle responsive behavior if needed
});

// Prevent form submission on enter for certain fields
document.addEventListener('keydown', function(e) {
    if (e.key === 'Enter' && e.target.tagName !== 'BUTTON' && e.target.type !== 'submit') {
        // Allow normal behavior for buttons and submit inputs
        return;
    }
});

// Auto-logout after inactivity (30 minutes)
let inactivityTimer;
function resetInactivityTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
        if (currentUser || currentAdmin) {
            showToast('Session expired due to inactivity', 'warning');
            logout();
        }
    }, 30 * 60 * 1000); // 30 minutes
}

// Track user activity
document.addEventListener('click', resetInactivityTimer);
document.addEventListener('keypress', resetInactivityTimer);
document.addEventListener('scroll', resetInactivityTimer);

// Initialize inactivity timer
resetInactivityTimer();