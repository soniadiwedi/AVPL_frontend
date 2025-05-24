import { useState } from "react";
import usePostQuery from "../../hooks/usePostQuery";
import { baseUrl } from "../../utils/data";
import { useAuth } from "../context/AuthContext";
import useGetQuery from "../../hooks/useGetQuery";

const RequestRepairModal = ({ asset, onClose }) => {
  const { user } = useAuth();
  const { createPost, loading, error } = usePostQuery(`${baseUrl}/api/repair-requests/add`);
  const { dataGet: vendors = [] } = useGetQuery(`${baseUrl}/api/vendors`);

  const [formData, setFormData] = useState({
    issueDescription: '',
    expectedCompletionDate: '',
    repairVendorId: '',
    repairCost: '',
  });

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const repairRequest = {
      assetId: asset._id,
      reportedByUserId: user._id,
      reportDate: new Date(),
      issueDescription: formData.issueDescription,
      expectedCompletionDate: formData.expectedCompletionDate,
      repairVendorId: formData.repairVendorId || null,
      repairCost: parseFloat(formData.repairCost) || 0,
      repairStatus: "pending",
      repairStartDate: null,
      actualCompletionDate: null,
    };

    try {
      await createPost(repairRequest);
      onClose();
    } catch (err) {
      console.error("Repair request submission failed:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Request Repair</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Asset Name:</label>
            <p className="text-gray-700">{asset.assetName}</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Issue Description:</label>
            <textarea
              name="issueDescription"
              className="w-full p-2 border border-gray-300 rounded"
              rows="3"
              value={formData.issueDescription}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Expected Completion Date:</label>
            <input
              type="date"
              name="expectedCompletionDate"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.expectedCompletionDate}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Repair Vendor:</label>
            <select
              name="repairVendorId"
              value={formData.repairVendorId}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded"
              required
            >
              <option value="">Select a vendor</option>
              {vendors.map((vendor) => (
                <option key={vendor._id} value={vendor._id}>
                  {vendor.vendorName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Repair Cost:</label>
            <input
              type="number"
              name="repairCost"
              className="w-full p-2 border border-gray-300 rounded"
              value={formData.repairCost}
              onChange={handleChange}
              min="0"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error.message || "Something went wrong."}</p>}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              className="px-4 py-2 bg-gray-200 rounded"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestRepairModal;
