import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: ReactNode;
  allowedRoles?: number[];
  requiredRole?: number;
  redirectTo?: string;
}

const PrivateRoute = ({
  children,
  allowedRoles,
  requiredRole,
  redirectTo = "/login",
}: PrivateRouteProps) => {
  const token = localStorage.getItem("token");
  const userRoleStr = localStorage.getItem("role");
  const userRole = userRoleStr !== null ? Number(userRoleStr) : null;

  if (!token) {
    return <Navigate to={redirectTo} replace />;
  }

  if (requiredRole !== undefined && userRole !== requiredRole) {
    return <Navigate to="/forbidden" replace />;
  }

  if (allowedRoles && allowedRoles.length > 0 && userRole !== null && !allowedRoles.includes(userRole)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
