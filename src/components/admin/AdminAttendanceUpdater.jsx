import React, { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "../../utils/data";

function AdminAttendanceUpdater({ record, onClose,fetchAttendance }) {
  const [remark, setRemark] = useState(record.remark || "");
  const [approved, setApproved] = useState(record.approved || false);
  const [message, setMessage] = useState("");


 const handleUpdate = async (e) => {
  e.preventDefault();

  const token = localStorage.getItem("token"); // Adjust as needed

  try {
    await axios.put(
      `${baseUrl}/api/attendance/${record._id}/update-by-admin`,
      { remark, approved },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    fetchAttendance()
    setMessage("Updated successfully!");
    setTimeout(() => {
      setMessage("");
      onClose(); // Close modal after success
    }, 1000);
  } catch (err) {
    setMessage("Error updating attendance");
  }
};


  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-xl font-bold"
        >
          &times;
        </button>
        <h3 className="text-lg font-bold mb-4">Update Attendance for {record.user?.name}</h3>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            placeholder="Write Remark"
            value={remark}
            onChange={(e) => setRemark(e.target.value)}
            className="w-full mb-3 border border-gray-500 p-2 rounded"
          />
          <label className="flex items-center mb-4">
            <input
              type="checkbox"
              checked={approved}
              onChange={(e) => setApproved(e.target.checked)}
              className="mr-2"
            />
            Approve
          </label>
          <button
            type="submit"
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Update
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-green-600">{message}</p>}
      </div>
    </div>
  );
}

export default AdminAttendanceUpdater;
