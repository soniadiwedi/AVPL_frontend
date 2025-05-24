import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";
import { baseUrl } from "../utils/data";

const socket = io(baseUrl);

function AttendanceTracker() {
  const [attendanceList, setAttendanceList] = useState([]);

  useEffect(() => {
    fetchRecords();
    socket.on("attendanceMarked", (newRecord) => {
      setAttendanceList((prev) => [...prev, newRecord]);
    });
    return () => socket.disconnect();
  }, []);

  const fetchRecords = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(`${baseUrl}/api/attendance/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAttendanceList(res.data.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Attendance Records</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="px-4 py-2 border-b">Name</th>
              <th className="px-4 py-2 border-b">Entry Time</th>
              <th className="px-4 py-2 border-b">Status</th>
              <th className="px-4 py-2 border-b">Approved</th>
            </tr>
          </thead>
          <tbody>
            {attendanceList.map((record) => (
              <tr key={record._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border-b">{record.user?.name}</td>
                <td className="px-4 py-2 border-b">
                  {new Date(record.timestamp).toLocaleString()}
                </td>
                <td className="px-4 py-2 border-b capitalize">{record.status}</td>
                <td className="px-4 py-2 border-b">
                  {record.approved ? (
                    <span className="text-green-600 font-medium">Approved</span>
                  ) : (
                    <span className="text-red-600 font-medium">Pending</span>
                  )}
                </td>
              </tr>
            ))}
            {attendanceList.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No attendance records found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceTracker;
