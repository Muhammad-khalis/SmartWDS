import { useState, useEffect } from "react";
import { createBin } from "../../services/bin.service";
import { getRacks } from "../../services/rack.service";

const BinForm = ({ refresh }) => {

  const [name,setName] = useState("");
  const [rack,setRack] = useState("");
  const [capacity,setCapacity] = useState("");
  const [racks,setRacks] = useState([]);

  useEffect(()=>{

    const fetchRacks = async ()=>{

      const res = await getRacks();
      setRacks(res.data || []);

    };

    fetchRacks();

  },[]);

  const handleSubmit = async (e)=>{

    e.preventDefault();

    if(!name || !rack || !capacity){
      alert("All fields required");
      return;
    }

    try{

      await createBin({
        name,
        rack,
        capacity
      });

      setName("");
      setRack("");
      setCapacity("");

      refresh();

    }catch(err){
      console.log(err);
    }

  };

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Create Bin
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Bin Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={rack}
          onChange={(e)=>setRack(e.target.value)}
          className="border p-2 w-full"
        >

          <option value="">Select Rack</option>

          {racks.map((r)=>(
            <option key={r._id} value={r._id}>
              {r.name}
            </option>
          ))}

        </select>

        <input
          type="number"
          placeholder="Capacity"
          value={capacity}
          onChange={(e)=>setCapacity(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-full rounded"
        >
          Create Bin
        </button>

      </form>

    </div>

  );

};

export default BinForm;