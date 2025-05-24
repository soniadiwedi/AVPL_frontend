import React, { useState } from 'react';
import { baseUrl } from '../../utils/data';
import useGetQuery from '../../hooks/useGetQuery';
import AssignTickeModal from "../modal/AssignTickeModal"

const TicketsComponent = () => {
  const { dataGet: data, loading, error,fetchData } = useGetQuery(`${baseUrl}/api/tickets`);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState(null);

  const openModal = (ticket) => {
    setSelectedTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedTicket(null);
    setIsModalOpen(false);
  };

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-purple-800 mb-6">My Tickets</h2>

      {loading && <div className="text-center text-gray-600">Loading tickets...</div>}
      {error && <div className="text-center text-red-600">Error fetching tickets: {error.message}</div>}

      {!loading && !error && (
        data && data.length > 0 ? (
          <>
            <table className="min-w-full divide-y divide-purple-200 border border-purple-200 rounded-lg overflow-hidden">
              <thead className="bg-purple-800">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">S. No.</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Employee Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Subject</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Priority</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date of Issue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Preferred Resolution Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Attachments</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-purple-200">
                {data.map((ticket, index) => (
                  <tr key={ticket._id} className="hover:bg-purple-50 transition duration-150 ease-in-out">
                    <td className="px-6 py-4 text-sm text-gray-800">{index + 1}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{ticket.employeeName}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{ticket.subject}</td>
                    <td className="px-6 py-4 text-sm w-1/2">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                        ticket.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                        ticket.status === 'closed' ? 'bg-red-100 text-red-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-800">{ticket.priority}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{ticket.dateOfIssue ? new Date(ticket.dateOfIssue).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">{ticket.preferredResolutionDate ? new Date(ticket.preferredResolutionDate).toLocaleDateString() : 'N/A'}</td>
                    <td className="px-6 py-4 text-sm text-gray-800">
                      {ticket.attachments?.length > 0 ? (
                        <a href={`${baseUrl}/${ticket.attachments[0]}`} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 underline">
                          {ticket.attachments.length > 1 ? `${ticket.attachments.length} Files` : 'View Attachment'}
                        </a>
                      ) : "No Attachments"}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <button
                        onClick={() => openModal(ticket)}
                        className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700"
                      >
                        Assign
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Modal */}
           {isModalOpen && <AssignTickeModal isOpen={isModalOpen} onClose={closeModal} ticket={selectedTicket} fetchData={fetchData}/>}
          </>
        ) : (
          <div className="text-center text-gray-600 py-8">
            No tickets found.
          </div>
        )
      )}
    </div>
  );
};

export default TicketsComponent;
