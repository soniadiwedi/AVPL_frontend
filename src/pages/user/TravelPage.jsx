import React, { useState } from "react";
import useGetQuery from "../../hooks/useGetQuery";
import { baseUrl } from "../../utils/data";
import { useAuth } from "../../components/context/AuthContext";
import TravelRequestModal from "../../components/modal/TravelRequestModal";
import TravelRequestList from "../../components/table/TravelRequestList";

const TravelPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = useAuth();

  const {
    dataGet: data,
    loading,
    error,
    fetchData,
  } = useGetQuery(`${baseUrl}/api/travel`);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const filteredData=data?.travelRequests?.filter((el)=>el.requestedByUserId?._id===user?._id)

    console.log("travel",data)
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-sm lg:text-lg font-medium text-gray-700">
            Travel Request
          </h3>
          <button
            onClick={openModal}
            className="bg-purpuleLight hover:bg-primary text-white text-sm lg:text-base px-3 lg:px-5 py-2 rounded-md font-medium transition"
          >
            + Create Travel Request
          </button>
        </div>
{loading ? (
  <div className="text-blue-600">Loading...</div>
) : error ? (
  <div className="text-red-500">Error: {error}</div>
) : filteredData?.length > 0 ? (
  <TravelRequestList data={filteredData} fetchData={fetchData} />
) : (
  <div className="border border-dashed rounded-md p-4 text-center text-gray-500">
    No Travel Requests Found.
  </div>
)}

      </div>

      {isModalOpen && <TravelRequestModal closeModal={closeModal} fetchData={fetchData}/>}
    </div>
  );
};

export default TravelPage;
