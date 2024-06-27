import { useAdmin } from "../hooks/context/AdminContext";

const ListarUtil = () => {
  const { utiles } = useAdmin();

  console.log(utiles);
  return (
    <div >
      <div className="flex text-center mb-4 bg-white  mt-4 items-cnter h-10 hover:text-blue-400">
        <h1 className="text-2xl font-bold">Listado de Util</h1>
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
                    Estado
                  </th>
                 
                  <th className="px-6 font-semibold text-xs border-gray-200 text-black border  bg-gray-50 py-3 border-solid uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                {utiles.map((user, index) => (
                  <tr key={index} className="">
                    <th className="border">{user.idmateriales}</th>
                    <th className="border">{user.nombre_material}</th>
                    <th className="border">{user.estado}</th>
                  
                   
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

export default ListarUtil;
