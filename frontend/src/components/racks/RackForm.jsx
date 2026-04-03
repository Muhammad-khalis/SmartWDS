import { useState, useEffect } from "react";
import { createRack } from "../../services/rack.service";
import { getAisles } from "../../services/aisle.service";

const RackForm = ({ refresh }) => {

  const [name,setName] = useState("");
  const [aisle,setAisle] = useState("");
  const [description,setDescription] = useState("");
  const [aisles,setAisles] = useState([]);

  useEffect(()=>{

    const fetchAisles = async ()=>{
      const res = await getAisles();
      setAisles(res.data || []);
    };

    fetchAisles();

  },[]);

  const handleSubmit = async (e)=>{

    e.preventDefault();

    if(!name || !aisle){
      alert("All fields required");
      return;
    }

    try{

      await createRack({
        name,
        aisle,
        description
      });

      setName("");
      setAisle("");
      setDescription("");

      refresh();

    }catch(err){
      console.log(err);
    }

  };

  return(

    <div className="bg-white p-6 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Create Rack
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="text"
          placeholder="Rack Name"
          value={name}
          onChange={(e)=>setName(e.target.value)}
          className="border p-2 w-full"
        />

        <select
          value={aisle}
          onChange={(e)=>setAisle(e.target.value)}
          className="border p-2 w-full"
        >

          <option value="">Select Aisle</option>

          {aisles.map((a)=>(
            <option key={a._id} value={a._id}>
              {a.name}
            </option>
          ))}

        </select>

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e)=>setDescription(e.target.value)}
          className="border p-2 w-full"
        />

        <button
          type="submit"
          className="bg-blue-600 text-white p-2 w-full rounded"
        >
          Create Rack
        </button>

      </form>

    </div>

  );

};

export default RackForm;