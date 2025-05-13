import axios from "axios";
import { useEffect, useState } from "react";

const useGetQuery = (apiUrl) => {
  const [dataGet, setDataGet] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token"); 
  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      setDataGet(response.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [apiUrl]); // Re-fetch if apiUrl changes

  return { dataGet, loading, error, fetchData };
};

export default useGetQuery;
