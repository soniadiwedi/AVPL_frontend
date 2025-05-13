import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";

const usePatch = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); 
  const updateData = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.patch(apiUrl, formData, {
        headers: {
           "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,

        },
      });
      console.log("response", response);

      toast.success(response.data.message, {
        duration: 4000,
        style: {
          background: "green",
          color: "white",
        },
      });
      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { updateData, loading, error };
};

export default usePatch;
