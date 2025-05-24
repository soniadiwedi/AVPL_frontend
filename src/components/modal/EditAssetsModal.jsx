import React, { useEffect, useState } from "react";
import { baseUrl } from "../../utils/data";
import usePatch from "../../hooks/usePatch";
import SelectField from "../form/SelectField";


const EditAssetsModal = ({ onClose, fetchData, asset }) => {
  const { updateData, loading, error } = usePatch(`${baseUrl}/api/assets/edit/${asset._id}`);
  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "",
    assetDescription: "",
    purchaseDate: "",
    vendorId: typeof asset.vendorId === "object" ? asset.vendorId._id : asset.vendorId || "",
    purchaseCost: "",
    warrantyExpiryDate: "",
    currentStatus: "New",
    location: "",
    maintenance: false,
    assetImage: null,
   
  });

  // Pre-fill form when asset data is available
  useEffect(() => {
    if (asset) {
      setFormData({
        assetName: asset.assetName || "",
        assetType: asset.assetType || "",
        assetDescription: asset.assetDescription || "",
        purchaseDate: asset.purchaseDate ? asset.purchaseDate.slice(0, 10) : "",
        vendorId: asset.vendorId._id || "",
        purchaseCost: asset.purchaseCost || "",
        warrantyExpiryDate: asset.warrantyExpiryDate ? asset.warrantyExpiryDate.slice(0, 10) : "",
        currentStatus: asset.currentStatus || "Active",
        location: asset.location || "",
        maintenance: asset.maintenance || false,
        assetImage: null,
        assetCode: asset.assetCode || "",
      });
    }
  }, [asset]);

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

    for (const key in formData) {
      let value = formData[key];
      if (key === "maintenance") {
        value = value === "true" || value === true;
      }
      if (key === "assetImage" && !value) continue; // skip if no new image
      data.append(key, value);
    }

    await updateData(data);
    fetchData();
    if (!error) onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <h2 className="text-xl font-bold mb-4">Edit Asset</h2>
 <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-red-600"
        >
          &times;
        </button>
        {error && <p className="text-red-600 mb-2">{error}</p>}

        <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 font-medium">Asset Name</label>
            <input
              name="assetName"
              value={formData.assetName}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
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
            <input
              name="assetDescription"
              value={formData.assetDescription}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Purchase Date</label>
            <input
              type="date"
              name="purchaseDate"
              value={formData.purchaseDate}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Purchase Cost</label>
            <input
              type="number"
              name="purchaseCost"
              value={formData.purchaseCost}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Warranty Expiry Date</label>
            <input
              type="date"
              name="warrantyExpiryDate"
              value={formData.warrantyExpiryDate}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
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
            <input
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="border p-2 rounded w-full"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Maintenance</label>
            <select
              name="maintenance"
              value={formData.maintenance ? "true" : "false"}
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

         

          <div className="col-span-2 flex justify-center gap-4 mt-4">
           
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              disabled={loading}
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditAssetsModal;
