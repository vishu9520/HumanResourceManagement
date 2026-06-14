import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { FaPlaneDeparture } from "react-icons/fa";

export default function Leaves() {
  const [leaves, setLeaves] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    startDate: "",
    endDate: "",
    reason: "",
  });

  useEffect(() => {
    fetchLeaves();
    fetchEmployees();
  }, []);

  const fetchLeaves = async () => {
    try {
      const response = await API.get("/leaves");
      setLeaves(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const applyLeave = async () => {
    try {
      await API.post("/leaves", {
        employeeId: Number(form.employeeId),
        startDate: form.startDate,
        endDate: form.endDate,
        reason: form.reason,
      });

      alert("Leave Applied Successfully");

      setForm({
        employeeId: "",
        startDate: "",
        endDate: "",
        reason: "",
      });

      fetchLeaves();
    } catch (error) {
      console.error(error);
      alert("Failed To Apply Leave");
    }
  };

  const approveLeave = async (id) => {
    try {
      await API.put(`/leaves/approve/${id}`);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  const rejectLeave = async (id) => {
    try {
      await API.put(`/leaves/reject/${id}`);
      fetchLeaves();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-64 min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />

        <div className="p-8">
          <LeaveHeader />

          <LeaveForm
            form={form}
            setForm={setForm}
            employees={employees}
            applyLeave={applyLeave}
          />

          <LeaveStats leaves={leaves} />

          <LeaveTable
            leaves={leaves}
            approveLeave={approveLeave}
            rejectLeave={rejectLeave}
          />
        </div>
      </div>
    </div>
  );
}

function LeaveHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <FaPlaneDeparture className="text-4xl text-blue-600" />

      <h1 className="text-4xl font-bold text-blue-600">
        Leave Management
      </h1>
    </div>
  );
}

function LeaveForm({
  form,
  setForm,
  employees,
  applyLeave,
}) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 mb-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Apply Leave
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <select
          value={form.employeeId}
          onChange={(e) =>
            setForm({
              ...form,
              employeeId: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        >
          <option value="">
            Select Employee
          </option>

          {employees.map((emp) => (
            <option
              key={emp.id}
              value={emp.id}
            >
              {emp.firstName} {emp.lastName}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={form.startDate}
          onChange={(e) =>
            setForm({
              ...form,
              startDate: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          type="date"
          value={form.endDate}
          onChange={(e) =>
            setForm({
              ...form,
              endDate: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          type="text"
          placeholder="Reason"
          value={form.reason}
          onChange={(e) =>
            setForm({
              ...form,
              reason: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />
      </div>

      <button
        onClick={applyLeave}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg"
      >
        Apply Leave
      </button>
    </div>
  );
}

function LeaveStats({ leaves }) {
  const stats = [
    {
      title: "Total Requests",
      value: leaves.length,
      color: "text-blue-600",
    },
    {
      title: "Approved",
      value: leaves.filter(
        (l) => l.status === "APPROVED"
      ).length,
      color: "text-green-500",
    },
    {
      title: "Pending",
      value: leaves.filter(
        (l) => l.status === "PENDING"
      ).length,
      color: "text-orange-500",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          color={stat.color}
        />
      ))}
    </div>
  );
}

function StatCard({
  title,
  value,
  color,
}) {
  return (
    <div className="bg-white p-6 rounded-3xl shadow-xl">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <h1 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h1>
    </div>
  );
}

function LeaveTable({
  leaves,
  approveLeave,
  rejectLeave,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Leave Requests
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Start</th>
              <th className="p-3">End</th>
              <th className="p-3">Reason</th>
              <th className="p-3">Status</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {leaves.map((leave) => (
              <LeaveRow
                key={leave.id}
                leave={leave}
                approveLeave={approveLeave}
                rejectLeave={rejectLeave}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function LeaveRow({
  leave,
  approveLeave,
  rejectLeave,
}) {
  return (
    <tr className="border-b hover:bg-blue-50">
      <td className="p-3">
        {leave.id}
      </td>

      <td className="p-3">
        {leave.employeeName}
      </td>

      <td className="p-3">
        {leave.startDate}
      </td>

      <td className="p-3">
        {leave.endDate}
      </td>

      <td className="p-3">
        {leave.reason}
      </td>

      <td className="p-3">
        <span
          className={`px-4 py-2 rounded-full text-white text-sm ${
            leave.status === "APPROVED"
              ? "bg-green-500"
              : leave.status === "REJECTED"
              ? "bg-red-500"
              : "bg-orange-500"
          }`}
        >
          {leave.status}
        </span>
      </td>

      <td className="p-3 flex gap-2">
        <button
          onClick={() =>
            approveLeave(leave.id)
          }
          className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl"
        >
          Approve
        </button>

        <button
          onClick={() =>
            rejectLeave(leave.id)
          }
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl"
        >
          Reject
        </button>
      </td>
    </tr>
  );
}
