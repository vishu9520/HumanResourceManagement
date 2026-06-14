import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import Attendance from "./pages/Attendance";
import Leaves from "./pages/Leaves";
import Payroll from "./pages/Payroll";
import ChatBot from "./pages/ChatBot";

function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<Dashboard />} />

      {/* Employees */}
      <Route path="/employees" element={<Employees />} />

      {/* Attendance */}
      <Route path="/attendance" element={<Attendance />} />

      {/* Leaves */}
      <Route path="/leaves" element={<Leaves />} />

      {/* Payroll */}
      <Route path="/payroll" element={<Payroll />} />

      {/* AI ChatBot */}
      <Route path="/chatbot" element={<ChatBot />} />

      {/* Invalid Route Redirect */}
      <Route
        path="*"
        element={<Navigate to="/" replace />}
      />

    </Routes>
  );
}

export default App;