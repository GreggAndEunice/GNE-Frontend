import { Navigate, Outlet } from "react-router-dom";
import { useMe } from "../hooks/useAuth.js";
import { FloatingNav } from "./FloatingNav.jsx";

export const ProtectedRoute = () => {
  const { data: user, isLoading, isError } = useMe();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#09090f]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-romance-200 border-t-romance-600" />
      </div>
    );
  }

  if (isError || !user) return <Navigate to="/login" replace />;

  return (
    <>
      <Outlet />
      <FloatingNav />
    </>
  );
};
