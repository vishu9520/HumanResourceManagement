import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaLock } from "react-icons/fa";
import API from "../services/api";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const login = async () => {
    if (!email || !password) {
      alert("Please enter Email and Password");
      return;
    }

    try {
      setLoading(true);

      const response = await API.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem(
        "token",
        response.data.token
      );

      localStorage.setItem(
        "user",
        JSON.stringify(response.data.user || response.data)
      );

      alert("Login Successful");

      navigate("/dashboard");

    } catch (error) {
      console.error(error);
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      login();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-700 to-blue-500 flex items-center justify-center">

      <div className="bg-white w-[450px] p-10 rounded-3xl shadow-2xl">

        {/* Logo */}

        <div className="flex justify-center mb-6">

          <div className="bg-blue-600 p-5 rounded-full shadow-lg">

            <FaUserTie className="text-white text-5xl" />

          </div>

        </div>

        {/* Heading */}

        <h1 className="text-4xl font-bold text-center text-blue-600 mb-2">
          HRMS Login
        </h1>

        <p className="text-center text-gray-500 mb-8">
          Welcome Back
        </p>

        {/* Email */}

        <div className="mb-5">

          <label className="block text-gray-700 font-semibold mb-2">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            onKeyDown={handleKeyPress}
            className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

        </div>

        {/* Password */}

        <div className="mb-6">

          <label className="block text-gray-700 font-semibold mb-2">
            Password
          </label>

          <div className="relative">

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              onKeyDown={handleKeyPress}
              className="w-full border border-gray-300 p-4 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <FaLock className="absolute right-4 top-5 text-gray-400" />

          </div>

        </div>

        {/* Login Button */}

        <button
          onClick={login}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-4 rounded-2xl text-lg font-semibold shadow-lg hover:bg-blue-700 transition"
        >
          {loading ? "Logging In..." : "Login"}
        </button>

      </div>

    </div>
  );
}
