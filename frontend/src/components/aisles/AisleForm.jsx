import { useState, useEffect } from "react";
import { createAisle } from "../../services/aisle.service";
import { getZones } from "../../services/zone.service";

const AisleForm = ({ refresh }) => {

  const [name,setName] = useState("");
  const [zone,setZone] = useState("");
  const [zones,setZones] = useState([]);

  useEffect(()=>{

    const fetchZones = async ()=>{

      const res = await getZones();
      setZones(res.zones || []);

    };

    fetchZones();

  },[]);

  const handleSubmit = async (e)=>{

    e.preventDefault();

    if(!name || !zone){
      alert("All fields required");
      return;
    }

    try{

      await createAisle({
        name,
        zone
      });

      setName("");
      setZone("");

      refresh();

    }catch(err){
      console.log(err);
    }

  };

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Create Aisle
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Aisle Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={zone}
          onChange={(e)=>setZone(e.target.value)}
          className="border p-2 w-full"
        >

          <option value="">Select Zone</option>

          {zones.map((z)=>(
            <option key={z._id} value={z._id}>
              {z.name}
            </option>
          ))}

        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-full rounded"
        >
          Create Aisle
        </button>

      </form>

    </div>

  );

};

export default AisleForm;