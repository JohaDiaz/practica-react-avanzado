import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router";
import { useAppSelector } from "../../../store";

export default function RequireAuth({ children }: { children: ReactNode }) {
  const isLogged = useAppSelector((state) => state.auth);
  const location = useLocation();

  return isLogged ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
}

