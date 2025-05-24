
import { baseUrl } from "../../utils/data";
import useGetQuery from "../../hooks/useGetQuery";

const Procurement = ({  }) => {
   const {
    dataGet: data,
    loading: enquiryLoading,
    error: enquiryError,
    fetchData: fetchEnquiryData,
  } = useGetQuery(`${baseUrl}/api/enquiry`);
 

  return (
    <div className="overflow-x-auto">

        <h1 className="text-2xl font-bold mb-4">Vendor Management</h1>
        <p className="pb-5">All Inquiries</p>
      <table className="min-w-full table-auto bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-left">S.No.</th>
            <th className="px-4 py-2 border text-left">Asset Name</th>
            <th className="px-4 py-2 border text-left">Asset Type</th>
            <th className="px-4 py-2 border text-left">Description</th>
            <th className="px-4 py-2 border text-left">Location</th>
            <th className="px-4 py-2 border text-left">Cost</th>
            <th className="px-4 py-2 border text-left">Purchase Date</th>
            <th className="px-4 py-2 border text-left">Warranty Expiry</th>
           
          </tr>
        </thead>
        <tbody>
          {data?.map((item,index) => (
            <tr key={item._id} className="hover:bg-gray-100 text-sm">
              <td className="px-4 py-2 border">{index+1}</td>
              <td className="px-4 py-2 border">{item.assetName}</td>
              <td className="px-4 py-2 border">{item.assetType}</td>
              <td className="px-4 py-2 border">{item.assetDescription}</td>
              <td className="px-4 py-2 border">{item.location}</td>
              <td className="px-4 py-2 border">{item.purchaseCost}</td>
              <td className="px-4 py-2 border">{new Date(item.purchaseDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{new Date(item.warrantyExpiryDate).toLocaleDateString()}</td>
              
            </tr>
          ))}
        </tbody>
      </table>

      {/* {editItem && (
        <NewAssetEnquiryModal
          onClose={closeModal}
          initialData={editItem}
          isEdit={true}
        />
      )} */}
    </div>
  );
};

export default Procurement;
