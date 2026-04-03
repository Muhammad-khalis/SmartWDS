import { deleteZone } from "../../services/zone.service";

const ZoneTable = ({ zones, refresh }) => {

  const handleDelete = async (id) => {

    if (!window.confirm("Delete this zone?")) return;

    await deleteZone(id);

    refresh();

  };

  return (

    <div className="bg-white shadow rounded p-6">

      <h2 className="font-semibold mb-4">
        Zone List
      </h2>

      <table className="w-full">

        <thead className="bg-gray-100">

          <tr>
            <th className="p-2 text-left">Zone</th>
            <th className="p-2 text-left">Warehouse</th>
            <th className="p-2 text-center">Actions</th>
          </tr>

        </thead>

        <tbody>

          {zones.map((z) => (

            <tr key={z._id} className="border-b">

              <td className="p-2">
                {z.name}
              </td>

              <td className="p-2">
                {z.warehouse?.name}
              </td>

              <td className="p-2 text-center">

                <button
                  onClick={() => handleDelete(z._id)}
                  className="text-red-500 hover:underline"
                >
                  Delete
                </button>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

};

export default ZoneTable;