import React, { useState } from "react";
import TicketList from "../../components/table/TicketList";
import TicketFormModal from "../../components/modal/TicketFormModal";
import useGetQuery from "../../hooks/useGetQuery";
import { baseUrl } from "../../utils/data";
import { useAuth } from "../../components/context/AuthContext";

const TicketPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const {
    dataGet: data,
    loading,
    error,
    fetchData,
  } = useGetQuery(`${baseUrl}/api/tickets`);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  // Filter tickets for the current user
  const filteredTickets =
    data?.filter(
      (ticket) => ticket?.employeeId === user?._id
    ) || [];

    console.log("tick",data)
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm lg:text-lg font-medium text-gray-700">
            Your Tickets
          </h3>
          <button
            onClick={openModal}
            className="bg-purpuleLight hover:bg-primary text-white text-sm lg:text-base px-3 lg:px-5 py-2 rounded-md font-medium transition"
          >
            + Create Ticket
          </button>
        </div>

        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : filteredTickets.length > 0 ? (
          <TicketList data={filteredTickets} fetchData={fetchData} />
        ) : (
          <div className="border border-dashed rounded-md p-4 text-center text-gray-500">
            No Tickets Found.
          </div>
        )}
      </div>

      {isModalOpen && <TicketFormModal closeModal={closeModal} />}
    </div>
  );
};

export default TicketPage;
