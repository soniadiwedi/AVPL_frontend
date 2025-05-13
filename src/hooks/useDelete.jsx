import { useState } from 'react';
import axios from 'axios';

const useDelete = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); 
  const deleteData = async (id) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.delete(`${url}/${id}`, {
        headers: {
          
           Authorization: `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (err) {
      setError(err.response ? err.response.data : 'Error deleting data');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    deleteData,
    loading,
    error,
  };
};

export default useDelete;
