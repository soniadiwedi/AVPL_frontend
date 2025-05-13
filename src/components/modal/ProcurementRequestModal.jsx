import React, { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

import usePostQuery from "../../hooks/usePostQuery";
import usePatch from "../../hooks/usePatchVendor";
import { baseUrl } from "../../utils/data";
import useGetQuery from "../../hooks/useGetQuery";
import SelectField from "../form/SelectField";

const ProcurementRequestModal = ({ onClose, fetchRequestData, editData }) => {
  const { user } = useAuth();
  const { dataGet: users } = useGetQuery(`${baseUrl}/api/users`);

  const { dataGet: assets } = useGetQuery(`${baseUrl}/api/assets`);

  const {
    createPost,
    loading: postLoading,
    error: postError,
  } = usePostQuery(`${baseUrl}/api/procurement-requests/add`);

  const {
    updateData,
    loading: updateLoading,
    error: updateError,
  } = usePatch(`${baseUrl}/api/procurement-requests/${editData?._id}`);
  const [formData, setFormData] = useState({
    assetType: "",
    quantity: "",
    justification: "",
    budgetEstimate: "",
    requiredByDate: "",
    level: "",
    requestedByUserId: "",
    fulfilledAssetIds: "",
  });

  // Prefill form data if editing
  useEffect(() => {
    if (editData) {
      setFormData({
        assetType: editData.assetType || "",
        quantity: editData.quantity || "",
        justification: editData.justification || "",
        budgetEstimate: editData.budgetEstimate || "",
        requiredByUserId: editData.requestedByUserId?._id || "",
        fulfilledAssetIds: editData.fulfilledAssetIds?.[0]?._id || "",
        requiredByDate: editData.requiredByDate?.slice(0, 10) || "",
        level: editData.level || "",
      });
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      requestedByUserId: user._id,
      quantity: Number(formData.quantity),
      budgetEstimate: Number(formData.budgetEstimate),
    };

    try {
      if (editData) {
        await updateData(payload);
      } else {
        await createPost(payload);
      }
      fetchRequestData();
      onClose();
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <X />
        </button>
        <h2 className="text-xl font-semibold mb-4">
          {editData ? "Edit Procurement Request" : "New Procurement Request"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Row 1: Asset Type & Quantity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <SelectField
              label="Asset Type"
              name="assetType"
              value={formData.assetType}
              onChange={handleChange}
              required
              options={[
                "IT Equipment",
                "Office Furniture",
                "Vehicle",
                "Consumable",
              ]}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Quantity
              </label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          {/* Justification */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Justification
            </label>
            <textarea
              name="justification"
              value={formData.justification}
              onChange={handleChange}
              required
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            ></textarea>
          </div>

          {/* Row 2: Budget Estimate & Required By Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Budget Estimate
              </label>
              <input
                type="number"
                name="budgetEstimate"
                value={formData.budgetEstimate}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Required By Date
              </label>
              <input
                type="date"
                name="requiredByDate"
                value={formData.requiredByDate}
                onChange={handleChange}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
              />
            </div>
          </div>

          {/* Fulfilled Asset */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fulfilled Asset
            </label>
            <select
              name="fulfilledAssetIds"
              value={formData.fulfilledAssetIds}
              onChange={handleChange}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            >
              <option value="">Select Asset</option>
              {assets?.map((asset) => (
                <option key={asset._id} value={asset._id}>
                  {asset.assetName}
                </option>
              ))}
            </select>
          </div>

          {/* Level */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Level (e.g. Manager, Admin)
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            >
              <option value="">Select</option>
              {users &&
                users
                  .filter((el) => user._id !== el._id)
                  .map((el) => (
                    <option key={el._id} value={el._id}>
                      {el.name}
                    </option>
                  ))}
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              disabled={postLoading || updateLoading}
            >
              {postLoading || updateLoading
                ? "Submitting..."
                : editData
                ? "Update Request"
                : "Create Request"}
            </button>
          </div>
        </form>

        {(postError || updateError) && (
          <p className="text-red-600 text-sm mt-2">
            {postError?.message || updateError?.message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProcurementRequestModal;
