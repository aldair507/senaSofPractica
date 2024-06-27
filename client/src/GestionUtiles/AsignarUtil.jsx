import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/context/AdminContext";
import { useForm } from "react-hook-form";

const AddUtil = () => {
  const { registerUtiles, estados, getUtil, verficar,utiles } = useAdmin();

  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onsubmit = handleSubmit(async (values) => {
    const response = await registerUtiles(values);
    if (response.status === 200) {
      navigate("/asignados");
    }
    console.log(response);
  });

  console.log(utiles);
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="lg:w-[450px] p-8 rounded-2xl shadow-2xl w-auto bg-slate-200">
        <h1 className="text-black text-4xl mb-8 text-center">
          Registro <span className="text-blue-400">Util</span>{" "}
        </h1>
        <form action="" className="mb-6" onSubmit={onsubmit}>
          <div className="flex items-center mb-4">
            <label htmlFor="nombreUsuario" className="mr-2 text-gray-700">
              Nombre:
            </label>
            <input
              disabled
              type="text"
              id="nombreUsuario"
              className="py-2 px-4 outline-none bg-gray-100 border border-gray-300 rounded-lg w-full"
              value={verficar.nombre_usuario}
              placeholder="Ingresa el nombre"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="" className="text-gray-600 mb-1 mr-2">
              Util
            </label>
            <select
              className="py-3 px-3 rounded-lg"
              id="util"
              {...register("idmateriales")}
            >
              
              {utiles.map((estado, index) => (
                <option key={`util_${index}`} value={estado.idmateriales}>
                  {estado.nombre_material}
                </option>
              ))}
            </select>
          </div>
          <div className="relative mb-4">
            <label htmlFor="" className="text-gray-600 mb-1 mr-2">
              Util
            </label>
            <select
              className="py-3 px-3 rounded-lg"
              id="util"
              {...register("idmateriales")}
            >
              
              {utiles.map((estado, index) => (
                <option key={`util_${index}`} value={estado.idmateriales}>
                  {estado.nombre_material}
                </option>
              ))}
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
              type="button"
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

export default AddUtil;
