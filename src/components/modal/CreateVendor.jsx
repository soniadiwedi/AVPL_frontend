import { useState, useEffect } from "react";
import { baseUrl } from "../../utils/data";
import usePostQuery from "../../hooks/usePostQuery";
import InputField from "../form/InputField";
import SelectField from "../form/SelectField";
import usePatchVendor from "../../hooks/usePatchVendor";

const CreateVendor = ({ onClose, fetchData, vendor }) => {
  const { createPost, loading, error } = usePostQuery(`${baseUrl}/api/vendors/add`);
  const { updateData, loading: updateLoading, error: updateError } = usePatchVendor(
    `${baseUrl}/api/vendors/${vendor?.vendorId}` // Use vendorId if that's what's being used in the backend
  );

  const [vendorData, setVendorData] = useState({
    vendorName: "",
    vendorType: "",
    vendorEmail: "",
    vendorPhone: "",
    vendorAddress: "",
    vendorGSTNumber: "",
    vendorLocation: "",
    vendorBankDetails: {
      bankName: "",
      accountNumber: "",
      ifscCode: "",
    },
  });

  // Initialize vendor data if editing
  useEffect(() => {
    if (vendor) {
      setVendorData({
        vendorName: vendor.vendorName || "",
        vendorType: vendor.vendorType || "",
        vendorEmail: vendor.vendorEmail || "",
        vendorPhone: vendor.vendorPhone || "",
        vendorAddress: vendor.vendorAddress || "",
        vendorGSTNumber: vendor.vendorGSTNumber || "",
        vendorLocation: vendor.vendorLocation || "",
        vendorBankDetails: {
          bankName: vendor.vendorBankDetails?.bankName || "",
          accountNumber: vendor.vendorBankDetails?.accountNumber || "",
          ifscCode: vendor.vendorBankDetails?.ifscCode || "",
        },
      });
    }
  }, [vendor]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleBankDetailChange = (e) => {
    const { name, value } = e.target;
    setVendorData((prevData) => ({
      ...prevData,
      vendorBankDetails: {
        ...prevData.vendorBankDetails,
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (vendor) {
        // Update vendor
        await updateData(vendorData);
      } else {
        // Create new vendor
        await createPost(vendorData);
      }
      fetchData(); // Optionally refresh vendor list
      onClose();
    } catch (err) {
      console.error("Failed to submit vendor:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto p-6 rounded-lg shadow-lg relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-red-600"
        >
          &times;
        </button>
        <h2 className="text-xl font-bold mb-4">
          {vendor ? "Edit Vendor" : "Create Vendor"}
        </h2>

        {(error || updateError) && <p className="text-red-600 mb-2">{error || updateError}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InputField
              label="Vendor Name"
              type="text"
              name="vendorName"
              value={vendorData.vendorName}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Vendor Email"
              type="email"
              name="vendorEmail"
              value={vendorData.vendorEmail}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Vendor Phone"
              type="text"
              name="vendorPhone"
              value={vendorData.vendorPhone}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Vendor Address"
              type="text"
              name="vendorAddress"
              value={vendorData.vendorAddress}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="GST Number"
              type="text"
              name="vendorGSTNumber"
              value={vendorData.vendorGSTNumber}
              onChange={handleInputChange}
              required
            />

            <InputField
              label="Vendor Location"
              type="text"
              name="vendorLocation"
              value={vendorData.vendorLocation}
              onChange={handleInputChange}
              required
            />
            <SelectField
              label="Vendor Type"
              name="vendorType"
              value={vendorData.vendorType}
              onChange={handleInputChange}
              required
              options={["Supplier", "Manufacturer", "Distributor", "Retailer"]}
            />
          </div>

          <h3 className="font-semibold mt-4 text-green-500">Bank Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <InputField
              label="Bank Name"
              type="text"
              name="bankName"
              value={vendorData.vendorBankDetails.bankName}
              onChange={handleBankDetailChange}
            />

            <InputField
              label="Account Number"
              type="text"
              name="accountNumber"
              value={vendorData.vendorBankDetails.accountNumber}
              onChange={handleBankDetailChange}
            />

            <InputField
              label="IFSC Code"
              type="text"
              name="ifscCode"
              value={vendorData.vendorBankDetails.ifscCode}
              onChange={handleBankDetailChange}
            />
          </div>

          <div className="mt-4 flex items-center justify-center">
            <button
              type="submit"
              className={`p-2 bg-blue-600 text-white rounded-md ${loading || updateLoading ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={loading || updateLoading}
            >
              {loading || updateLoading ? (vendor ? "Updating..." : "Creating...") : (vendor ? "Update Vendor" : "Create Vendor")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateVendor;
