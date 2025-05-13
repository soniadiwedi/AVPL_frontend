import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

import LoginPage from "./pages/Auth/LoginPage";
import SignupPage from "./pages/Auth/SignupPage";
import UserPage from "./pages/UserPage";
import AssestPage from "./pages/AssestPage";
import ProcurementPage from "./pages/ProcurementPage";
import VendorPage from "./pages/VendorPage";
import FacilityPage from "./pages/FacilityPage";
import AllRequestPage from "./pages/AllRequestPage";
import DashboardLayout from "./components/DashboardLayout";
import { AuthProvider } from "./components/context/AuthContext";
import SingleUserPage from "./pages/user/SingleUserpage";
import ProcurementRequest from "./pages/user/ProcurementRequest";
import AttendancePage from "./pages/user/AttendancePage";
import TravelPage from "./pages/user/TravelPage";
import TicketPage from "./pages/user/TicketPage";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
         
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* User routes */}
          <Route element={<PrivateRoute allowedRoles={['user']} />}>
            <Route
              element={<DashboardLayout />}
            >
              <Route path="/user/assets" element={<SingleUserPage />} />
              <Route path="/user/procurement" element={<ProcurementRequest />} />
              <Route path="/user/s" element={<AttendancePage />} />
              <Route path="/user/travel" element={<TravelPage />} />
              <Route path="/user/ticket" element={<TicketPage />} />
            </Route>
          </Route>

          {/* Admin routes only */}
          <Route element={<PrivateRoute allowedRoles={['admin']} />}>
            <Route
              element={<DashboardLayout />}
            >
              <Route path="/" element={<UserPage />} />
              <Route path="/assets/:id" element={<AssestPage />} />
              <Route path="/assets" element={<AssestPage />} />
              <Route path="/assets-assign/:userId/:requestId" element={<AssestPage />} />
              <Route path="/asset-requests" element={<AllRequestPage />} />
              <Route path="/procurement" element={<ProcurementPage />} />
              <Route path="/vendor" element={<VendorPage />} />
            </Route>
          </Route>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
