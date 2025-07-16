# SmartPark - Parking Slot Booking System

A comprehensive web-based parking slot booking system with user authentication, payment processing, and administrative features.

## 🚀 Features

### User Features
- **User Authentication & Registration**
  - Email/password login
  - Google Sign-In integration (mock implementation)
  - User registration with validation
  - Password visibility toggle
  - Remember me functionality
  - Forgot password option

- **User Dashboard**
  - Welcome message with user name
  - Statistics overview (total bookings, active bookings, total spent, available slots)
  - Recent bookings display
  - Profile management

- **Parking Slot Booking**
  - Vehicle type selection (Car, Motorcycle, Truck, SUV)
  - Date and time slot selection
  - Duration-based pricing (1h - $5, 2h - $9, 4h - $16, 8h - $30, Full day - $50)
  - Parking zone selection (Premium, Standard, Economy)
  - Interactive slot grid with real-time availability
  - Price calculation with zone fees and tax

- **Payment System**
  - Multiple payment methods (Credit/Debit Card, PayPal, Digital Wallet)
  - Card number formatting and validation
  - Secure payment processing simulation
  - Payment receipt generation

- **Ticket Management**
  - Animated ticket generation
  - Digital ticket download
  - Booking history with status tracking
  - Ticket details with QR code simulation

### Admin Features
- **Admin Authentication**
  - Secure admin login with username, password, and security code
  - Admin credentials: `admin` / `admin123` / `2024`

- **Dashboard Analytics**
  - Real-time statistics (total slots, occupied slots, today's bookings, revenue)
  - Visual charts and graphs
  - Occupancy rate monitoring
  - Revenue tracking

- **Slot Management**
  - Visual slot grid display
  - Toggle slot availability
  - Add/remove parking slots
  - Zone-based organization

- **Booking Management**
  - View all bookings with filtering
  - Cancel bookings
  - Status management
  - Date-based filtering

- **User Management**
  - User list with search functionality
  - User status management (activate/deactivate)
  - User statistics tracking

- **Reports & Analytics**
  - Daily, weekly, monthly reports
  - Revenue analysis
  - Booking trends
  - Peak hour analysis

- **System Maintenance**
  - System status monitoring
  - Maintenance logs
  - Database backup status
  - Performance monitoring

## 🎨 Advanced Features

### Animations & UI
- Loading spinners with smooth transitions
- Slide animations for page transitions
- Pulse effects for selected elements
- Smooth hover effects
- Toast notifications
- Modal animations

### Smart Features
- Auto-logout after 30 minutes of inactivity
- Local storage for data persistence
- Responsive design for mobile devices
- Real-time slot availability updates
- Price calculator with zone-based pricing
- Form validation and error handling

### Payment Integration
- Multiple payment method support
- Card number auto-formatting
- Expiry date formatting
- CVV validation
- Payment confirmation with animations

## 📱 Responsive Design

The application is fully responsive and works seamlessly on:
- Desktop computers
- Tablets
- Mobile phones
- Various screen sizes and orientations

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, can run directly in browser)

### Installation

1. **Clone or download the project files**
   ```
   - index.html
   - styles.css
   - script.js
   ```

2. **Open the application**
   - Open `index.html` in your web browser
   - Or serve via a local web server for best experience

### Demo Accounts

#### User Accounts
- **Email**: `john@example.com` | **Password**: `password123`
- **Email**: `jane@example.com` | **Password**: `password123`

#### Admin Account
- **Username**: `admin`
- **Password**: `admin123`
- **Security Code**: `2024`

#### Google Login
- Click "Continue with Google" for mock Google authentication

## 💳 Payment Testing

For testing the payment system, use these mock card details:
- **Card Number**: `4532 1234 5678 9012`
- **Expiry**: `12/25`
- **CVV**: `123`
- **Name**: `John Doe`

## 🎯 Usage Guide

### For Users

1. **Registration/Login**
   - Visit the login page
   - Create a new account or use demo credentials
   - Use Google Sign-In for quick access

2. **Booking a Slot**
   - Navigate to "Book Slot" section
   - Select vehicle type and enter vehicle number
   - Choose date, time slot, and duration
   - Select parking zone
   - Pick an available slot from the grid
   - Review pricing and proceed to payment
   - Complete payment and download ticket

3. **Managing Bookings**
   - View all tickets in "My Tickets" section
   - Check booking status and details
   - Download ticket receipts

4. **Profile Management**
   - Update personal information
   - View booking statistics
   - Change contact details

### For Administrators

1. **Admin Login**
   - Switch to "Admin Login" tab
   - Enter admin credentials
   - Access admin dashboard

2. **Monitoring System**
   - View real-time statistics
   - Monitor slot occupancy
   - Track revenue and bookings

3. **Managing Slots**
   - View slot grid in "Slot Management"
   - Toggle slot availability
   - Monitor zone utilization

4. **Managing Bookings**
   - View all bookings in "Booking Management"
   - Filter by status or date
   - Cancel bookings if needed

5. **User Administration**
   - View user list in "User Management"
   - Search users
   - Activate/deactivate accounts

6. **System Maintenance**
   - Monitor system status
   - View maintenance logs
   - Perform manual maintenance

## 🔧 Technical Details

### Technologies Used
- **HTML5** - Structure and semantic markup
- **CSS3** - Styling, animations, and responsive design
- **JavaScript (ES6+)** - Functionality and interactivity
- **Font Awesome** - Icons and visual elements
- **Local Storage** - Data persistence

### Key Features Implementation
- **State Management**: Using local storage for data persistence
- **Animation System**: CSS keyframes with JavaScript triggers
- **Responsive Grid**: CSS Grid and Flexbox for layout
- **Form Validation**: Real-time validation with custom messages
- **Modal System**: Reusable modal components
- **Toast Notifications**: Custom notification system

### Data Storage
All data is stored locally in the browser using localStorage:
- User accounts and profiles
- Booking information
- Slot availability
- Payment records

### Security Features
- Password hashing simulation
- Session management
- Auto-logout on inactivity
- Input validation and sanitization
- CSRF protection simulation

## 🎨 Customization

### Color Scheme
The application uses CSS custom properties for easy theming:
```css
:root {
    --primary-color: #3498db;
    --secondary-color: #2c3e50;
    --success-color: #27ae60;
    --warning-color: #f39c12;
    --danger-color: #e74c3c;
}
```

### Adding New Features
1. Update HTML structure in `index.html`
2. Add styling in `styles.css`
3. Implement functionality in `script.js`
4. Test across different devices

## 🚀 Deployment

### Local Deployment
1. Simply open `index.html` in a web browser
2. All files should be in the same directory

### Web Server Deployment
1. Upload all files to your web server
2. Ensure proper MIME types are configured
3. Test all functionality

### Production Considerations
- Implement real backend API
- Add proper authentication system
- Use real payment gateway integration
- Add database for data persistence
- Implement proper security measures

## 📞 Support

For issues or questions:
1. Check the browser console for error messages
2. Ensure all files are properly loaded
3. Verify browser compatibility
4. Clear browser cache if experiencing issues

## 📄 License

This project is provided for educational and demonstration purposes.

## 🤝 Contributing

Feel free to fork this project and submit improvements:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

---

**SmartPark** - Making parking simple and smart! 🚗✨