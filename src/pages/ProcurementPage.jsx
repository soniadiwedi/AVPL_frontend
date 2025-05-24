import React, { useState } from "react";
import useGetQuery from "../hooks/useGetQuery";
import { baseUrl } from "../utils/data";
import Procurement from "../components/table/Procurement";

import ProcurementRequestModal from "../components/modal/ProcurementRequestModal";
import ProcurementRequestList from "../components/table/ProcurementRequestList";


const ProcurementPage = () => {
 const [activeTab, setActiveTab] = useState("request");
  const [showModal, setShowModal] = useState(false);

  const {
    dataGet: newEnquiry,
    loading: enquiryLoading,
    error: enquiryError,
    fetchData: fetchEnquiryData,
  } = useGetQuery(`${baseUrl}/api/enquiry`);

  const {
    dataGet: procurementRequest,
    loading: requestLoading,
    error: requestError,
    fetchData: fetchRequestData,
  } = useGetQuery(`${baseUrl}/api/procurement-requests`);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold mb-4">Procurement Management</h1>
     <p>All Procurement Request</p>
      </div>


      {/* Tab Content */}
      <div className="mt-8">
      {procurementRequest && procurementRequest.length > 0 ? (
          <ProcurementRequestList
            data={procurementRequest}
            fetchData={fetchRequestData}
          />
        ) : (
          <div className="border rounded p-4 text-gray-600">
            No Procurement Requests Found.
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && <ProcurementRequestModal onClose={() => setShowModal(false)} fetchRequestData={fetchRequestData}/>}
    </div>
  );
};

export default ProcurementPage;
