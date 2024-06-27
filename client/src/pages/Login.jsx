
import { useForm } from "react-hook-form";
import { useAdmin } from "../hooks/context/AdminContext";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";



const Login = () => {
  const { register, handleSubmit } = useForm();
  const { signin,isAuthenticated} = useAdmin();
  const navigate= useNavigate()

  const onsubmit = handleSubmit(async (values) => {
    const responseLogin = await signin(values);
    console.log(responseLogin); 
  });

  
  useEffect(() => {
   
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="lg:w-[450px] p-8 rounded-2xl shadow-2xl w-auto h-full bg-slate-200">
        <h1 className="text-black mb-8 text-center text-4xl">
          Iniciar <span className="text-blue-400">Sesion</span>
        </h1>
        <form className="mb-8" onSubmit={onsubmit}>
          <div className="relative mb-4">
            <input
              type="email"
              {...register("correoUsuario")}
              className="py-3 pl-8 pr-4 outline-none w-full rounded-lg"
              placeholder="Ingresa tu correo"
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              className="py-3 pl-8 pr-4 outline-none w-full rounded-lg"
              placeholder="Ingresa tu contraseña"
              {...register("contrasena")}
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 mt-6 w-full rounded-lg py-3 px-4 text-sm text-white"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
