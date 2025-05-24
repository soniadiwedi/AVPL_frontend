import { useState } from 'react';
import { baseUrl } from '../../utils/data';
import axios from 'axios';
import toast from 'react-hot-toast';

const TravelRequestList = ({ data ,fetchData}) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [selectedRequestId, setSelectedRequestId] = useState(null);
  const [actualCost, setActualCost] = useState("");
  const [bookingDetails, setBookingDetails] = useState("");


const handleReimbursement = (id, returnDate, status) => {
  const today = new Date();
  const returnDt = new Date(returnDate);

  // First check: Status must be approved
  if (status !== 'approved') {
    setModalMessage('Only approved requests can submit reimbursement.');
    setShowModal(true);
    return;
  }

  // Second check: Return date must be in the past
  if (returnDt > today) {
    setModalMessage('You can fill the reimbursement form only after your return date.');
    setShowModal(true);
    return;
  }

  // All checks passed, allow reimbursement
  setSelectedRequestId(id);
  setModalMessage('');
  setShowModal(true);
};


  const closeModal = () => {
    setShowModal(false);
    setModalMessage('');
    setSelectedRequestId(null);
  };

    const handleSubmit = async (e) => {
      console.log("31" ,selectedRequestId)
    e.preventDefault();
    try {
     let response= await axios.patch(`${baseUrl}/api/travel/${selectedRequestId}/reimburse`, {
        actualCost,
        bookingDetails,
      }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log("res",response)
        toast.success(response.data.message||"Reimbursement submitted", {
        duration: 4000,
        style: {
          background: "green",
          color: "white",
        },
      });
      fetchData()
      closeModal()
    } catch (err) {
      console.log(err)
      alert("Error submitting reimbursement");
    }
  };
  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-purple-800 mb-6">My Travel Requests</h2>

      {data && data.length > 0 ? (
        <div className="overflow-x-auto mt-6 ">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-purple-100 text-purple-800">
              <tr>
                <th className="px-6 py-4 border-b">From</th>
                <th className="px-6 py-4 border-b">To</th>
                <th className="px-6 py-4 border-b">Departure</th>
                <th className="px-6 py-4 border-b">Return</th>
                <th className="px-6 py-4 border-b">Purpose</th>
                <th className="px-6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b">Estimated Cost</th>
                <th className="px-6 py-4 border-b">Reimbursement</th>
              </tr>
            </thead>
            <tbody>
              {data.map((req) => (
                <tr
                  key={req._id}
                  className="bg-white hover:bg-purple-50 transition duration-200 border-b"
                >
                  <td className="px-6 py-4">{req.travelFrom}</td>
                  <td className="px-6 py-4">{req.travelTo}</td>
                  <td className="px-6 py-4">
                    {new Date(req.departureDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    {new Date(req.returnDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">{req.purpose}</td>

                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span
                      className={`capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        req.requestStatus === 'pending'
                          ? 'bg-green-100 text-green-800'
                          : req.requestStatus === 'approved'
                          ? 'bg-yellow-100 text-yellow-800'
                          : req.requestStatus === 'reimbursement requested'
                          ? 'bg-green-100 text-green-800'
                          : req.requestStatus === 'completed'
                          ? 'bg-yellow-100 text-yellow-800'
                          : req.requestStatus === 'rejected'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {req.requestStatus}
                    </span>
                  </td>

                  <td className="px-6 py-4">₹{req.estimatedCost}</td>

                  <td className="px-6 py-4">
                    <button
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded"
                        onClick={() => handleReimbursement(req._id, req.returnDate,req.requestStatus)}
                      >
                        Request Reimbursement
                      </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center text-gray-600 py-8">
          No travel requests found.
        </div>
      )}

      {/* Modal */}
  {showModal && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
    <div className="relative bg-white rounded-lg p-6 w-[90%] max-w-md">
      
      {/* Close Icon Top-Right */}
      <button
        onClick={closeModal}
        className="absolute top-3 right-3 text-red-500 hover:text-red-800 text-xl"
        aria-label="Close"
      >
        &times;
      </button>

      <h3 className="text-lg font-semibold text-purple-800 mb-4">
        Reimbursement
      </h3>

      {modalMessage ? (
        <p className="text-sm text-red-600 mb-4">{modalMessage}</p>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit} >
          {/* Reimbursement Form Fields */}
          <div>
            <label className="block text-sm font-medium">Amount</label>
            <input
              type="number"
              value={actualCost}
              onChange={(e)=>setActualCost(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Details</label>
            <textarea
             value={bookingDetails}
              onChange={(e)=>setBookingDetails(e.target.value)}
              className="mt-1 block w-full border border-gray-300 rounded px-3 py-2"
              rows="3"
            ></textarea>
          </div>
          <button
            type="submit"
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        </form>
      )}
    </div>
  </div>
)}

    </div>
  );
};

export default TravelRequestList;
