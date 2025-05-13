import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const usePostQueryFiles = (apiUrl) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); 

  const createPost = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
       
           "Content-Type": "multipart/form-data",
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

  return { createPost, loading, error };
};

export default usePostQueryFiles;
