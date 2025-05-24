import { useState } from "react";
import usePostQuery from "../../hooks/usePostQuery";
import { baseUrl } from "../../utils/data";

const InquiryToVendor = ({ onClose, asset }) => {
  const { createPost, loading: postLoading, error: postError } = usePostQuery(
    `${baseUrl}/api/enquiry/add`
  );

  const [confirmed, setConfirmed] = useState(false);

  const handleConfirm = async () => {
    if (asset?.fulfilledAssetIds?.length > 0) {
      const fulfilledAsset = asset.fulfilledAssetIds[0];

      const payload = {
        assetName: fulfilledAsset.assetName,
        assetType: fulfilledAsset.assetType,
        assetDescription: fulfilledAsset.assetDescription,
        purchaseDate: fulfilledAsset.purchaseDate,
        purchaseCost: fulfilledAsset.purchaseCost,
        warrantyExpiryDate: fulfilledAsset.warrantyExpiryDate,
        currentStatus: fulfilledAsset.currentStatus,
        location: fulfilledAsset.location,
        maintenance: fulfilledAsset.maintenance,
        vendorId: fulfilledAsset.vendorId,
        requestedBy: asset?.requestedByUserId?._id,
        originalRequestId: asset._id
      };

      await createPost(payload);
      onClose(); // Close after success
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-xl relative text-center">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-red-500 text-2xl"
          aria-label="Close modal"
        >
          &times;
        </button>

        {!confirmed ? (
          <>
            <h2 className="text-lg font-semibold mb-4">
              Do you want to send an inquiry to the vendor?
            </h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmed(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Yes
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-lg font-semibold">Sending Inquiry...</h2>
            {postLoading && (
              <p className="text-sm text-gray-600 mt-4">Please wait...</p>
            )}
            {postError && (
              <p className="text-sm text-red-500 mt-4">Error: {postError}</p>
            )}
            {!postLoading && !postError && handleConfirm()}
          </>
        )}
      </div>
    </div>
  );
};

export default InquiryToVendor;
