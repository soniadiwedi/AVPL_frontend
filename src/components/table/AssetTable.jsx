import React, { useState } from "react";
import { baseUrl } from "../../utils/data";
import EditAssetsModal from "../modal/EditAssetsModal";
import AssignAssetModal from "../modal/AssignAssetModal";
import { Pencil } from "lucide-react";


const AssetTable = ({ assets, fetchData, showAssignAssets }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAssignModalOpen, setIsAssignModalOpen] = useState(false); // State for Assign modal
  const [selectedAsset, setSelectedAsset] = useState(null);

  // Handle Edit button click
  const handleEditClick = (asset) => {
    setSelectedAsset(asset);
    setIsEditModalOpen(true);
  };

  // Handle Assign button click
  const handleAssignClick = (asset) => {
    setSelectedAsset(asset); // Set the selected asset for assigning
    setIsAssignModalOpen(true); // Open the Assign modal
  };

  // Close Edit modal
  const handleCloseModal = () => {
    setIsEditModalOpen(false);
    setSelectedAsset(null);
  };

  // Close Assign modal
  const handleCloseAssignModal = () => {
    setIsAssignModalOpen(false); // Close the Assign modal
    setSelectedAsset(null);
  };

  return (
    <div className="overflow-x-auto w-full">
      <table className="min-w-full leading-normal shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Image
            </th>
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Asset Name
            </th>
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Asset Type
            </th>
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Location
            </th>
           
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Cost
            </th>
             <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Purchase Date
            </th>
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Warranty Expiry
            </th>
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              QR
            </th>
            <th className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b-2 border-gray-200 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white">
          {assets.map((asset, index) => (
            <tr key={index}>
              <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                <div className="flex items-center">
                  <img
                    src={`${baseUrl}${asset.assetImage}`}
                    alt={asset.assetName}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded"
                  />
                </div>
              </td>
              <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                <p className="text-gray-900">{asset.assetName}</p>
              </td>
              <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                <p className="text-gray-900">{asset.assetType}</p>
              </td>
              <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                <p className="text-gray-900">{asset.location}</p>
              </td>
              
             
              <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                ₹{asset.purchaseCost}
              </td>
               <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                <p className="text-gray-900">
                  {new Date(asset.purchaseDate).toLocaleDateString()}
                </p>
              </td>
              <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                {new Date(asset.warrantyExpiryDate).toLocaleDateString()}
              </td>
               <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm">
                <div className="flex items-center">
                  <img
                    src={`${asset.assetQR}`}
                    alt={asset.assetName}
                    className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 object-cover rounded"
                  />
                </div>
              </td>
              <td className="px-3 sm:px-4 md:px-5 py-2 sm:py-3 border-b border-gray-200 text-sm space-x-1 sm:space-x-2">
                <button
                  className="bg-outline-button text-blue-600 hover:text-blue-800 border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm"
                  onClick={() => handleEditClick(asset)}
                >
                 <Pencil size={20}  />
                </button>

                {showAssignAssets && (
                  <button
                    className="bg-destructive-button text-green-600 hover:text-green-800 border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm"
                    onClick={() => handleAssignClick(asset)} // Open Assign modal on click
                  >
                    Assign
                  </button>
                )}

                {/* <button className="bg-destructive-button text-red-600 hover:text-red-800 border border-gray-300 rounded-md px-2 py-1 text-xs sm:text-sm">
                  Delete
                </button> */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {isEditModalOpen && selectedAsset && (
        <EditAssetsModal
          asset={selectedAsset}
          onClose={handleCloseModal}
          fetchData={fetchData}
        />
      )}

      {/* Assign Modal */}
      {isAssignModalOpen && selectedAsset && (
        <AssignAssetModal
          asset={selectedAsset} 
          onClose={handleCloseAssignModal} 
        />
      )}
    </div>
  );
};

export default AssetTable;
