import React from "react";
import { baseUrl } from "../../utils/data"; // Assuming baseUrl is correctly imported

const TicketList = ({ data }) => {
  console.log("data", data);

  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md"> {/* Added background, padding, rounded corners, and shadow */}
      <h2 className="text-2xl font-semibold text-purple-800 mb-6">My Tickets</h2> {/* Increased font size, changed color, increased bottom margin */}

      {data && data.length > 0 ? (
        <table className="min-w-full divide-y divide-purple-200 border border-purple-200 rounded-lg overflow-hidden"> {/* Added min-w-full, purple dividers, rounded corners */}
          <thead className="bg-purple-800"> {/* Purple header background */}
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"> 
                S. No.
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"> 
                Subject
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"> 
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"> 
                Priority
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"> 
                Date of Issue
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"> 
                Preferred Resolution Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider"> 
                Attachments
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-purple-200"> 
            {data.map((ticket, index) => (
              <tr key={ticket._id} className="hover:bg-purple-50 transition duration-150 ease-in-out"> 
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{index + 1}</td> {/* Adjusted padding, text color */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ticket.subject}</td> {/* Adjusted padding, text color */}
                 <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {/* Styling status based on its value */}
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                      ticket.status === 'in progress' ? 'bg-yellow-100 text-yellow-800' :
                      ticket.status === 'closed' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800' // Default
                  }`}>
                    {ticket.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{ticket.priority}</td> {/* Adjusted padding, text color */}
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> {/* Adjusted padding, text color */}
                  {ticket.dateOfIssue ? new Date(ticket.dateOfIssue).toLocaleDateString() : 'N/A'} {/* Added check and fallback */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> {/* Adjusted padding, text color */}
                   {ticket.preferredResolutionDate ? new Date(ticket.preferredResolutionDate).toLocaleDateString() : 'N/A'} {/* Added check and fallback */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> {/* Adjusted padding, text color */}
                  {/* Displaying attachments if any */}
                  {ticket.attachments && ticket.attachments.length > 0 ? (
                    <a
                      href={`${baseUrl}/${ticket.attachments[0]}`} // Still linking the first attachment as per original logic
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-purple-600 hover:text-purple-800 underline transition-colors duration-200" // Purple link with underline and hover
                    >
                       {ticket.attachments.length > 1 ? `${ticket.attachments.length} Files` : 'View Attachment'} {/* Indicate number of files */}
                    </a>
                  ) : (
                    "No Attachments"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="text-center text-gray-600 py-8">
          No tickets found.
        </div>
      )}
    </div>
  );
};

export default TicketList;