import { useState } from "react";
import { useParams } from "react-router-dom";
import usePostQuery from "../../hooks/usePostQuery";
import { baseUrl } from "../../utils/data";

const AssignAssetModal = ({ asset, onClose }) => {
  const { createPost, loading, error } = usePostQuery(`${baseUrl}/api/asset-assignments`);
  const { userId,requestId } = useParams();
  
  const [formData, setFormData] = useState({
    assignedToUserId: '',
    expectedReturnDate: '',
    location: '',
    remarks: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle asset assignment
const handleAssign = async () => {
  const { expectedReturnDate, location, remarks } = formData;

  const assignmentData = {
    assetId: asset._id, // Asset ID to assign
    assignedToUserId: userId, // From route params
    expectedReturnDate,
    location,
    remarks,
    requestId, // Important: this tells backend which request to update
  };

  try {
    await createPost(assignmentData); // API call
    onClose(); // Close modal on success
  } catch (error) {
    console.error("Error assigning asset:", error);
  }
};


  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-red-500 hover:text-red-700"
        >
          X
        </button>
        
        <h3 className="text-lg font-semibold">Assign Asset</h3>
        <p className="text-sm">Are you sure you want to assign the asset: {asset.assetName}?</p>
        {error && <p className="text-red-600 mb-2">{error}</p>}
        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mt-2">Expected Return Date</label>
          <input
            type="date"
            name="expectedReturnDate"
            value={formData.expectedReturnDate}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
          />

          <label className="block text-sm font-medium text-gray-700 mt-2">Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
            placeholder="Location"
          />

          <label className="block text-sm font-medium text-gray-700 mt-2">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleInputChange}
            className="mt-1 px-4 py-2 w-full border border-gray-300 rounded-md"
            placeholder="Add remarks"
          />
        </div>
        <div className="mt-4 flex justify-end">
          <button
            onClick={handleAssign}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
            disabled={loading}
          >
            {loading ? "Assigning..." : "Assign"}
          </button>
        </div>

        {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default AssignAssetModal;
