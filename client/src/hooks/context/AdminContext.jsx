import { createContext, useContext, useState, useEffect } from "react";
import {
  getUsers,
  login,
  logoutBack,
  registerUsuario,
} from "../../../api/admin";
import Cookies from "js-cookie";
import { getRoles } from "../../../api/roles";
import {
  asigUtil,
  estado,
  getAsigUtil,
  getUtiles,
  registroUtil,
  verifyFront,
} from "../../../api/util";

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
  const [rol, setRol] = useState([]);
  const [estados, setEstados] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [utiles, setUtiles] = useState([]);
  const [getUtil, setGetUtil] = useState();
  const [verficar, setVerificar] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUser(user);
      setIsAuthenticated(true);
      fetchRoles(user.rol_idrol);
    }
  }, []);

  useEffect(() => {
    fectVerificar();
    fetchUsuarios();
    fetchUtiles();
    fetchEstados();
    fetchGetUtils();
  
  }, []);

  const fetchUsuarios = async () => {
    setLoading(true);
    try {
      const response = await getUsers();
      setUsuarios(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const fectVerificar = async () => {
    setLoading(true);

    try {
      const response = await verifyFront();

      setVerificar(response.data.user);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(verficar)
  const fetchUtiles = async () => {
    try {
      const response = await getUtiles();
      setUtiles(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchEstados = async () => {
    try {
      const response = await estado();
      setEstados(response.data);
    } catch (error) {
      console.log("Error fetching estados:", error);
      setError("Error fetching estados");
    }
  };

  const fetchGetUtils = async () => {
    try {
      const response = await getAsigUtil();
      console.log(response.data.user)
      setGetUtil(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const signin = async (userData) => {
    try {
      const response = await login(userData);
      setIsAuthenticated(true);
      setUser(response.data);
      localStorage.setItem("user", JSON.stringify(response.data));
      fetchRoles(response.data.rol_idrol);
      return response.data;
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  const logout = async () => {
    try {
      await logoutBack();
      Cookies.remove("token");
      setIsAuthenticated(false);
      setUser(null);
      setRol([]);
      localStorage.removeItem("user");
      localStorage.removeItem("roles");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const fetchRoles = async (rolId) => {
    try {
      const response = await getRoles();
      const userRole = response.data.find((role) => role.idrol === rolId);
      setRol(userRole);
      localStorage.setItem("roles", JSON.stringify(userRole));
    } catch (error) {
      console.error("Error fetching roles:", error);
    }
  };

  const registrarUsuario = async (userData) => {
    try {
      const response = await registerUsuario(userData);
      if (response.status === 200) {
        fetchUsuarios(); // Actualiza la lista de usuarios después de registrar uno nuevo
      }
      return response;
    } catch (error) {
      console.error("Error registering user:", error);
      return { error: error.message };
    }
  };

  const asigutil = async (user) => {
    try {
      const response = await asigUtil(user);
      if (response.status === 200) {
        fetchGetUtils();
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  const registerUtiles = async (util) => {
    try {
      const response = await registroUtil(util);
      if (response.status === 200) {
        fetchUtiles(); // Actualiza la lista de útiles después de registrar uno nuevo
      }
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AdminContext.Provider
      value={{
        user,
        usuarios,
        rol,
        getUtil,
        signin,
        registerUtiles,
        asigutil,
        verficar,
        registrarUsuario,
        utiles,
        estados,
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
