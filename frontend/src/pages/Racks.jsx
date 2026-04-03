import { useEffect, useState } from "react";

import { getRacks } from "../services/rack.service";

import RackForm from "../components/racks/RackForm.jsx";
import RackList from "../components/racks/RackList.jsx";

const Racks = () => {

  const [racks,setRacks] = useState([]);

  const fetchRacks = async ()=>{

    try{

      const res = await getRacks();
      setRacks(res.data || []);

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{

    fetchRacks();

  },[]);

  return(

    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-bold">
        Rack Management
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <RackForm refresh={fetchRacks}/>

        <RackList racks={racks}/>

      </div>

    </div>

  );

};

export default Racks;