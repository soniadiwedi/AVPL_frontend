import { useState } from "react";
import { useNavigate } from "react-router-dom";
import NewAssetEnquiryModal from "./NewAssetEnquiryModal";
import CreateVendor from "../modal/CreateVendor";
import { Edit, Pencil } from "lucide-react";


const VendorListAdminTable = ({ vendors,fetchData }) => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false); // State for the edit modal

  const handleEditVendor = (vendor) => {
    setSelectedVendor(vendor);
    setShowEditModal(true); // Open the edit modal
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {vendors.length === 0 ? (
        <p className="text-gray-600 text-center">No vendors available.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vendor Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Location
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  GST No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Bank Details
                </th>
                
                <th scope="col" className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {vendors.map((vendor) => (
                <tr key={vendor._id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {vendor.vendorName || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    <p>{vendor.vendorEmail || "N/A"}</p>
                    <p>{vendor.vendorPhone || "N/A"}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {vendor.vendorType || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {vendor.vendorLocation || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                    {vendor.vendorGSTNumber || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600">
                    {vendor.vendorBankDetails ? (
                      <div>
                        <p>Bank: {vendor.vendorBankDetails.bankName}</p>
                        <p>Account: {vendor.vendorBankDetails.accountNumber}</p>
                        <p>IFSC: {vendor.vendorBankDetails.ifscCode}</p>
                      </div>
                    ) : (
                      "N/A"
                    )}
                  </td>
                  
              <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
  {/* Button Group */}
  <div className="flex justify-end gap-4">
    {/* Edit Icon Button */}
    <button
      className="flex items-center text-blue-600 hover:text-blue-900 p-2 border rounded-md border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
      onClick={() => handleEditVendor(vendor)}
    >
      <Pencil size={20}  />
      
    </button>

    {/* Manage Assets Button */}
    <button
      className="text-white bg-blue-600 hover:bg-blue-700 p-2 rounded-md border border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
      onClick={() => navigate(`/assets/${vendor._id}`)}
    >
      Manage Assets
    </button>

    {/* New Assets Enquiry Button */}
    <button
      className="text-blue-600 hover:text-blue-900 border p-2 rounded-md border-blue-500 transition-all duration-300 ease-in-out transform hover:scale-105"
      onClick={() => {
        setSelectedVendor(vendor);
        setShowModal(true);
      }}
    >
      New Assets Enquiry
    </button>
  </div>
</td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && selectedVendor && (
        <NewAssetEnquiryModal
          vendor={selectedVendor}
          onClose={() => {
            setShowModal(false);
            setSelectedVendor(null);
          }}
        />
      )}

    {showEditModal && selectedVendor && (
  <CreateVendor
    vendor={selectedVendor} // Pass selected vendor to edit
    onClose={() => {
      setShowEditModal(false);
      setSelectedVendor(null);
    }}
    fetchData={fetchData} // Assuming fetchData will refresh the vendor list
  />
)}
    </div>
  );
};

export default VendorListAdminTable;
