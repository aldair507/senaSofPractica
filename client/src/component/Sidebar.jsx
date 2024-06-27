import { useState } from "react";
import { IoPeopleSharp } from "react-icons/io5";
import { IoMdBook } from "react-icons/io";
import { MdEmojiPeople } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiOutlineMenu } from "react-icons/ai";
import logo from "../assets/logo.jpeg";
import { IoHomeSharp } from "react-icons/io5";
import { useAdmin } from "../hooks/context/AdminContext";

const Sidebar = () => {


    const {verficar}=useAdmin()


    const [openMenus, setOpenMenus] = useState({
      users: false,
      utiles: false,
    });
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
  
    const handleOpen = (menu) => {
      setOpenMenus((prev) => ({
        ...prev,
        [menu]: !prev[menu],
      }));
    };
  
    const handleSidebarOpen = () => {
      setSidebarOpen(!sidebarOpen);
    };
  
    const handleClick = () => {
      setSidebarOpen(false);
    };
  
    return (
      <div className={`bg-white shadow border min-h-screen flex ${sidebarOpen ? "w-[110px]" : "w-[300px]"} transition-width duration-300 ease-in-out`}>
        <div className="flex flex-col w-full ">
          <div className="">
            <button onClick={handleSidebarOpen} className="ml-10">
              <AiOutlineMenu size={30} />
            </button>
            {!sidebarOpen && (
              <div className="flex justify-center">
                <img src={logo} className="size-56 mr-10" alt="Logo" />
              </div>
            )}
          </div>
  
          <div className="flex-grow flex flex-col justify-center">
            <ul>
              <li className="ml-10 space-y-2">
                <Link to='/home'>
                  <button className="flex items-center w-full space-x-2">
                    <IoHomeSharp size={30} /> {!sidebarOpen && <span>Home</span>}
                  </button>
                </Link>
              </li>
              
              <li className="ml-10 space-y-2 mt-4">
                <button className="flex items-center w-full space-x-2" onClick={() => handleOpen("users")}>
                  <IoPeopleSharp size={30} /> {!sidebarOpen && <span className="ml-2">Gestion Usuarios</span>}
                </button>
                <div className={`ml-8 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${openMenus.users ? "max-h-screen" : "max-h-0"}`}>
                  <ul className="space-y-2 ml-5">
                    <li className="">
                      <button onClick={handleClick}>
                        <Link to={"/register"} className="flex items-center">
                          <MdEmojiPeople size={25} /> {!sidebarOpen && <span className="ml-2">Agregar Usuario</span>}
                        </Link>
                      </button>
                      <button onClick={handleClick}>
                        <Link to={"/listarusuarios"} className="flex items-center">
                          <MdEmojiPeople size={25} /> {!sidebarOpen && <span className="ml-2">Listar usuarios</span>}
                        </Link>
                      </button>
                    </li>
                  </ul>
                </div>
              </li>
              <li className="ml-10 space-y-2 mt-4">
                <button className="flex items-center w-full space-x-2" onClick={() => handleOpen("utiles")}>
                  <IoMdBook size={30} /> {!sidebarOpen && <span className="ml-2">Gestion Utiles</span>}
                </button>
                <div className={`ml-8 mt-2 overflow-hidden transition-all duration-300 ease-in-out ${openMenus.utiles ? "max-h-screen" : "max-h-0"}`}>
                  <ul className="space-y-2 ml-5">
                    <li className="">
                      <button onClick={handleClick}>
                        <Link to={"/registerutil"} className="flex items-center">
                          <MdEmojiPeople size={25} /> {!sidebarOpen && <span className="ml-2">Registar utiles</span>}
                        </Link>
                      </button>
                    </li>
                    <li className="">
                      <button onClick={handleClick}>
                        <Link to={"/listarUtil"} className="flex items-center">
                          <MdEmojiPeople size={25} /> {!sidebarOpen && <span className="ml-2">Listar Util</span>}
                        </Link>
                      </button>
                    </li>
                    <li className="">
                      <button onClick={handleClick}>
                        <Link to={"/asignar-util"} className="flex items-center">
                          <MdEmojiPeople size={25} /> {!sidebarOpen && <span className="ml-2">Entrega util</span>}
                        </Link>
                      </button>
                    </li>
                    <li className="">
                      <button onClick={handleClick}>
                        <Link to={"/asignados"} className="flex items-center">
                          <MdEmojiPeople size={25} /> {!sidebarOpen && <span className="ml-2">asignadosl</span>}
                        </Link>
                      </button>
                    </li>

                  </ul>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  };
  
  export default Sidebar;