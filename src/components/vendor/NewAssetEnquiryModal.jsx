import { useEffect, useState } from "react";
import usePostQuery from "../../hooks/usePostQuery";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import { baseUrl } from "../../utils/data";
import usePatch from "../../hooks/usePatchVendor";

const NewAssetEnquiryModal = ({ onClose, initialData = null, isEdit = false,asset }) => {
  const { createPost, loading: postLoading, error: postError } = usePostQuery(`${baseUrl}/api/enquiry/add`);
  const { updateData, loading: patchLoading, error: patchError } = usePatch(`${baseUrl}/api/enquiry/${initialData?._id}`);
console.log("asset",asset)
  const [formData, setFormData] = useState({
    assetName: "",
    assetType: "",
    assetDescription: "",
    purchaseDate: "",
    purchaseCost: "",
    warrantyExpiryDate: "",
    currentStatus: "",
    location: "",
    maintenance: false,
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        maintenance: initialData.maintenance ?? false,
        purchaseDate: initialData.purchaseDate?.slice(0, 10) || "",
        warrantyExpiryDate: initialData.warrantyExpiryDate?.slice(0, 10) || "",
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "maintenance" ? value === "Yes" : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit && initialData?._id) {
        await updateData(formData);
      } else {
        await createPost({ ...formData, vendorId: initialData?.vendorId });
      }
      onClose();
    } catch (err) {
      console.error("Submission error:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        <h2 className="text-xl font-semibold mb-4">
          {isEdit ? "Edit Asset Enquiry" : `New Asset Enquiry for ${initialData?.vendorName || "Vendor"}`}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Asset Name" type="text" name="assetName" value={formData.assetName} onChange={handleChange} required />
            <InputField label="Asset Type" type="text" name="assetType" value={formData.assetType} onChange={handleChange} required />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-1">Asset Description</label>
            <textarea
              name="assetDescription"
              value={formData.assetDescription}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-md"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Purchase Date" type="date" name="purchaseDate" value={formData.purchaseDate} onChange={handleChange} required />
            <InputField label="Purchase Cost" type="number" name="purchaseCost" value={formData.purchaseCost} onChange={handleChange} required />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField label="Warranty Expiry Date" type="date" name="warrantyExpiryDate" value={formData.warrantyExpiryDate} onChange={handleChange} required />
            <SelectField label="Maintenance" name="maintenance" value={formData.maintenance ? "Yes" : "No"} onChange={handleChange} options={["Yes", "No"]} />
          </div>

          <InputField label="Location" type="text" name="location" value={formData.location} onChange={handleChange} required />

          {(postError || patchError) && <p className="text-red-500">{postError || patchError}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
            disabled={postLoading || patchLoading}
          >
            {postLoading || patchLoading
              ? "Submitting..."
              : isEdit
              ? "Update Enquiry"
              : "Submit Enquiry"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewAssetEnquiryModal;
