
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from "react-router-dom";

import Sidebar from "./component/Sidebar";
import Navbar from "./component/Navbar";
import { AdminProvider, useAdmin } from "./hooks/context/AdminContext";
import Home from "./component/Home";
import Login from "./pages/Login";
import RegisterUsuario from "./GestionUsuario/RegisterUsuario";
import NotFound from "./component/Notfound";
import RegisterUtil from "./GestionUtiles/RegistroUtil";
import ListarUsuarios from "./GestionUsuario/ListarUsuarios";
import ListarUtil from "./GestionUtiles/ListarUtil";
import Asignados from "./GestionUtiles/Asignados";
import AddUtil from "./GestionUtiles/AsignarUtil";

const App = () => {

  const {getUtil}=useAdmin()


  return (
    <Router>
      <AdminProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" index element={<Login />} />
          <Route path="*" element={<NotFound />} />
          <Route element={<AuthenticatedLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/register" element={<RegisterUsuario />} />
            <Route path="/listarusuarios" element={<ListarUsuarios />} />
            <Route path="/registerutil" element={<RegisterUtil />} />
            <Route path="/listarutil" element={<ListarUtil />} />
            <Route path="/asignados" element={<Asignados />} />
            <Route path="/asignar-util" element={<AddUtil />} />
            
          </Route>
        </Routes>
      </AdminProvider>
    </Router>
  );
};

const AuthenticatedLayout = () => {
  const { isAuthenticated } = useAdmin();

  return isAuthenticated ? (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Navbar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to="/login" replace />
  );
};

export default App;
