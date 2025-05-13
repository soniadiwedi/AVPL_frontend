import { useState } from "react";
import useGetQuery from "../hooks/useGetQuery";
import { baseUrl } from "../utils/data";
import { useNavigate } from "react-router-dom";

const AllRequestPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { dataGet, loading, error } = useGetQuery(
    `${baseUrl}/api/asset-requests`
  );
  const navigate = useNavigate();

  const handleAssignAsset = (item) => {
    console.log("Assigning asset to:", item);
    navigate(`/assets-assign/${item.requestedByUserId._id}/${item._id}`);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Asset Requests</h1>
      </div>

      <div className="mt-8">
        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : dataGet && dataGet.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border py-2">Requested By</th>
                  <th className="border py-2">Asset Type</th>
                  <th className="border py-2">Purpose</th>
                  <th className="border py-2">Priority</th>
                  <th className="border py-2">Location</th>
                  <th className="border py-2">Request Date</th>
                  <th className="border py-2">Expiry</th>
                  <th className="border py-2">Asset Assignment</th>
                </tr>
              </thead>
              <tbody>
                {dataGet.map((item) => (
                  <tr key={item._id} className="text-center">
                    <td className="border px-4 py-2">
                      {item.requestedByUserId?.name}
                    </td>
                    <td className="border px-4 py-2">
                      {item.assetType}
                    </td>
                    <td className="border px-4 py-2">
                      {item.purposeOfRequest}
                    </td>
                    <td
                      className={`border px-4 py-2 font-semibold ${
                        item.priorityLevel === "High"
                          ? "text-red-600"
                          : item.priorityLevel === "Medium"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {item.priorityLevel}
                    </td>
                    <td className="border px-4 py-2">{item.location}</td>
                    <td className="border px-4 py-2">
                      {new Date(item.requestDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      <div>{new Date(item.expiryDate).toLocaleDateString()}</div>
                      <div
                        className={`text-sm font-medium ${
                          item.isExpired ? "text-red-600" : "text-green-600"
                        }`}
                      >
                        {item.isExpired ? "Expired" : "Active"}
                      </div>
                    </td>
                 <td className="border px-4 py-2">
  {item.requestStatus === "Pending" ? (
    <button
      className={`px-3 py-1 rounded text-white ${
        item.isExpired
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
      onClick={() => !item.isExpired && handleAssignAsset(item)}
      disabled={item.isExpired}
    >
      Assign Asset
    </button>
  ) : (
    item.requestStatus
  )}
</td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="border rounded p-4 text-gray-600">
            No assets found.
          </div>
        )}
      </div>
    </div>
  );
};

export default AllRequestPage;
