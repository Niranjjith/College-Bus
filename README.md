# Nilgiri College Transport Office Management System

A modern, full-stack web application for managing bus routes, fees, and lost & found items for Nilgiri College Transport Office. Built with React and Node.js, featuring a premium UI design and comprehensive admin dashboard.

![Nilgiri College Transport](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)

## ✨ Features

### Public Features
- **🏠 Home Page**: Beautiful landing page with animated 3D bus and transport rules
- **💰 Fee Structure**: 
  - Interactive bus cards with click-to-expand functionality
  - View all routes with fees and timings
  - Advanced search with autocomplete suggestions
  - Responsive table view
- **🎒 Lost & Found**: 
  - Report lost or found items
  - Search functionality
  - Real-time status updates
  - User-friendly form interface

### Admin Features
- **🔐 Secure Admin Portal**: JWT-based authentication
- **🚌 Bus Management**:
  - Add, edit, and delete buses
  - Manage routes for each bus
  - Update fees and timings
  - Full CRUD operations
- **📋 Lost & Found Management**:
  - View all reported items
  - Verify items
  - Update item status (Lost/Found)
  - Delete items
  - Track user submissions

## 🛠️ Tech Stack

### Frontend
- **React 18.2.0** - UI framework
- **React Router 6.20.0** - Routing
- **Axios** - HTTP client
- **CSS3** - Styling with modern gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **JSON File Storage** - Lightweight database

## 📦 Installation

### Prerequisites
- Node.js (v14 or higher)
- npm (comes with Node.js)

### Step 1: Clone the Repository
```bash
git clone <repository-url>
cd nilgiri-college-transport
```

### Step 2: Install Dependencies

**Root dependencies:**
```bash
npm install
```

**Server dependencies:**
```bash
cd server
npm install
cd ..
```

**Client dependencies:**
```bash
cd client
npm install
cd ..
```

## 🚀 Running the Application

### Development Mode (Recommended)

Run both server and client simultaneously:

```bash
npm run dev
```

This starts:
- **Backend Server**: `http://localhost:5000`
- **React Frontend**: `http://localhost:3000`

### Run Separately

**Backend Server:**
```bash
cd server
npm start
# or for development with auto-reload
npm run dev
```

**Frontend Client:**
```bash
cd client
npm start
```

### Production Build

```bash
cd client
npm run build
```

The production build will be in `client/build/` directory.

## 📁 Project Structure

```
nilgiri-college-transport/
├── server/
│   ├── index.js              # Express server & API routes
│   ├── data.json             # Database file (auto-created)
│   ├── package.json
│   └── .gitignore
├── client/
│   ├── public/
│   │   └── index.html
│   ├── src/
│   │   ├── components/
│   │   │   ├── Home.js       # Landing page
│   │   │   ├── Fees.js       # Fee structure page
│   │   │   ├── LostFound.js  # Lost & found page
│   │   │   ├── Header.js     # Navigation header
│   │   │   ├── Footer.js     # Footer component
│   │   │   └── Admin/
│   │   │       ├── AdminLogin.js      # Admin login page
│   │   │       └── AdminDashboard.js  # Admin dashboard
│   │   ├── App.js            # Main app component
│   │   ├── App.css
│   │   └── index.js          # Entry point
│   └── package.json
├── package.json              # Root package.json
├── README.md                 # This file
└── .gitignore
```

## 🔌 API Endpoints

### Public Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/buses` | Get all buses and routes |
| GET | `/api/buses/:id` | Get specific bus details |
| GET | `/api/lost-found` | Get all lost & found items |
| POST | `/api/lost-found` | Report new lost/found item |

### Admin Endpoints (Require JWT Token)

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/admin/login` | Admin authentication |
| POST | `/api/admin/buses` | Add new bus |
| PUT | `/api/admin/buses/:id` | Update bus |
| DELETE | `/api/admin/buses/:id` | Delete bus |
| POST | `/api/admin/buses/:busId/routes` | Add route to bus |
| PUT | `/api/admin/buses/:busId/routes/:routeId` | Update route |
| DELETE | `/api/admin/buses/:busId/routes/:routeId` | Delete route |
| PUT | `/api/admin/lost-found/:id` | Update lost & found item |
| DELETE | `/api/admin/lost-found/:id` | Delete lost & found item |

## 🔑 Admin Credentials

**Default Login:**
- **Email**: `admintransport@gmail.com`
- **Password**: `123456`

> ⚠️ **Security Note**: Change the default password in production!

## 🎨 Features in Detail

### Home Page
- Animated 3D bus with hover effects
- Transport rules and regulations
- Quick access to all features
- Fully responsive design

### Fee Structure Page
- **Bus Cards**: Click any bus to view its routes
- **Search**: Real-time search with suggestions
- **Table View**: Comprehensive route information
- **Responsive**: Works on all devices

### Lost & Found Page
- **Report Items**: Easy form submission
- **Search**: Find items quickly
- **Status Badges**: Visual status indicators
- **User-Friendly**: Simple and intuitive

### Admin Dashboard
- **Two Tabs**: Bus Management & Lost & Found
- **Bus Management**:
  - Sidebar with all buses
  - Add/Edit/Delete buses
  - Manage routes with fees and timings
- **Lost & Found Management**:
  - View all submissions
  - Verify items
  - Update status
  - Delete items

## 🔒 Security Features

- JWT-based authentication
- Password hashing with bcrypt
- Token expiration (24 hours)
- Protected admin routes
- Secure API endpoints

## 📱 Responsive Design

- **Desktop**: Full-featured layout
- **Tablet**: Optimized for medium screens
- **Mobile**: Hamburger menu, touch-friendly
- **All Devices**: Perfect text visibility and readability

## 🐛 Troubleshooting

### Port Already in Use
If port 5000 or 3000 is already in use:
- **Backend**: Change PORT in `server/index.js` or use environment variable
- **Frontend**: React will prompt to use a different port

### Module Not Found Errors
Ensure dependencies are installed in all locations:
```bash
npm install          # Root
cd server && npm install
cd ../client && npm install
```

### CORS Errors
The server is configured to allow requests from `localhost:3000`. If you change the frontend port, update CORS settings in `server/index.js`.

## 📝 Data Storage

- Data is stored in `server/data.json`
- Automatically created on first run
- Includes initial bus routes and sample data
- Can be migrated to MongoDB/PostgreSQL

## 🚧 Future Enhancements

- [ ] Database migration (MongoDB/PostgreSQL)
- [ ] User authentication for students/staff
- [ ] Email notifications
- [ ] Real-time updates with WebSockets
- [ ] Mobile app (React Native)
- [ ] Payment integration for fees
- [ ] SMS notifications
- [ ] Bus tracking system

## 📄 License

This project is developed for Nilgiri College Transport Office use.

## 👥 Support

For issues or questions, contact the transport office:
- **Email**: transport@nilgiri.edu
- **Phone**: +91 12345 67890

## 🙏 Acknowledgments

- Nilgiri College for the opportunity
- All contributors and testers

---

**Made with ❤️ for Nilgiri College Transport Office**
