import React, { useState, useEffect } from "react";
import { X } from "lucide-react";
import usePostQueryFiles from "../../hooks/usePostQueryFiles";
import { baseUrl } from "../../utils/data";
import { useAuth } from "../context/AuthContext";

const TicketFormModal = ({ closeModal }) => {
  const { user } = useAuth();

  const [ticketData, setTicketData] = useState({
    employeeName: "",
    employeeId: "",
    department: "",
    ticketCategory: "",
    subject: "",
    description: "",
    priority: "medium",
    dateOfIssue: "",
    attachments: [],
    preferredResolutionDate: "",
  });

  const {
    createPost,
    loading: postLoading,
    error: postError,
  } = usePostQueryFiles(`${baseUrl}/api/tickets/create`);

  useEffect(() => {
    if (user) {
      setTicketData((prev) => ({
        ...prev,
        employeeName: user.name || "",
        employeeId: user._id || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTicketData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setTicketData((prevData) => ({
      ...prevData,
      attachments: e.target.files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(ticketData).forEach((key) => {
      if (key === "attachments") {
        Array.from(ticketData.attachments).forEach((file) => {
          formData.append("attachments", file);
        });
      } else {
        formData.append(key, ticketData[key]);
      }
    });

    await createPost(formData);
    closeModal()
    setTicketData({
           employeeName: "",
    employeeId: "",
    department: "",
    ticketCategory: "",
    subject: "",
    description: "",
    priority: "medium",
    dateOfIssue: "",
    attachments: [],
    preferredResolutionDate: "",
    })
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        >
          <X />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create New Ticket
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Department
              </label>
              <input
                type="text"
                name="department"
                value={ticketData.department}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Ticket Category
              </label>
              <input
                type="text"
                name="ticketCategory"
                value={ticketData.ticketCategory}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                name="subject"
                value={ticketData.subject}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                value={ticketData.description}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <select
                name="priority"
                value={ticketData.priority}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Date of Issue
              </label>
              <input
                type="date"
                name="dateOfIssue"
                value={ticketData.dateOfIssue}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Preferred Resolution Date
              </label>
              <input
                type="date"
                name="preferredResolutionDate"
                value={ticketData.preferredResolutionDate}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Attachments
              </label>
              <input
                type="file"
                name="attachments"
                multiple
                onChange={handleFileChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
              {ticketData.attachments.length > 0 && (
                <p className="text-sm text-gray-500 mt-1">
                  {ticketData.attachments.length} file(s) selected
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-6">
         
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
            >
              {postLoading ? "Submitting..." : "Raise Ticket"}
            </button>
          </div>

          {postError && (
            <p className="text-red-600 text-sm mt-2">{postError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default TicketFormModal;
