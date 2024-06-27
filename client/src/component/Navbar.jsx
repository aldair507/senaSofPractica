
import { CiLogout } from "react-icons/ci";
import { useAdmin } from "../hooks/context/AdminContext";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const { logout } = useAdmin();
  const navigate = useNavigate();
  const handleSignout = () => {
    logout();
    navigate("/login");
  };
  return (
    <div className=" bg-blue-300 w-full mx-auto h-16">
      <div className="flex justify-between items-center flex-row ml-4">
        <h1 className="text-3xl "><a href="">Utileria</a></h1>
        <div className="flex ">
          <button
            onClick={handleSignout}
            className="mr-7 rounded-lg py-3 px-6 text-center text-white"
          >
            <CiLogout className="size-8 " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
