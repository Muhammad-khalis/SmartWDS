const WarehouseTree = ({ warehouses }) => {

  return (

    <div className="space-y-4">

      {warehouses.map((w)=> (

        <div key={w._id} className="border p-4 rounded">

          <h3 className="font-bold text-lg">{w.name}</h3>

          {w.zones?.map((z)=> (

            <div key={z._id} className="ml-4">

              <p className="font-semibold">Zone: {z.name}</p>

              {z.aisles?.map((a)=> (

                <div key={a._id} className="ml-4">

                  Aisle: {a.name}

                </div>

              ))}

            </div>

          ))}

        </div>

      ))}

    </div>

  );

};

export default WarehouseTree;