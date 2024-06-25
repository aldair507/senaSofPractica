import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./component/Login";
import Home from "./component/Home";
import RegisterUsuario from "./component/RegisterUsuario";
import { AdminProvider} from "./hooks/context/AdminContext";
import PrivateRoute from "./component/PrivateRoute";
function App() {
  return (
    <Router>
      <AdminProvider>
        <AppContent />
      </AdminProvider>
    </Router>
  );
}

function AppContent() {
 

  return (
    <Routes>
      
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
      <Route path="/register" element={<PrivateRoute><RegisterUsuario /></PrivateRoute>} />
    </Routes>
  );
}

export default App;
