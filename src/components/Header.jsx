import { useAuth } from "./context/AuthContext";

const Header = () => {
  const { user } = useAuth();

  return (
    <header className="bg-white shadow px-6 py-4">
      {/* User Info Section */}
      {user && (
       
       

          
            

            <div>
              <p className="text-lg font-semibold text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-600">{user.email}</p>
              <p className="text-xs text-gray-500 capitalize">{user.role}</p>
            </div>
        
        
      )}
    </header>
  );
};

export default Header;
