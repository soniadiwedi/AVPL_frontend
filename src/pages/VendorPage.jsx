import React, { useState } from "react";
import useGetQuery from "../hooks/useGetQuery";
import { baseUrl } from "../utils/data";
import CreateVendor from "../components/modal/CreateVendor";
import VendorList from "../components/vendor/VendorList";
import Procurement from "../components/table/Procurement";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const VendorPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { dataGet, loading, error, fetchData } = useGetQuery(
    `${baseUrl}/api/vendors`
  );

  const navigate = useNavigate();
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold"> Vendor Management </h1>
        <button
          className="flex items-center gap-2 border border-blue-600 text-blue-700 px-4 py-2 rounded"
          onClick={() => navigate("/new-inquiry")}
        >
          All New Inquiries <ArrowRight />
        </button>
        <button
          className="flex items-center gap-2 border border-blue-600 text-blue-700 px-4 py-2 rounded"
          onClick={() => navigate("/repair-request")}
        >
          All Repair Request <ArrowRight />
        </button>
        <button
          className="bg-purpuleLight text-white px-4 py-2 rounded hover:bg-primary"
          onClick={() => setShowModal(true)}
        >
          + Create New Vendor
        </button>
      </div>

      {showModal && (
        <CreateVendor
          onClose={() => setShowModal(false)}
          fetchData={fetchData}
        />
      )}

      <div className="mt-8">
        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : dataGet && dataGet.length > 0 ? (
          <VendorList vendors={dataGet} fetchData={fetchData} />
        ) : (
          <div className="border rounded p-4 text-gray-600">
            No vendors found.
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorPage;
