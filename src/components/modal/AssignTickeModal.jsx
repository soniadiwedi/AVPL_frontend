import React, { useState } from "react";
import { X } from "lucide-react";
import axios from "axios";
import { baseUrl } from "../../utils/data";
import { useAuth } from "../context/AuthContext";
import usePatch from "../../hooks/usePatchVendor";
import useGetQuery from "../../hooks/useGetQuery";

const AssignTickeModal = ({ onClose, ticket ,fetchData}) => {
  const { user } = useAuth();
  const [assigningPerson, setAssigningPerson] = useState("");
    const { dataGet } = useGetQuery(
    `${baseUrl}/api/users`
  );

  const{updateData, loading, error}=usePatch( `${baseUrl}/api/tickets/update/${ticket?._id}`) 
  const handleAssign = async (e) => {
    e.preventDefault();
   await updateData({ assigningPerson });
  fetchData()
   onClose()
  };
const adminUsers = dataGet.filter(user => user.role === "admin");
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-md">
        <button
          onClick={()=>onClose()}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        >
          <X />
        </button>

        <h2 className="text-2xl font-semibold mb-4 text-center">
          Assign Ticket
        </h2>

        <form onSubmit={handleAssign} className="space-y-4">
            <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      Assign To
    </label>
    <select
      value={assigningPerson}
      onChange={(e) => setAssigningPerson(e.target.value)}
      required
      className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
    >
      <option value="" disabled>Select Assigning Person</option>
      {adminUsers.map((admin) => (
        <option key={admin._id} value={admin.name}>
          {admin.name}
        </option>
      ))}
    </select>
  </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {loading ? "Assigning..." : "Assign"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssignTickeModal;
