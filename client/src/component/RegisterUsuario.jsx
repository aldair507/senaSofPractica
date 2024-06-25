import { Link } from "react-router-dom";
import { useAdmin } from "../hooks/context/AdminContext";
import { useForm } from "react-hook-form";

const RegisterUsuario = () => {

    const {rol, registrarUsuario,}=useAdmin()
    const {register,handleSubmit}=useForm()

    const onsubmit= handleSubmit(async(values)=>{
        const response= await  registrarUsuario(values)
        console.log(response)
    })

    console.log(rol)
  return (
    <div className="min-h-screen  flex items-center justify-center p-4">
      <div className="lg:w-[450px] p-8 rounded-2xl  shadow-2xl h-full w-auto bg-slate-200">
        <h1 className="text-black text-4xl mb-8 text-center ">
          Registro <span className="text-blue-400">Usuario</span>{" "}
        </h1>
        <form action="" className="mb-8" onSubmit={onsubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              className="py-3 pl-8 pr-4 outline-none w-full rounded-lg"
              {...register('nombreUsuario',)}
              placeholder="ingresa el nombre"
              
            />
          </div>

          <div className="relative mb-4">
            <input
              type="text"
              className="py-3 pl-8 pr-4 outline-none w-full rounded-lg"
              placeholder="ingresa el apellido"
              {...register('apellidoUsuario',)}
            />
          </div>
          <div className="relative mb-4">
            <input
              type="email"
              className="py-3 pl-8 pr-4 outline-none w-full rounded-lg"
              placeholder="ingresa tu email"
              {...register('correoUsuario',)}
            />
          </div>
          <div className="relative mb-4">
            <input
              type="password"
              className="py-3 pl-8 pr-4 outline-none w-full rounded-lg"
              placeholder="ingresa la contraseña"
              {...register('contrasena',)}
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="" className="text-gray-600 mb-1">
              Rol
            </label>
            <select className="py-3 px-3 rounded-lg " id="rol" name='rol'>
              <option value="">All</option>
                {/* {rol.map((rolItem,index)=>(
                    <option key={`cargo_${index}`} >
                    {rolItem.nombre_rol}
                  </option>
                ))} */}
            </select>
          </div>
          <button
            type="submit"
            className="bg-blue-500 rounded-lg w-full mt-6 py-3 text-sm text-white"
          >
            Registrar
          </button>
          <Link to={"/home"}>
            <button
              type="submit"
              className="bg-blue-500 rounded-lg w-full mt-6 py-3 text-sm text-white"
            >
              cancelar
            </button>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterUsuario;
