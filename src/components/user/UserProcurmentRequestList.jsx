import { useState } from "react";
import { Pencil } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ProcurementRequestModal from "../modal/ProcurementRequestModal";
import useDelete from "../../hooks/useDelete";
import { baseUrl } from "../../utils/data";


const UserProcurmentRequestList = ({ data, fetchData }) => {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
const { deleteData } = useDelete(`${baseUrl}/api/procurement-requests`);
  const ownData = data.filter((item) => item.requestedByUserId._id === user._id);

  const handleEdit = (item) => {
    setSelectedRequest(item);
    setIsModalOpen(true);
  };
 const onWithdraw = async (item) => {
    try {
      await deleteData(item._id); // Assuming the ID is stored in _id
      fetchData(); // Refresh the data after deletion
    } catch (err) {
      console.error("Error while deleting:", err);
    }
  };
  return (
    <div className="overflow-x-auto p-4">
      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border">S.No</th>
            <th className="p-3 border">Asset Type</th>
            <th className="p-3 border">Quantity</th>
            <th className="p-3 border">Justification</th>
            <th className="p-3 border">Budget</th>
            <th className="p-3 border">Required By</th>
            <th className="p-3 border">Expiry Date</th>
            <th className="p-3 border">Status</th>
            <th className="p-3 border">Fulfilled Assets</th>
            <th className="p-3 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {ownData?.map((item, index) => (
            <tr key={item._id} className="text-sm text-center">
              <td className="p-3 border">{index + 1}</td>
              <td className="p-3 border capitalize">{item.assetType}</td>
              <td className="p-3 border">{item.quantity}</td>
              <td className="p-3 border">{item.justification}</td>
              <td className="p-3 border">₹{item.budgetEstimate}</td>
              <td className="p-3 border">
                {(() => {
                  const date = item.requiredByDate?.slice(0, 10);
                  const [year, month, day] = date?.split("-") || [];
                  return `${day}-${month}-${year}`;
                })()}
              </td>
              <td className="p-3 border">
                {(() => {
                  const date = item.expiryDate?.slice(0, 10);
                  const [year, month, day] = date?.split("-") || [];
                  return `${day}-${month}-${year}`;
                })()}
                <p className={item.isExpired ? "text-xs text-red-600 font-semibold" : "text-xs text-green-600 font-semibold"}>
                  {item.isExpired ? "Expired" : "Active"}
                </p>
              </td>
              <td className="p-3 border">
                <span className={`px-2 py-1 rounded-full text-white text-xs ${
                  item.requestStatus === "Pending" ? "bg-yellow-500" :
                  item.requestStatus === "Approved" ? "bg-green-500" :
                  "bg-gray-400"
                }`}>
                  {item.requestStatus}
                </span>
              </td>
              <td className="p-3 border text-left">
                {item.fulfilledAssetIds?.map((asset) => (
                  <div key={asset._id} className="mb-2">
                    <p className="font-semibold">{asset.assetName}</p>
                    <p className="text-xs text-gray-500">Code: {asset.assetCode}</p>
                    <p className="text-xs text-gray-500">Status: {asset.currentStatus}</p>
                  </div>
                ))}
              </td>
             <td className="p-3 border text-center">
  <div className="flex justify-center gap-4">
    <button
      onClick={() => handleEdit(item)}
      disabled={item.isExpired || item.requestStatus === "Approved"}
      className={`px-3 py-1 rounded text-sm font-medium transition 
        ${item.isExpired || item.requestStatus === "Approved"
          ? "text-gray-400 cursor-not-allowed"
          : "text-blue-600 hover:text-white hover:bg-blue-600 border border-blue-600"
        }`}
    >
      Edit
    </button>
    <button
      onClick={() => onWithdraw(item)}
      disabled={item.isExpired || item.requestStatus === "Approved"}
      className={`px-3 py-1 rounded text-sm font-medium transition 
        ${item.isExpired || item.requestStatus === "Approved"
          ? "text-gray-400 cursor-not-allowed"
          : "text-red-600 hover:text-white hover:bg-red-600 border border-red-600"
        }`}
    >
      Withdraw
    </button>
  </div>
</td>

            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {isModalOpen && (
        <ProcurementRequestModal
          onClose={() => {
            setIsModalOpen(false);
            setSelectedRequest(null);
          }}
          fetchRequestData={fetchData}
          editData={selectedRequest} // pass item to modal
        />
      )}
    </div>
  );
};

export default UserProcurmentRequestList;
