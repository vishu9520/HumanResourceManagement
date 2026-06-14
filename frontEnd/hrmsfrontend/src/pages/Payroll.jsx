import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { FaMoneyBillWave } from "react-icons/fa";

export default function Payroll() {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employeeId: "",
    basicSalary: "",
    bonus: "",
    deduction: "",
  });

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await API.get("/payroll");
      setPayrolls(response.data);
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

  const generatePayroll = async () => {
    try {
      await API.post("/payroll", {
        employeeId: Number(form.employeeId),
        basicSalary: Number(form.basicSalary),
        bonus: Number(form.bonus),
        deduction: Number(form.deduction),
      });

      alert("Payroll Generated Successfully");

      setForm({
        employeeId: "",
        basicSalary: "",
        bonus: "",
        deduction: "",
      });

      fetchPayrolls();
    } catch (error) {
      console.error(error);
      alert("Failed To Generate Payroll");
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-64 min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />

        <div className="p-8">
          <PayrollHeader />

          <PayrollForm
            form={form}
            setForm={setForm}
            employees={employees}
            generatePayroll={generatePayroll}
          />

          <PayrollStats payrolls={payrolls} />

          <PayrollTable payrolls={payrolls} />
        </div>
      </div>
    </div>
  );
}

function PayrollHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <FaMoneyBillWave className="text-4xl text-blue-600" />

      <h1 className="text-4xl font-bold text-blue-600">
        Payroll Management
      </h1>
    </div>
  );
}

function PayrollForm({
  form,
  setForm,
  employees,
  generatePayroll,
}) {
  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-blue-100 mb-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Generate Payroll
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
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
          type="number"
          placeholder="Basic Salary"
          value={form.basicSalary}
          onChange={(e) =>
            setForm({
              ...form,
              basicSalary: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          type="number"
          placeholder="Bonus"
          value={form.bonus}
          onChange={(e) =>
            setForm({
              ...form,
              bonus: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          type="number"
          placeholder="Deduction"
          value={form.deduction}
          onChange={(e) =>
            setForm({
              ...form,
              deduction: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />
      </div>

      <button
        onClick={generatePayroll}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg"
      >
        Generate Payroll
      </button>
    </div>
  );
}

function PayrollStats({ payrolls }) {
  const stats = [
    {
      title: "Total Payrolls",
      value: payrolls.length,
      color: "text-blue-600",
    },
    {
      title: "Total Bonus",
      value:
        "₹" +
        payrolls.reduce(
          (sum, p) => sum + (p.bonus || 0),
          0
        ),
      color: "text-green-500",
    },
    {
      title: "Total Salary Paid",
      value:
        "₹" +
        payrolls.reduce(
          (sum, p) => sum + (p.netSalary || 0),
          0
        ),
      color: "text-purple-500",
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

function PayrollTable({ payrolls }) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Payroll Records
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Basic</th>
              <th className="p-3">Bonus</th>
              <th className="p-3">Deduction</th>
              <th className="p-3">Net Salary</th>
            </tr>
          </thead>

          <tbody>
            {payrolls.map((payroll) => (
              <PayrollRow
                key={payroll.id}
                payroll={payroll}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function PayrollRow({ payroll }) {
  return (
    <tr className="border-b hover:bg-blue-50">
      <td className="p-3">
        {payroll.id}
      </td>

      <td className="p-3">
        {payroll.employeeName}
      </td>

      <td className="p-3">
        ₹{payroll.basicSalary}
      </td>

      <td className="p-3 text-green-600">
        ₹{payroll.bonus}
      </td>

      <td className="p-3 text-red-600">
        ₹{payroll.deduction}
      </td>

      <td className="p-3 font-bold text-blue-600">
        ₹{payroll.netSalary}
      </td>
    </tr>
  );
}
