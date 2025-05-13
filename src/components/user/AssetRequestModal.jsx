import React, { useState, useEffect } from "react";
import usePostQuery from "../../hooks/usePostQuery";
import { baseUrl } from "../../utils/data";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import usePatchVendor from "../../hooks/usePatchVendor"

const AssetRequestModal = ({ user, isOpen, onClose, selectedItem, fetchData }) => {
   const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { createPost, loading: creating } = usePostQuery(`${baseUrl}/api/asset-requests/add`);
  const { updateData, loading: updating } = usePatchVendor(`${baseUrl}/api/asset-requests/${selectedItem?._id}`);


  const [formData, setFormData] = useState({
    assetType: "",
    purposeOfRequest: "",
    priorityLevel: "",
    location: "",
  });

  useEffect(() => {
    if (selectedItem) {
      setFormData({
        assetType: selectedItem.assetType || "",
        purposeOfRequest: selectedItem.purposeOfRequest || "",
        priorityLevel: selectedItem.priorityLevel || "",
        location: selectedItem.location || "",
      });
    }
  }, [selectedItem]);

 

  const handleInputChange = (e) => {
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
    };

    try {
      if (selectedItem) {
        await updateData(payload);
        setSuccessMessage("Request updated successfully!");
      } else {
        await createPost(payload);
        setSuccessMessage("Asset request sent successfully!");
      }

      onClose();
      fetchData();
    } catch (err) {
      setErrorMessage(err.response?.data?.message || "Error occurred. Try again.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <button onClick={onClose} className="absolute top-4 right-4 text-xl text-red-600">
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {selectedItem ? "Edit Asset Request" : "Send Asset Request"}
        </h2>

        {errorMessage && <p className="text-red-600 mb-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-600 mb-2">{successMessage}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <SelectField
            label="Asset Type"
            name="assetType"
            value={formData.assetType}
            onChange={handleInputChange}
            required
            options={['IT Equipment', 'Office Furniture', 'Vehicle', 'Consumable']}
          />
          <InputField
            label="Purpose"
            name="purposeOfRequest"
            value={formData.purposeOfRequest}
            onChange={handleInputChange}
            required
          />
          <SelectField
            label="Priority Level"
            name="priorityLevel"
            value={formData.priorityLevel}
            onChange={handleInputChange}
            required
            options={["Low", "Medium", "High"]}
          />
          <InputField
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />

          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className={`p-2 bg-blue-600 text-white rounded-md ${creating || updating ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={creating || updating}
            >
              {creating || updating ? "Submitting..." : selectedItem ? "Update Request" : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AssetRequestModal;
