import { useEffect, useState } from "react";

import { getBins } from "../services/bin.service";

import BinForm from "../components/bins/BinForm.jsx";
import BinList from "../components/bins/BinList.jsx";

const Bins = () => {

  const [bins,setBins] = useState([]);

  const fetchBins = async ()=>{

    try{

      const res = await getBins();
      setBins(res.data || []);

    }catch(err){
      console.log(err);
    }

  };

  useEffect(()=>{

    fetchBins();

  },[]);

  return(

    <div className="p-8 space-y-6">

      <h1 className="text-2xl font-bold">
        Bin Management
      </h1>

      <div className="grid grid-cols-2 gap-6">

        <BinForm refresh={fetchBins}/>

        <BinList bins={bins}/>

      </div>

    </div>

  );

};

export default Bins;