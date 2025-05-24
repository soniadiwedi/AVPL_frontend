import { useState, useEffect } from "react";
import useGetQuery from "../hooks/useGetQuery";
import { baseUrl } from "../utils/data";

const RepairRequestList = () => {
  const {
    dataGet: repairRequests,
    loading: enquiryLoading,
    error: enquiryError,
  } = useGetQuery(`${baseUrl}/api/repair-requests`);

  const [assetDetails, setAssetDetails] = useState({});
  const [loadingAssets, setLoadingAssets] = useState(false);
  const [assetError, setAssetError] = useState(null);


const fetchAssetDetails = async (assetId) => {
  try {
    setLoadingAssets(true);
    
    
    const token = localStorage.getItem("token"); 
    
    const response = await fetch(`${baseUrl}/api/assets/${assetId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,  // Adding Authorization header
      },
    });

   

    const data = await response.json();
    setAssetDetails((prev) => ({ ...prev, [assetId]: data }));
    setLoadingAssets(false);
  } catch (error) {
    setAssetError("Failed to load asset details.");
    setLoadingAssets(false);
  }
};


  useEffect(() => {
    if (repairRequests) {
      repairRequests.forEach((request) => {
        if (request.assetId) {
          fetchAssetDetails(request.assetId);
        }
      });
    }
  }, [repairRequests]);

  if (enquiryLoading) return <p>Loading repair requests...</p>;
  if (enquiryError) return <p>Error fetching repair requests.</p>;

  return (
    <div className="overflow-x-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Repair Requests</h1>
      <p className="pb-5">All repair request</p>

      <table className="min-w-full border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="px-4 py-2 border">S. No.</th>
            <th className="px-4 py-2 border">Asset Name</th>
            
            <th className="px-4 py-2 border">Issue</th>
            <th className="px-4 py-2 border">Status</th>
            <th className="px-4 py-2 border">Repair Cost</th>
            <th className="px-4 py-2 border">Expected Completion</th>
          </tr>
        </thead>
        <tbody>
          {repairRequests?.map((item,index) => (
            <tr key={item._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border">{index+1}</td>
              <td className="px-4 py-2 border">
                {loadingAssets ? (
                  <span>Loading asset...</span>
                ) : assetDetails[item.assetId] ? (
                  assetDetails[item.assetId]?.assetName || "Asset Name"
                ) : (
                  "Asset not found"
                )}
              </td>
          
              <td className="px-4 py-2 border">{item.issueDescription}</td>
              <td className="px-4 py-2 border capitalize">{item.repairStatus}</td>
              <td className="px-4 py-2 border">₹{item.repairCost}</td>
              <td className="px-4 py-2 border">
                {item.expectedCompletionDate
                  ? new Date(item.expectedCompletionDate).toLocaleDateString()
                  : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {assetError && <p className="text-red-500">{assetError}</p>}
    </div>
  );
};

export default RepairRequestList;
