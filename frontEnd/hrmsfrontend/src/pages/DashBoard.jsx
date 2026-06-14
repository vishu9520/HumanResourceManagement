import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import API from "../services/api";

import {
  FaUsers,
  FaCalendarCheck,
  FaPlaneDeparture,
  FaMoneyBillWave,
  FaRobot,
} from "react-icons/fa";

export default function Dashboard() {
  const navigate = useNavigate();

  const [employees, setEmployees] = useState([]);
  const [attendance, setAttendance] = useState([]);
  const [leaves, setLeaves] = useState([]);
  const [payrolls, setPayrolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    loadDashboard();
  }, [navigate]);

  const loadDashboard = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem("token");
      console.log("Token exists:", !!token);

      try {
        const employeeRes = await API.get("/employees");
        setEmployees(employeeRes.data);
      } catch (err) {
        console.error(
          "Employees endpoint failed:",
          err.response?.status,
          err.response?.data
        );
      }

      try {
        const attendanceRes = await API.get("/attendance");
        setAttendance(attendanceRes.data);
      } catch (err) {
        console.error(
          "Attendance endpoint failed:",
          err.response?.status,
          err.response?.data
        );
      }

      try {
        const leaveRes = await API.get("/leaves");
        setLeaves(leaveRes.data);
      } catch (err) {
        console.error(
          "Leaves endpoint failed:",
          err.response?.status,
          err.response?.data
        );
      }

      try {
        const payrollRes = await API.get("/payroll");
        setPayrolls(payrollRes.data);
      } catch (err) {
        console.error(
          "Payroll endpoint failed:",
          err.response?.status,
          err.response?.data
        );
      }
    } catch (error) {
      console.error("Dashboard error:", error);

      setError("Failed to load dashboard data");

      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-64 min-h-screen bg-slate-100 p-8">
        <DashboardHeader />

        <StatsSection
          employees={employees}
          attendance={attendance}
          leaves={leaves}
          payrolls={payrolls}
        />

        <RecentActivities
          employees={employees}
          leaves={leaves}
        />

        <QuickActions navigate={navigate} />
      </div>
    </div>
  );
}

function DashboardHeader() {
  return (
    <div className="bg-gradient-to-r from-blue-700 to-blue-500 text-white rounded-3xl shadow-xl p-8 mb-8">
      <h1 className="text-4xl font-bold">
        Human Resource Management System
      </h1>

      <p className="mt-2 text-lg">
        Manage Employees, Attendance,
        Leaves, Payroll and AI Assistant
      </p>
    </div>
  );
}

function StatsSection({
  employees,
  attendance,
  leaves,
  payrolls,
}) {
  const stats = [
    {
      title: "Employees",
      count: employees.length,
      color: "text-blue-600",
      icon: <FaUsers className="text-5xl text-blue-600 mb-4" />,
    },
    {
      title: "Attendance",
      count: attendance.length,
      color: "text-green-500",
      icon: (
        <FaCalendarCheck className="text-5xl text-green-500 mb-4" />
      ),
    },
    {
      title: "Leave Requests",
      count: leaves.length,
      color: "text-orange-500",
      icon: (
        <FaPlaneDeparture className="text-5xl text-orange-500 mb-4" />
      ),
    },
    {
      title: "Payroll Records",
      count: payrolls.length,
      color: "text-purple-500",
      icon: (
        <FaMoneyBillWave className="text-5xl text-purple-500 mb-4" />
      ),
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          stat={stat}
        />
      ))}
    </div>
  );
}

function StatCard({ stat }) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-lg">
      {stat.icon}

      <h3 className="text-gray-500">
        {stat.title}
      </h3>

      <h1 className={`text-4xl font-bold ${stat.color}`}>
        {stat.count}
      </h1>
    </div>
  );
}

function RecentActivities({
  employees,
  leaves,
}) {
  return (
    <div className="mt-8 bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Recent Activities
      </h2>

      <div className="space-y-4">
        {employees
          .slice(-3)
          .reverse()
          .map((emp) => (
            <div
              key={emp.id}
              className="bg-blue-50 p-4 rounded-xl"
            >
              Employee Added :
              <strong>
                {" "}
                {emp.firstName} {emp.lastName}
              </strong>
            </div>
          ))}

        {leaves
          .slice(-2)
          .reverse()
          .map((leave) => (
            <div
              key={leave.id}
              className="bg-orange-50 p-4 rounded-xl"
            >
              Leave Request :
              <strong>
                {" "}
                {leave.employeeName}
              </strong>
            </div>
          ))}
      </div>
    </div>
  );
}

function QuickActions({ navigate }) {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-blue-600 mb-6">
        Quick Actions
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <button
          onClick={() => navigate("/employees")}
          className="bg-blue-600 text-white p-4 rounded-2xl shadow-lg hover:bg-blue-700"
        >
          Add Employee
        </button>

        <button
          onClick={() => navigate("/attendance")}
          className="bg-green-600 text-white p-4 rounded-2xl shadow-lg hover:bg-green-700"
        >
          Attendance
        </button>

        <button
          onClick={() => navigate("/leaves")}
          className="bg-orange-500 text-white p-4 rounded-2xl shadow-lg hover:bg-orange-600"
        >
          Leave Requests
        </button>

        <button
          onClick={() => navigate("/payroll")}
          className="bg-purple-600 text-white p-4 rounded-2xl shadow-lg hover:bg-purple-700"
        >
          Payroll
        </button>

        <button
          onClick={() => navigate("/chatbot")}
          className="bg-slate-800 text-white p-4 rounded-2xl shadow-lg hover:bg-slate-900 flex items-center justify-center gap-2"
        >
          <FaRobot />
          AI Assistant
        </button>
      </div>
    </div>
  );
}
