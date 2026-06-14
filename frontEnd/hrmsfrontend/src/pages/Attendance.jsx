import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import API from "../services/api";
import { FaCalendarCheck } from "react-icons/fa";

export default function Attendance() {
  const [attendance, setAttendance] = useState([]);
  const [employeeId, setEmployeeId] = useState("");

  useEffect(() => {
    fetchAttendance();
  }, []);

  const fetchAttendance = async () => {
    try {
      const response = await API.get("/attendance");
      setAttendance(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const checkIn = async () => {
    if (!employeeId) {
      alert("Enter Employee ID");
      return;
    }

    try {
      await API.post("/attendance/checkin", {
        employeeId: Number(employeeId),
      });

      alert("Check In Successful");

      setEmployeeId("");
      fetchAttendance();
    } catch (error) {
      console.error(error);
      alert("Check In Failed");
    }
  };

  const checkOut = async (attendanceId) => {
    try {
      await API.post("/attendance/checkout", {
        attendanceId: attendanceId,
      });

      alert("Check Out Successful");

      fetchAttendance();
    } catch (error) {
      console.error(error);
      alert("Check Out Failed");
    }
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-64 min-h-screen bg-blue-50 p-8">
        {/* Header */}
        <section className="flex items-center gap-3 mb-8">
          <FaCalendarCheck className="text-4xl text-blue-600" />

          <h1 className="text-3xl font-bold text-blue-600">
            Attendance Management
          </h1>
        </section>

        {/* Check In Card */}
        <CheckInCard
          employeeId={employeeId}
          setEmployeeId={setEmployeeId}
          checkIn={checkIn}
        />

        {/* Attendance Table */}
        <AttendanceTable
          attendance={attendance}
          checkOut={checkOut}
        />
      </div>
    </div>
  );
}

function CheckInCard({
  employeeId,
  setEmployeeId,
  checkIn,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        Employee Check In
      </h2>

      <div className="flex gap-4">
        <input
          type="number"
          placeholder="Employee ID"
          value={employeeId}
          onChange={(e) =>
            setEmployeeId(e.target.value)
          }
          className="flex-1 border p-3 rounded-2xl"
        />

        <button
          onClick={checkIn}
          className="bg-blue-600 text-white px-6 py-3 rounded-2xl hover:bg-blue-700"
        >
          Check In
        </button>
      </div>
    </div>
  );
}

function AttendanceTable({
  attendance,
  checkOut,
}) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">
        Attendance Records
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-blue-600 text-white">
              <th className="p-3">ID</th>
              <th className="p-3">Employee</th>
              <th className="p-3">Date</th>
              <th className="p-3">Check In</th>
              <th className="p-3">Check Out</th>
              <th className="p-3">Hours</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>

          <tbody>
            {attendance.map((a) => (
              <AttendanceRow
                key={a.id}
                attendance={a}
                checkOut={checkOut}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function AttendanceRow({
  attendance,
  checkOut,
}) {
  return (
    <tr className="border-b hover:bg-blue-50">
      <td className="p-3">
        {attendance.id}
      </td>

      <td className="p-3">
        {attendance.employeeName}
      </td>

      <td className="p-3">
        {attendance.attendanceDate}
      </td>

      <td className="p-3">
        {attendance.checkInTime}
      </td>

      <td className="p-3">
        {attendance.checkOutTime || "-"}
      </td>

      <td className="p-3">
        {attendance.workingHours || 0}
      </td>

      <td className="p-3">
        {attendance.checkOutTime ? (
          <span className="text-green-600 font-semibold">
            Completed
          </span>
        ) : (
          <button
            onClick={() =>
              checkOut(attendance.id)
            }
            className="bg-red-500 text-white px-4 py-2 rounded-xl hover:bg-red-600"
          >
            Check Out
          </button>
        )}
      </td>
    </tr>
  );
}

