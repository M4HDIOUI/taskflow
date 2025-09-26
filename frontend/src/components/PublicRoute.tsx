import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface Props {
  children: ReactNode;
}

export default function PublicRoute({ children }: Props) {
  const token = localStorage.getItem("access");

  if (token) {
    return <Navigate to="/profile" replace />;
  }

  return <>{children}</>;
}
