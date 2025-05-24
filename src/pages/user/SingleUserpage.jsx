import { useState } from "react";
import { useAuth } from "../../components/context/AuthContext";
import AssetRequestModal from "../../components/user/AssetRequestModal";
import useGetQuery from "../../hooks/useGetQuery";
import { baseUrl } from "../../utils/data";
import AssetRequestTable from "../../components/user/AssetRequestTable";

const SingleUserPage = () => {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dataGet, loading, error, fetchData } = useGetQuery(
    `${baseUrl}/api/asset-requests`
  );
  const { dataGet:data } = useGetQuery(
    `${baseUrl}/api/asset-requests/user/${user?._id}`
  );
  console.log("data",data)
  const openModal = (user) => {
    setSelectedItem(user);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedItem(null);
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm lg:text-lg font-medium text-gray-700">
            Your Requests
          </h3>

          <button
            onClick={() => openModal(user)}
            className="bg-purpuleLight hover:bg-primary text-white text-sm lg:text-base px-3 lg:px-5 py-2 rounded-md font-medium transition"
          >
            + Send Asset Request
          </button>
        </div>

        {/* Modal */}
        <AssetRequestModal
          user={selectedItem}
          isOpen={isModalOpen}
          onClose={closeModal}
          fetchData={fetchData}
        />

        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : dataGet && dataGet.length > 0 ? (
          <AssetRequestTable data={dataGet} fetchData={fetchData}user={user} />
        ) : (
          <div className="border border-dashed rounded-md p-4 text-center text-gray-500">
            No asset requests found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleUserPage;
