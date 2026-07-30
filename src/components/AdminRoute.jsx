import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../hooks/useAuth.js";

// Extra guard on top of ProtectedRoute: sends non-admins back home.
// The backend enforces this too (this is just UX, not the real gate).
export const AdminRoute = () => {
  const { data: user } = useMe();
  if (user?.role !== "admin") return <Navigate to="/" replace />;
  return <Outlet />;
};
