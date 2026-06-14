import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import API from "../services/api";
import { FaUsers, FaPlus } from "react-icons/fa";

export default function Employees() {
  const [employees, setEmployees] = useState([]);

  const [form, setForm] = useState({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    department: "",
    designation: "",
    salary: "",
    role: "",
    password: "",
  });

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await API.get("/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const addEmployee = async () => {
    try {
      await API.post("/employees", {
        ...form,
        salary: Number(form.salary),
      });

      alert("Employee Added Successfully");

      setForm({
        employeeCode: "",
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
        department: "",
        designation: "",
        salary: "",
        role: "",
        password: "",
      });

      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Failed To Add Employee");
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await API.delete(`/employees/${id}`);

      alert("Employee Deleted");

      fetchEmployees();
    } catch (error) {
      console.error(error);
      alert("Delete Failed");
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-64 min-h-screen bg-gradient-to-br from-blue-50 to-white">
        <Navbar />

        <div className="p-8">
          <EmployeeHeader />

          <EmployeeStats employees={employees} />

          <AddEmployeeForm
            form={form}
            setForm={setForm}
            addEmployee={addEmployee}
          />

          <EmployeeTable
            employees={employees}
            deleteEmployee={deleteEmployee}
          />
        </div>
      </div>
    </div>
  );
}

function EmployeeHeader() {
  return (
    <div className="flex items-center gap-3 mb-8">
      <FaUsers className="text-4xl text-blue-600" />

      <h1 className="text-4xl font-bold text-blue-600">
        Employee Management
      </h1>
    </div>
  );
}

function EmployeeStats({ employees }) {
  const stats = [
    {
      title: "Total Employees",
      value: employees.length,
      color: "text-blue-600",
    },
    {
      title: "Active Employees",
      value: employees.filter((e) => e.active).length,
      color: "text-green-500",
    },
    {
      title: "Departments",
      value: new Set(
        employees.map((e) => e.department)
      ).size,
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
    <div className="bg-white p-6 rounded-3xl shadow-xl border border-blue-100">
      <h3 className="text-gray-500">
        {title}
      </h3>

      <h1 className={`text-4xl font-bold mt-2 ${color}`}>
        {value}
      </h1>
    </div>
  );
}

function AddEmployeeForm({
  form,
  setForm,
  addEmployee,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8 mb-8">
      <div className="flex items-center gap-2 mb-6">
        <FaPlus className="text-blue-600" />

        <h2 className="text-2xl font-semibold text-blue-600">
          Add Employee
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <input
          placeholder="Employee Code"
          value={form.employeeCode}
          onChange={(e) =>
            setForm({
              ...form,
              employeeCode: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          placeholder="First Name"
          value={form.firstName}
          onChange={(e) =>
            setForm({
              ...form,
              firstName: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          placeholder="Last Name"
          value={form.lastName}
          onChange={(e) =>
            setForm({
              ...form,
              lastName: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({
              ...form,
              email: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={(e) =>
            setForm({
              ...form,
              phoneNumber: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          placeholder="Department"
          value={form.department}
          onChange={(e) =>
            setForm({
              ...form,
              department: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          placeholder="Designation"
          value={form.designation}
          onChange={(e) =>
            setForm({
              ...form,
              designation: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <input
          type="number"
          placeholder="Salary"
          value={form.salary}
          onChange={(e) =>
            setForm({
              ...form,
              salary: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({
              ...form,
              role: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        >
          <option value="">
            Select Role
          </option>

          <option value="ADMIN">
            ADMIN
          </option>

          <option value="EMPLOYEE">
            EMPLOYEE
          </option>
        </select>

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          className="border p-3 rounded-2xl"
        />
      </div>

      <button
        onClick={addEmployee}
        className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-2xl shadow-lg"
      >
        Add Employee
      </button>
    </div>
  );
}

function EmployeeTable({
  employees,
  deleteEmployee,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-xl border border-blue-100 p-8">
      <h2 className="text-2xl font-semibold text-blue-600 mb-6">
        Employee List
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Code</th>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Department</th>
              <th className="p-3">Designation</th>
              <th className="p-3">Salary</th>
              <th className="p-3">Role</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <EmployeeRow
                key={emp.id}
                emp={emp}
                deleteEmployee={deleteEmployee}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function EmployeeRow({
  emp,
  deleteEmployee,
}) {
  return (
    <tr className="border-b hover:bg-blue-50">
      <td className="p-3">{emp.id}</td>

      <td className="p-3">
        {emp.employeeCode}
      </td>

      <td className="p-3">
        {emp.firstName} {emp.lastName}
      </td>

      <td className="p-3">
        {emp.email}
      </td>

      <td className="p-3">
        {emp.department}
      </td>

      <td className="p-3">
        {emp.designation}
      </td>

      <td className="p-3">
        ₹{emp.salary}
      </td>

      <td className="p-3">
        {emp.role}
      </td>

      <td className="p-3">
        <button
          onClick={() =>
            deleteEmployee(emp.id)
          }
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-2 rounded-xl"
        >
          Delete
        </button>
      </td>
    </tr>
  );
}

