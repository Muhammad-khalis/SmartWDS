const BinList = ({ bins }) => {

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Bins
      </h2>

      {bins.length === 0 && (
        <p>No bins found</p>
      )}

      <div className="space-y-3">

        {bins.map((b)=>(
          <div
            key={b._id}
            className="border p-3 rounded"
          >

            <h3 className="font-semibold">
              {b.name}
            </h3>

            <p className="text-gray-500">
              Rack: {b.rack?.name}
            </p>

            <p className="text-gray-400 text-sm">
              Aisle: {b.rack?.aisle?.name}
            </p>

            <p className="text-gray-400 text-sm">
              Zone: {b.rack?.aisle?.zone?.name}
            </p>

            <p className="text-gray-400 text-sm">
              Warehouse: {b.rack?.aisle?.zone?.warehouse?.name}
            </p>

            <p className="text-blue-600 text-sm font-semibold">
              Capacity: {b.capacity}
            </p>

          </div>
        ))}

      </div>

    </div>

  );

};

export default BinList;