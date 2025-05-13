import React, { useState } from "react";
import AssetRequestModal from "../user/AssetRequestModal";

const UserTable = ({ user }) => {
  const [selectedEmail, setSelectedEmail] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (user) => {
    setSelectedEmail(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedEmail(null);
    setIsModalOpen(false);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <div className="overflow-x-auto lg:text-base text-sm">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-left text-gray-700">
            <tr>
              <th className="py-3 px-4 border-b">Name</th>
              <th className="py-3 px-4 border-b">Email</th>
              <th className="py-3 px-4 border-b">Role</th>
            </tr>
          </thead>
          <tbody>
            {user?.map((u) => (
              <tr key={u._id} className="hover:bg-gray-50">
                <td className="py-3 px-4 border-b">{u.name}</td>
                <td className="py-3 px-4 border-b">{u.email}</td>
                <td className="py-3 px-4 border-b capitalize">{u.role}</td>
                
              </tr>
            ))}
            {user?.length === 0 && (
              <tr>
                <td colSpan="4" className="text-center py-4 text-gray-500">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <AssetRequestModal
        user={selectedEmail}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default UserTable;
