import { Navigate, useLocation } from "react-router-dom";

export default function ProtectedRoute({ children, customer }) {
  const location = useLocation();
  console.log("customer:", customer)
  if (!customer) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}