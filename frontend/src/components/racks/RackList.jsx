const RackList = ({ racks }) => {

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Racks
      </h2>

      {racks.length === 0 && (
        <p>No racks found</p>
      )}

      <div className="space-y-3">

        {racks.map((r)=>(
          <div
            key={r._id}
            className="border p-3 rounded"
          >

            <h3 className="font-semibold">
              {r.name}
            </h3>

            <p className="text-gray-500">
              Aisle: {r.aisle?.name}
            </p>

            <p className="text-gray-400 text-sm">
              Zone: {r.aisle?.zone?.name}
            </p>

            <p className="text-gray-400 text-sm">
              Warehouse: {r.aisle?.zone?.warehouse?.name}
            </p>

          </div>
        ))}

      </div>

    </div>

  );

};

export default RackList;