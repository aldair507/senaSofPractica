import { useAdmin } from "../hooks/context/AdminContext";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import RegisterUsuario from "./RegisterUsuario";
const Home = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const handleSignout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <div className="w-full bg-slate-600 p-4 text-white">
        <div className="flex justify-between">
          <h1 className="text-3xl ml-3">
            <a href="/">Util tech</a>
          </h1>
          <div className="w-auto">
            <button
              onClick={handleSignout}
              className="mr-7 bg-blue-800 rounded-lg py-3 px-6 text-center text-white"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>

      <div className="mt-5 flex-grow w-full">
        <div className="flex justify-between bg-white shadow p-4">
          <h1 className="text-3xl hover:text-green-500">Gestion Utiles</h1>

          <button className="bg-blue-800 text-white mr-5 py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
            Add Util
          </button>
          <Link to={"/register"}>
            <button className="bg-blue-800 text-white mr-5 py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-300">
              Add User
            </button>
          </Link>
        </div>

        <div className="flex flex-col items-center justify-center flex-grow mt-9">
          <p className="text-3xl">Bienvenido</p>
        </div>
      </div>
    </div>
  );
};

export default Home;
