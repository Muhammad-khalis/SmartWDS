import { useEffect, useState } from "react";

import { getAisles } from "../services/aisle.service";

import AisleForm from "../components/aisles/AisleForm.jsx";
import AisleList from "../components/aisles/AisleList.jsx";

const Aisles = () => {

  const [aisles,setAisles] = useState([]);

  const fetchAisles = async ()=>{

    try{

      const res = await getAisles();

      setAisles(res.data || []);

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{

    fetchAisles();

  },[]);

  return(

    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-bold">
        Aisle Management
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <AisleForm refresh={fetchAisles}/>

        <AisleList aisles={aisles}/>

      </div>

    </div>

  );

};

export default Aisles;