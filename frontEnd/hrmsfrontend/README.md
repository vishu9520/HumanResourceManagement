# 🌐 HRMS Frontend (React + Vite)

This directory contains the client-side single page application for the **Human Resource Management System (HRMS)**.

Built with **React 19**, **Vite**, **Tailwind CSS v4**, and **React Router DOM v7**.

---

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

The application will be accessible at: `http://localhost:5173`

### 3. Production Build
```bash
npm run build
```

---

## 📁 Application Structure

- `src/components/`: Reusable navigation components (`Navbar.jsx`, `Sidebar.jsx`).
- `src/pages/`: Module pages:
  - `Login.jsx` - Authentication view
  - `Dashboard.jsx` - Metric overview and statistics
  - `Employees.jsx` - Employee registration & directory management
  - `Attendance.jsx` - Daily check-in/out records and working hour computation
  - `Leaves.jsx` - Leave application submission and review
  - `Payroll.jsx` - Salary structure generation and history
  - `ChatBot.jsx` - AI assistant chat interface
- `src/services/api.js`: Axios client pre-configured with `http://localhost:8080` base URL and JWT authorization headers.

---

For full documentation and backend setup instructions, please see the [Root README.md](../../README.md).
