import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/data";
import AdminAttendanceUpdater from "./AdminAttendanceUpdater";

function formatDate(date) {
  return date.toISOString().split("T")[0];
}

const AttendanceFilter = () => {
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
const [monthLabel, setMonthLabel] = useState("");

  useEffect(() => {
    const todayStr = formatDate(new Date());
    setDate(todayStr);
    fetchAttendance(todayStr);
  }, []);

  const fetchAttendance = async (queryDate) => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.get(`${baseUrl}/api/attendance/by-date`, {
        params: { date: queryDate },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setResults(res.data.data);
    } catch (err) {
      console.error("Error fetching attendance", err);
    }
  };
const fetchMonthlyAttendance = async () => {
  const token = localStorage.getItem("token");
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-based index

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  const monthName = monthNames[month];
  setMonthLabel(`${monthName} ${year}`);

  try {
    const res = await axios.get(`${baseUrl}/api/attendance/monthly/all`, {
      params: { month: `${year}-${String(month + 1).padStart(2, "0")}` },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setResults(res.data.data);
  } catch (err) {
    console.error("Error fetching monthly attendance", err);
  }
};



 const handleQuickSelect = (option) => {
  const token = localStorage.getItem("token");
  const today = new Date();

  if (option === "today") {
    const todayStr = formatDate(today);
    setDate(todayStr);
    fetchAttendance(todayStr);
  } else if (option === "yesterday") {
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = formatDate(yesterday);
    setDate(yesterdayStr);
    fetchAttendance(yesterdayStr);
  } else if (option === "thisWeek") {
    const monday = new Date(today);
    monday.setDate(today.getDate() - today.getDay() + 1);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);

    axios
      .get(`${baseUrl}/api/attendance/by-date-range`, {
        params: {
          start: formatDate(monday),
          end: formatDate(sunday),
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setResults(res.data.data))
      .catch((err) => console.error(err));
  } else if (option === "thisMonth") {
    fetchMonthlyAttendance();
  }
};

const downloadCSV = () => {
  if (results.length === 0) {
    alert("No data to download");
    return;
  }

  const headers = [
    "Name",
    "Status",
    "Entry Time",
    "Approval",
    "Remark",
  ];

  const csvRows = [
    headers.join(","), // header row
    ...results.map((record) => {
      const name = record.user?.name || "N/A";
      const status = record.status || "";
      const entryTime = new Date(record.timestamp).toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
      const approval = record.approved ? "Approved" : "Pending";
      const remark = record.remark || "";
      return [name, status, entryTime, approval, remark].join(",");
    }),
  ];

  const csvString = csvRows.join("\n");
  const blob = new Blob([csvString], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = `attendance-${date || "report"}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  console.log("res", results);
  return (
    <div className="mt-8 bg-white p-6 rounded-xl shadow-md">
        {monthLabel && (
  <h2 className="text-lg font-semibold text-purple-700 mb-2">
    Showing Attendance for: {monthLabel}
  </h2>
)}

      <div className="flex flex-wrap items-center gap-4 mb-6">
        <select
          value={date}
          onChange={(e) => handleQuickSelect(e.target.value)}
          className="border border-purple-300 rounded px-4 py-2 text-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="thisWeek">This Week</option>
          <option value="thisMonth">This Month</option>

        </select>
        <input
          type="date"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            fetchAttendance(e.target.value);
          }}
          className="border border-purple-300 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 px-4 py-2 rounded w-full sm:w-auto outline-none"
        />
         <button
    onClick={downloadCSV}
    className=" border border-green-600 text-green-600 px-4 py-2 rounded transition"
  >
    Download CSV
  </button>
      </div>

  
  <div className="overflow-x-auto mt-6 shadow-md rounded-lg border border-purple-200">
  <table className="min-w-full text-sm text-left text-gray-600">
    <thead className="text-xs uppercase bg-purple-100 text-purple-800">
      <tr>
        <th className="px-6 py-4 border-b">Name</th>
        <th className="px-6 py-4 border-b">Status</th>
        <th className="px-6 py-4 border-b">Entry Time</th>
        <th className="px-6 py-4 border-b">Status</th>
        <th className="px-6 py-4 border-b">Approval</th>
        <th className="px-6 py-4 border-b">Remark</th>
        <th className="px-6 py-4 border-b text-center">Action</th>
      </tr>
    </thead>
    <tbody>
      {results.length > 0 ? (
        results.map((record) => (
          <tr
            key={record._id}
            className="bg-white hover:bg-purple-50 transition duration-200 border-b"
          >
            <td className="px-6 py-4">{record.user?.name}</td>
            <td className="px-6 py-4 capitalize">{record.status}</td>
            <td className="px-6 py-4">
              {new Date(record.timestamp).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </td>
            <td className="px-6 py-4 capitalize">{record.status}</td>
            <td className="px-6 py-4">
              {record.approved ? (
                <span className="text-green-600 font-semibold bg-green-100 px-2 py-1 rounded-full">
                  Approved
                </span>
              ) : (
                <span className="text-red-600 font-semibold bg-red-100 px-2 py-1 rounded-full">
                  Pending
                </span>
              )}
            </td>
            <td className="px-6 py-4 capitalize">{record.remark}</td>
            <td className="px-6 py-4 text-center">
              <button
                onClick={() => {
                  setSelectedRecord(record);
                  setOpenEditModal(true);
                }}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
              >
                Give Remark
              </button>
            </td>
          </tr>
        ))
      ) : (
        <tr>
          <td colSpan="7" className="text-center py-6 text-purple-500">
            No records found.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>

      {openEditModal && selectedRecord && (
        <AdminAttendanceUpdater
          record={selectedRecord}
          onClose={() => setOpenEditModal(false)}
          fetchAttendance={fetchAttendance}
        />
      )}
    </div>
  );
};

export default AttendanceFilter;
