import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FaHome,
  FaUsers,
  FaCalendarCheck,
  FaPlaneDeparture,
  FaMoneyBillWave,
  FaRobot,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const menuItems = [
    {
      id: 1,
      name: "Dashboard",
      path: "/dashboard",
      icon: FaHome,
    },
    {
      id: 2,
      name: "Employees",
      path: "/employees",
      icon: FaUsers,
    },
    {
      id: 3,
      name: "Attendance",
      path: "/attendance",
      icon: FaCalendarCheck,
    },
    {
      id: 4,
      name: "Leaves",
      path: "/leaves",
      icon: FaPlaneDeparture,
    },
    {
      id: 5,
      name: "Payroll",
      path: "/payroll",
      icon: FaMoneyBillWave,
    },
    {
      id: 6,
      name: "AI Assistant",
      path: "/chatbot",
      icon: FaRobot,
    },
  ];

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div className="fixed top-0 left-0 h-screen w-64 bg-blue-600 shadow-2xl flex flex-col">
      {/* Profile Section */}
      <div className="p-6 border-b border-blue-500 flex flex-col items-center">
        <div className="w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-lg">
          <span className="text-4xl font-bold text-blue-600">
            {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
          </span>
        </div>

        <h3 className="mt-4 text-white font-bold text-lg text-center">
          {user?.firstName && user?.lastName
            ? `${user.firstName} ${user.lastName}`
            : "User"}
        </h3>
      </div>

      {/* Menu Section */}
      <div className="flex-1 p-4 space-y-3">
        {menuItems.map((item) => {
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              to={item.path}
              className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 ${
                location.pathname === item.path
                  ? "bg-white text-blue-600 shadow-lg font-semibold"
                  : "text-white hover:bg-blue-500"
              }`}
            >
              <Icon size={20} />

              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Logout Section */}
      <div className="p-4 border-t border-blue-500">
        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-2xl flex items-center justify-center gap-2 transition-all"
        >
          <FaSignOutAlt />
          Logout
        </button>
      </div>
    </div>
  );
}