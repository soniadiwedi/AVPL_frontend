import useGetQuery from "../hooks/useGetQuery";
import { baseUrl } from "../utils/data";

const ReimbursementRequests = () => {
  const {
    dataGet: data,
    loading,
    error,
    fetchData,
  } = useGetQuery(`${baseUrl}/api/travel/reimbursements`);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className=" overflow-x-auto mt-6 shadow-md rounded-lg border border-purple-200">
          <h2 className="p-5 text-2xl font-semibold text-purple-800">
    All Reimbursement Requests
  </h2>
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
            <th className="px-6 py-4 border-b">Actual Cost</th>
            <th className="px-6 py-4 border-b">Approved By</th>
            <th className="px-6 py-4 border-b">Action</th>
          </tr>
        </thead>
        <tbody>
          {data?.reimbursedRequests?.map((req) => (
            <tr key={req._id} className="border-b hover:bg-gray-50">
              <td className="px-6 py-4">{req.requestedByUserId?.name}</td>
              <td className="px-6 py-4 capitalize">{req.travelFrom}</td>
              <td className="px-6 py-4 capitalize">{req.travelTo}</td>
              <td className="px-6 py-4">{new Date(req.departureDate).toLocaleDateString()}</td>
              <td className="px-6 py-4">{new Date(req.returnDate).toLocaleDateString()}</td>
              <td className="px-6 py-4">{req.purpose}</td>
              <td className="px-6 py-4 capitalize">{req.requestStatus}</td>
              <td className="px-6 py-4">₹{req.estimatedCost}</td>
              <td className="px-6 py-4">₹{req.actualCost}</td>
              <td className="px-6 py-4">{req.approvedByUserId?.name}</td>
              <td className="px-6 py-4">
                {/* Replace below button with actual action */}
                <button className="px-3 py-1 bg-purple-600 text-white rounded">View</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReimbursementRequests;
