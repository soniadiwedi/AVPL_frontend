import { useState } from "react";


import { Pencil } from "lucide-react";
import NewAssetEnquiryModal from "../vendor/NewAssetEnquiryModal";

const Procurement = ({ data, fetchData }) => {
  const [editItem, setEditItem] = useState(null);

  const handleEdit = (item) => {
    setEditItem(item);
  };

  const closeModal = () => {
    setEditItem(null);
    fetchData(); 
  };

  return (
    <div className="overflow-x-auto">


      <table className="min-w-full table-auto bg-white border-collapse">
        <thead>
          <tr>
            <th className="px-4 py-2 border text-left">Asset Name</th>
            <th className="px-4 py-2 border text-left">Asset Type</th>
            <th className="px-4 py-2 border text-left">Description</th>
            <th className="px-4 py-2 border text-left">Location</th>
            <th className="px-4 py-2 border text-left">Cost</th>
            <th className="px-4 py-2 border text-left">Purchase Date</th>
            <th className="px-4 py-2 border text-left">Warranty Expiry</th>
            <th className="px-4 py-2 border text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item._id} className="hover:bg-gray-100 text-sm">
              <td className="px-4 py-2 border">{item.assetName}</td>
              <td className="px-4 py-2 border">{item.assetType}</td>
              <td className="px-4 py-2 border">{item.assetDescription}</td>
              <td className="px-4 py-2 border">{item.location}</td>
              <td className="px-4 py-2 border">{item.purchaseCost}</td>
              <td className="px-4 py-2 border">{new Date(item.purchaseDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">{new Date(item.warrantyExpiryDate).toLocaleDateString()}</td>
              <td className="px-4 py-2 border">
                <button
                  onClick={() => handleEdit(item)}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <Pencil className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editItem && (
        <NewAssetEnquiryModal
          onClose={closeModal}
          initialData={editItem}
          isEdit={true}
        />
      )}
    </div>
  );
};

export default Procurement;
