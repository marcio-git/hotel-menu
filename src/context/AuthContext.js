import { createContext } from "react";
import axios from "axios";
import { useLocalStorage } from "../hooks/useLocalStorage";


export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [ isAuthenticated, setIsAuthenticated, deleteValue ] = useLocalStorage('token', '')

  const login = async(data) => {
    try {
      const respuesta = await axios.post(`http://challenge-react.alkemy.org/`, data);
      if(respuesta.status === 200) {
        setIsAuthenticated(respuesta.data.token)
      console.log(isAuthenticated)
        return respuesta

      } else if(respuesta.status === 401) {
        console.log(respuesta)
        setIsAuthenticated(false)
      }
    } catch(error) {
      console.log("error al ingresar")
      return error
    }
  }
  
  return <AuthContext.Provider value={{ login, deleteValue, isAuthenticated }}>
    {children}
  </AuthContext.Provider>
}