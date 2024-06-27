import { Link, useNavigate } from "react-router-dom";
import { useAdmin } from "../hooks/context/AdminContext";
import { useForm } from "react-hook-form";


const RegisterUtil = () => {
  const { registerUtiles, estados } = useAdmin();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onsubmit = handleSubmit(async (values) => {
    const response = await registerUtiles(values);
    if (response.status === 200) {
      navigate("/listarutil");
    }
    console.log(response);
  });

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="lg:w-[450px] p-8 rounded-2xl shadow-2xl w-auto bg-slate-200">
        <h1 className="text-black text-4xl mb-8 text-center">
          Registro <span className="text-blue-400">Util</span>{" "}
        </h1>
        <form action="" className="mb-6" onSubmit={onsubmit}>
          <div className="relative mb-4">
            <input
              type="text"
              className="py-3 pl-8 pr-4 outline-none w-full rounded-lg"
              {...register("nombre_material")}
              placeholder="ingresa el nombre"
            />
          </div>
          <div className="relative mb-4">
            <label htmlFor="" className="text-gray-600 mb-1">
              Rol
            </label>
            <select
              className="py-3 px-3 rounded-lg"
              id="estado"
              {...register("estado")}
            >
              <option value="">All</option>
              {estados.map((estado, index) => (
                <option key={`estado_${index}`} value={estado}>
                  {estado}
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

export default RegisterUtil;
