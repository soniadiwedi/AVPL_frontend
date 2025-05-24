import { useState } from "react";
import CreateAssetModal from "../components/modal/CreateAssetModal";
import useGetQuery from "../hooks/useGetQuery";
import { baseUrl } from "../utils/data";
import AssetTable from "../components/table/AssetTable";
import { useNavigate, useLocation, matchPath } from "react-router-dom";

const AssestPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { dataGet, loading, error, fetchData } = useGetQuery(`${baseUrl}/api/assets`);
  const navigate = useNavigate();
  const location = useLocation();
  const showCreateAssetButton = matchPath("/assets/:id", location.pathname);
  const showAssignAssets=matchPath("/assets-assign/:userId/:requestId", location.pathname);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Asset Management</h1>
        <button
          className="bg-purpuleLight text-white px-4 py-2 rounded hover:bg-primary font-semibold"
          onClick={() => navigate("/asset-requests")}
        >
           All Assest Requests by user
        </button>
        
        {showCreateAssetButton && (
          <button
            className="bg-secondary text-white px-4 py-2 rounded hover:bg-yellow-600 font-semibold"
            onClick={() => setShowModal(true)}
          >
            + Create Asset
          </button>
        )}
      </div>

      {showModal && (
        <CreateAssetModal onClose={() => setShowModal(false)} fetchData={fetchData} />
      )}

      <div className="mt-8">
        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : dataGet && dataGet.length > 0 ? (
          <AssetTable assets={dataGet} fetchData={fetchData} showAssignAssets={showAssignAssets}/>
        ) : (
          <div className="border rounded p-4 text-gray-600">No assets found.</div>
        )}
      </div>
    </div>
  );
};

export default AssestPage;
