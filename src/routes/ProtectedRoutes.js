import { Navigate } from "react-router-dom"
import { useAuth } from "../hooks/useAuth";

export const ProtectedRoutes = ({children}) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ?
      children :
      <Navigate to="/login" />
}