import React, { useState } from "react";
import { X } from "lucide-react";
import { baseUrl } from "../../utils/data";
import usePostQuery from "../../hooks/usePostQuery";
import { ArrowRight, Calendar, DollarSign, MapPin, FileText } from "lucide-react";
const TravelRequestModal = ({ closeModal,fetchData }) => {
  const { createPost, loading: postLoading, error: postError } = usePostQuery(`${baseUrl}/api/travel/add`);

  const [form, setForm] = useState({
    travelFrom: "",
    travelTo: "",
    departureDate: "",
    returnDate: "",
    purpose: "",
    estimatedCost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await createPost(form);
fetchData()
    if (response?.success) {
      closeModal();
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative bg-white p-6 rounded-lg shadow-lg w-11/12 max-w-2xl overflow-y-auto max-h-[90vh]">
        <button
          onClick={closeModal}
          className="absolute top-3 right-3 text-red-500 hover:text-red-700"
        >
          <X />
        </button>
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Create Travel Request
        </h2>

       

<form onSubmit={handleSubmit} className="space-y-6">
  {/* From and To with icon */}
  <div>
    <label className="block text-gray-700 mb-2">Travel Route</label>
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <MapPin className="absolute top-2.5 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="travelFrom"
          value={form.travelFrom}
          onChange={handleChange}
          required
          placeholder="From"
          className="w-full pl-10 border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="relative">
        <ArrowRight className="absolute top-2.5 left-3 text-gray-400" size={18} />
        <input
          type="text"
          name="travelTo"
          value={form.travelTo}
          onChange={handleChange}
          required
          placeholder="To"
          className="w-full pl-10 border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  </div>

  {/* Departure and Return Date */}
  <div>
    <label className="block text-gray-700 mb-2">Travel Dates</label>
    <div className="grid grid-cols-2 gap-4">
      <div className="relative">
        <Calendar className="absolute top-2.5 left-3 text-gray-400" size={18} />
        <input
          type="date"
          name="departureDate"
          value={form.departureDate}
          onChange={handleChange}
          required
          className="w-full pl-10 border border-gray-300 rounded px-3 py-2"
        />
      </div>
      <div className="relative">
        <Calendar className="absolute top-2.5 left-3 text-gray-400" size={18} />
        <input
          type="date"
          name="returnDate"
          value={form.returnDate}
          onChange={handleChange}
          required
          className="w-full pl-10 border border-gray-300 rounded px-3 py-2"
        />
      </div>
    </div>
  </div>

  {/* Purpose */}
  <div className="relative">
    <label className="block text-gray-700 mb-2">Purpose</label>
    <FileText className="absolute top-10 left-3 text-gray-400" size={18} />
    <textarea
      name="purpose"
      value={form.purpose}
      onChange={handleChange}
      required
      placeholder="Enter the reason for travel..."
      className="w-full pl-10 border border-gray-300 rounded px-3 py-2"
      rows={3}
    />
  </div>

  {/* Estimated Cost */}
  <div className="relative">
    <label className="block text-gray-700 mb-2">Estimated Cost</label>
   
    <input
      type="number"
      name="estimatedCost"
      value={form.estimatedCost}
      onChange={handleChange}
      required
      placeholder="₹ Amount"
      className="w-full pl-10 border border-gray-300 rounded px-3 py-2"
    />
  </div>

  {/* Error Message */}
  {postError && (
    <p className="text-red-600 text-sm mt-2">{postError}</p>
  )}

  {/* Submit Button */}
  <div className="flex justify-end mt-6">
    <button
      type="submit"
      disabled={postLoading}
      className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
    >
      {postLoading ? "Submitting..." : "Submit Request"}
    </button>
  </div>
</form>

      </div>
    </div>
  );
};

export default TravelRequestModal;
