import { createContext, useContext, useState, useEffect } from "react";
import { login, logoutBack, registerUsuario } from "../../../api/admin";
import Cookies from "js-cookie";
import { getRoles } from "../../../api/roles";

export const AdminContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
};

// eslint-disable-next-line react/prop-types
export const AdminProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [rol, setRol] = useState();

  useEffect(() => {
    // Recuperar el estado de autenticación de localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsAuthenticated(true);
    }
  }, []);
  const signin = async (user) => {
    try {
      const response = await login(user);
      setIsAuthenticated(true);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await logoutBack();
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
      localStorage.removeItem("user");
    } catch (error) {
      console.log("errro a realixar el lohout");
    }
  };

  const roles = async () => {
    const resRoles = await getRoles();
    const resData = resRoles.data;
    setRol(resData);
  };

  const registrarUsuario= async (usuario)=>{
    try {
      const response= await registerUsuario(usuario)
      if(response.status===200){
        const {resData}= await getUsuario()
        setUser(resData)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AdminContext.Provider
      value={{
        user,
        roles,
        rol,
        signin,
        registrarUsuario,
        isAuthenticated,
        logout,
        setIsAuthenticated,
        setUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
