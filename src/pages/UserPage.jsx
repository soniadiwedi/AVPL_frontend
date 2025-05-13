

import useGetQuery from "../hooks/useGetQuery";
import { baseUrl } from "../utils/data";
import UserTable from "../components/table/UserTable";

const UserPage = () => {
  const { dataGet, loading, error, fetchData } = useGetQuery(
    `${baseUrl}/api/users`
  );

  console.log(dataGet);
  return (
    <div>
      <div className="mt-8">
        {loading ? (
          <div className="text-blue-600">Loading...</div>
        ) : error ? (
          <div className="text-red-500">Error: {error}</div>
        ) : dataGet && dataGet.length > 0 ? (
          <UserTable user={dataGet} fetchData={fetchData} />
        ) : (
          <div className="border rounded p-4 text-gray-600">No user found.</div>
        )}
      </div>
    </div>
  );
};

export default UserPage;
