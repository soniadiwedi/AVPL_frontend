import React from 'react';
import useGetQuery from '../../hooks/useGetQuery';
import { baseUrl } from '../../utils/data';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const TravelRequest = () => {
  const navigate = useNavigate();
  const {
    dataGet: data,
    loading,
    error,
    fetchData,
  } = useGetQuery(`${baseUrl}/api/travel`);
     console.log("data",data)

  const handleApprove = async (id) => {
    let response=await axios.patch(`${baseUrl}/api/travel/${id}/approve`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });
   
       toast.success(response.data.message||"Request approved", {
        duration: 4000,
        style: {
          background: "green",
          color: "white",
        },
      });
      fetchData()
    // alert("Request approved");
  };
  return (
    <div className="overflow-x-auto bg-white p-6 rounded-lg shadow-md">
    <div className="flex justify-between items-center mb-6">
  <h2 className="text-2xl font-semibold text-purple-800">
    All Travel Requests
  </h2>
<button
  onClick={() => navigate('/reimburstment-request')}
  className="inline-flex items-center justify-center gap-2 
             bg-transparent border border-blue-600 text-blue-600 font-semibold 
             px-6 py-3 rounded-lg 
             hover:bg-blue-50 
             focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 
             transition ease-in-out duration-200"
>
  History
</button>
</div>

    
      {loading ? (
        <div className="text-blue-600">Loading...</div>
      ) : error ? (
        <div className="text-red-500">Error: {error}</div>
      ) : data?.travelRequests?.length > 0 ? (
        <div className="overflow-x-auto mt-6 shadow-md rounded-lg border border-purple-200">
          <table className="min-w-full text-sm text-left text-gray-600">
            <thead className="text-xs uppercase bg-purple-100 text-purple-800">
              <tr>
                <th className="px-6 py-4 border-b">Name</th>
                <th className="px-6 py-4 border-b">From</th>
                <th className="px-6 py-4 border-b">To</th>
                <th className="px-6 py-4 border-b">Departure</th>
                <th className="px-6 py-4 border-b">Return</th>
                <th className="px-6 py-4 border-b">Purpose</th>
                <th className="px-6 py-4 border-b">Status</th>
                <th className="px-6 py-4 border-b">Estimated Cost</th>
                <th className="px-6 py-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.travelRequests.map((req) => (
                <tr
                  key={req._id}
                  className="bg-white hover:bg-purple-50 transition duration-200 border-b"
                >
                  <td className="px-6 py-4">{req.requestedByUserId?.name || 'N/A'}</td>
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
                  {/* Styling status based on its value */}
                  <span className={`capitalize px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      req.requestStatus === 'pending' ? 'bg-green-100 text-green-800' :
                      req.requestStatus === 'approved' ? 'bg-yellow-100 text-yellow-800' :
                      req.requestStatus === 'reimbursement requested' ? 'bg-green-100 text-green-800' :
                      req.requestStatus === 'completed' ? 'bg-yellow-100 text-yellow-800' :
                      req.requestStatus === 'rejected' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800' // Default
                  }`}>
                    {req.requestStatus}
                  </span>
                </td>
                  <td className="px-6 py-4">₹{req.estimatedCost}</td>
                  <td className="px-6 py-4">
  <button
    onClick={() => handleApprove(req._id)}
    disabled={req.requestStatus === 'approved' || req.requestStatus === 'reimbursement requested' || req.requestStatus === 'completed'}
     className={`px-4 py-2 rounded font-medium transition duration-200 ${
    req.requestStatus === 'approved' ||
    req.requestStatus === 'reimbursement requested' ||
    req.requestStatus === 'completed'
      ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
      : 'bg-green-600 hover:bg-green-700 text-white'
  }`}
  >
    {req.requestStatus === 'approved' ? 'Approved' : 'Approve'}
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
    </div>
  );
};

export default TravelRequest;
