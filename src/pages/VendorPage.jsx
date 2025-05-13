import React, {  useState } from 'react'
import useGetQuery from '../hooks/useGetQuery';
import { baseUrl } from '../utils/data';
import CreateVendor from '../components/modal/CreateVendor';
import VendorList from '../components/vendor/VendorList';

const VendorPage = () => {
   const [showModal, setShowModal] = useState(false);
  const { dataGet, loading, error, fetchData } = useGetQuery(`${baseUrl}/api/vendors`);
  
    
  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold"> Vendor Management</h1>
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          onClick={() => setShowModal(true)}
        >
           Create New Vendor
        </button>
      </div>

      {showModal && (
        <CreateVendor onClose={() => setShowModal(false)} fetchData={fetchData} />
      )}

      <div className="mt-8">
      
        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : dataGet && dataGet.length > 0 ? (
            <VendorList vendors={dataGet} fetchData={fetchData}/>
        ) : (
          <div className="border rounded p-4 text-gray-600">No vendors found.</div>
        )}
      </div>
    </div>
  )
}

export default VendorPage