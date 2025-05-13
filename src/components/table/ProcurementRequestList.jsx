import { Pencil } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { baseUrl } from "../../utils/data";
import NewAssetEnquiryModal from "../vendor/NewAssetEnquiryModal";

const ProcurementRequestList = ({ data, fetchData }) => {
  const [loading, setLoading] = useState(false); // For loading state
  const { user } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  const updateRequestStatus = async (id) => {
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        `${baseUrl}/api/procurement-requests/status/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            requestStatus: "Approved", // Assuming we want to update to "Approved" when Confirm is clicked
            approvedByUserId: user._id, // You can pass the logged-in user's ID here
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert(data.message);
        fetchData(); // To refresh the data after successful update
      } else {
        alert(data.message || "Failed to update status");
      }
    } catch (error) {
      console.error("Error updating request status", error);
      alert("Something went wrong, please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">Requester</th>
            <th className="p-3 border">Asset Type</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Justification</th>
            <th className="p-3 border">Budget</th>
            <th className="p-3 border">Required By</th>
            <th className="p-3 border">Fulfilled Assets</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">New Asset Inquiry</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item) => (
            <tr key={item._id} className="text-sm text-center">
              <td className="p-3 border">
                <div>
                  <p className="font-medium">{item.requestedByUserId.name}</p>
                  <p className="text-gray-500 text-xs">
                    {item.requestedByUserId.email}
                  </p>
                </div>
              </td>
              <td className="p-3 border capitalize">{item.assetType}</td>
              <td className="p-3 border">{item.quantity}</td>
              <td className="p-3 border">{item.justification}</td>
              <td className="p-3 border">₹{item.budgetEstimate}</td>
              <td className="p-3 border">
                {(() => {
                  const date = item.requiredByDate.slice(0, 10);
                  const [year, month, day] = date.split("-");
                  return `${day}-${month}-${year}`;
                })()}
              </td>
              <td className="p-3 border">
                {item.fulfilledAssetIds.map((asset) => (
                  <div key={asset._id} className="mb-2 text-left">
                    <p className="font-semibold">{asset.assetName}</p>
                    <p className="text-xs text-gray-500">
                      Code: {asset.assetCode}
                    </p>
                    <p className="text-xs text-gray-500">
                      Status: {asset.currentStatus}
                    </p>
                  </div>
                ))}
              </td>
              <td className="p-3 border">
                {item.requestStatus === "Pending" ? (
                  <button
                    onClick={() => updateRequestStatus(item._id)}
                    className="px-4 py-1 border border-blue-500 text-blue-500 rounded-full text-xs"
                    disabled={loading}
                  >
                    {loading ? "Updating..." : "Confirm"}
                  </button>
                ) : (
                  <span
                    className={`px-2 py-1 rounded-full text-white text-xs ${
                      item.requestStatus === "Approved"
                        ? "bg-green-500"
                        : "bg-gray-400"
                    }`}
                  >
                    {item.requestStatus}
                  </span>
                )}
              </td>
<td className="p-3 border">
  <button
    onClick={() => {
      setSelectedAsset(item); // Pass the current item to the modal
      setShowModal(true);
    }}
    className="px-3 py-1 text-sm text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-200"
  >
    Inquiry
  </button>
</td>

            </tr>
          ))}
        </tbody>
      </table>
   {showModal && selectedAsset && (
  <NewAssetEnquiryModal
    asset={selectedAsset}
    onClose={() => {
      setShowModal(false);
      setSelectedAsset(null);
    }}
  />
)}
    </div>
  );
};

export default ProcurementRequestList;
