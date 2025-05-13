import React, { useState } from "react";

import { baseUrl } from "../../utils/data";
import { useParams } from "react-router-dom";
import usePostQueryFiles from "../../hooks/usePostQueryFiles";
import SelectField from "../form/SelectField";

const CreateAssetModal = ({ onClose, fetchData }) => {
  const { createPost, loading, error } = usePostQueryFiles(`${baseUrl}/api/assets/add`);
  const { id } = useParams();
  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "",
    assetDescription: "",
    purchaseDate: "",
    vendorId: id||"",
    purchaseCost: "",
    warrantyExpiryDate: "",
    currentStatus: "New", // default to Active
    location: "",
    maintenance: false, // default to false
    assetImage: null,
    
  });

const handleChange = (e) => {
  const { name, value, type, files } = e.target;
  setFormData((prev) => ({
    ...prev,
    [name]: type === "file" ? files[0] : value,
  }));
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    // Append form data
    for (const key in formData) {
      let value = formData[key];
      if (key === "maintenance") {
        value = value === "true" || value === true;
      }
      data.append(key, value);
    }

 
    await createPost(data);
    fetchData();
    if (!error) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Create New Asset</h2>

        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Asset Name</label>
            <input name="assetName" required onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

         <SelectField
            label="Asset Type"
            name="assetType"
            value={formData.assetType}
            onChange={handleChange}
            required
            options={['IT Equipment', 'Office Furniture', 'Vehicle', 'Consumable']}
          />

          <div>
            <label className="block mb-1 font-medium">Description</label>
            <input name="assetDescription" required onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Purchase Date</label>
            <input type="date" name="purchaseDate" required onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          

          <div>
            <label className="block mb-1 font-medium">Purchase Cost</label>
            <input type="number" required name="purchaseCost" onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Warranty Expiry Date</label>
            <input type="date" required name="warrantyExpiryDate" onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <div>
  <label className="block mb-1 font-medium">Current Status</label>
  <select
    name="currentStatus"
    value={formData.currentStatus}
    onChange={handleChange}
    className="border p-2 rounded w-full"
    required
  >
    <option value="New">New</option>
    <option value="Refurbished">Refurbished</option>
  </select>
</div>

          <div>
            <label className="block mb-1 font-medium">Location</label>
            <input name="location" required onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block mb-1 font-medium">Maintenance</label>
            <select
              name="maintenance"
              value={formData.maintenance ? "true" : "false"} // convert to string
              onChange={handleChange}
              className="border p-2 rounded w-full"
            >
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">Asset Image</label>
            <input type="file" name="assetImage" onChange={handleChange} className="border p-2 rounded w-full" />
          </div>

         

          <div className="col-span-2 flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-white rounded ${loading ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"}`}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Asset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateAssetModal;
