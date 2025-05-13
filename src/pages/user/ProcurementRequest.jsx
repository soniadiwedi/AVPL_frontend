import { useState } from "react";
import { useAuth } from "../../components/context/AuthContext";

import useGetQuery from "../../hooks/useGetQuery";
import { baseUrl } from "../../utils/data";
import AssetRequestTable from "../../components/user/AssetRequestTable";
import ProcurementRequestModal from "../../components/modal/ProcurementRequestModal";
import ProcurementRequestList from "../../components/table/ProcurementRequestList";
import UserProcurmentRequestList from "../../components/user/UserProcurmentRequestList";


const ProcurementRequest = () => {
  const { user } = useAuth();
  const [selectedItem, setSelectedItem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dataGet, loading, error, fetchData } = useGetQuery(
    `${baseUrl}/api/procurement-requests`
  );

 

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm lg:text-lg font-medium text-gray-700">
            Your Requests
          </h3>

          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-purpuleLight hover:bg-primary text-white text-sm lg:text-base px-3 lg:px-5 py-2 rounded-md font-medium transition"
          >
            + Request raised
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
         <ProcurementRequestModal onClose={()=>setIsModalOpen(false)} fetchRequestData={fetchData}/>
        )}

        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : dataGet && dataGet.length > 0 ? (
           <UserProcurmentRequestList
            data={dataGet}
            fetchData={fetchData}
          />
        ) : (
          <div className="border border-dashed rounded-md p-4 text-center text-gray-500">
            No yetrequested.
          </div>
        )}
      </div>
    </div>
  );
};

export default ProcurementRequest;
