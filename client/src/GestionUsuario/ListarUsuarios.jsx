import { useAdmin } from "../hooks/context/AdminContext";

const ListarUsuarios = () => {
  const { usuarios } = useAdmin();

  console.log(usuarios);
  return (
    <div >
      <div className="flex text-center mb-4 bg-white  mt-4 items-cnter h-10 hover:text-blue-400">
        <h1 className="text-2xl font-bold">Listado de Usuarios</h1>
      </div>

      <div className="flex justify-center ">
        <div className="w-full ">
          <div className="   overflow-x-auto">
            <table className="w-full  bg-transparent border-collapse">
              <thead>
                <tr>
                  <th className=" px-6 border-solid  bg-gray-50 border-gray-200 text-black border text-xs  font-semibold uppercase ">
                    Id
                  </th>
                  <th className="px-6 bg-gray-50 text-black border border-solid border-gray-200 py-3 text-xs uppercase font-semibold ">
                    Nombre
                  </th>
                  <th className="px-6 font-semibold text-xs border-gray-200 text-black border  bg-gray-50 py-3 border-solid uppercase">
                    Apellido
                  </th>
                  <th className="px-6 font-semibold text-xs border-gray-200 text-black border  bg-gray-50 py-3 border-solid uppercase">
                    Email
                  </th>
                  <th className="px-6 font-semibold text-xs border-gray-200 text-black border  bg-gray-50 py-3 border-solid uppercase">
                    Rol
                  </th>
                  <th className="px-6 font-semibold text-xs border-gray-200 text-black border  bg-gray-50 py-3 border-solid uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {usuarios.map((user, index) => (
                  <tr key={index} className="">
                    <th className="border">{user.idusuario}</th>
                    <th className="border">{user.nombre_usuario}</th>
                    <th className="border">{user.apellido_usuario}</th>
                    <th className="border">{user.correo_usuario}</th>
                    <th className="border">
                      {user.nombre_rol}
                      {console.log(user.nombre_rol)}
                    </th>
                    <th>
                      <div className="flex justify-center">hola</div>
                    </th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListarUsuarios;
