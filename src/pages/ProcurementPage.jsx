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
     
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-300 mb-4">
        <div className="flex space-x-6">
          <button
            className={`py-2 px-1 text-md font-medium relative 
              ${activeTab === "request"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"}`}
            onClick={() => setActiveTab("request")}
          >
            All Procurement Request
          </button>
          <button
            className={`py-2 px-1 text-md font-medium relative 
              ${activeTab === "enquiry"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-600"}`}
            onClick={() => setActiveTab("enquiry")}
          >
            All New Enquiry
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-8">
        {activeTab === "enquiry" ? (
          enquiryLoading ? (
            <div className="text-blue-600">Loading Enquiries...</div>
          ) : enquiryError ? (
            <div className="text-red-500">Error: {enquiryError}</div>
          ) : newEnquiry && newEnquiry.length > 0 ? (
            <Procurement data={newEnquiry} fetchData={fetchEnquiryData} />
          ) : (
            <div className="border rounded p-4 text-gray-600">
              No Procurement Enquiries Found.
            </div>
          )
        ) : requestLoading ? (
          <div className="text-blue-600">Loading Requests...</div>
        ) : requestError ? (
          <div className="text-red-500">Error: {requestError}</div>
        ) : procurementRequest && procurementRequest.length > 0 ? (
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
