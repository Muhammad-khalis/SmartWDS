const AisleList = ({ aisles }) => {

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Aisles
      </h2>

      {aisles.length === 0 && (
        <p>No aisles found</p>
      )}

      <div className="space-y-3">

        {aisles.map((a)=>(
          <div
            key={a._id}
            className="border p-3 rounded"
          >

            <h3 className="font-semibold">
              {a.name}
            </h3>

            <p className="text-gray-500">
              Zone: {a.zone?.name}
            </p>

            <p className="text-gray-400 text-sm">
              Warehouse: {a.zone?.warehouse?.name}
            </p>

          </div>
        ))}

      </div>

    </div>

  );

};

export default AisleList;