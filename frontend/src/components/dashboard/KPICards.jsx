import { useEffect, useState } from "react";
import { getDashboardStats } from "../../services/dashboard.service";

const KPICards = () => {

  const [stats,setStats] = useState({});

  useEffect(()=>{

    const loadStats = async ()=>{

      try{

        const data = await getDashboardStats();

        setStats(data);

      }catch(err){

        console.error(err);

      }

    }

    loadStats();

  },[])

  const KPICards = () => {

  return (

    <div className="grid grid-cols-4 gap-6">

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm">Total Products</p>
        <h2 className="text-3xl font-bold mt-2">120</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm">Warehouses</p>
        <h2 className="text-3xl font-bold mt-2">6</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm">Low Stock</p>
        <h2 className="text-3xl font-bold text-red-500 mt-2">8</h2>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border">
        <p className="text-gray-500 text-sm">Inventory Value</p>
        <h2 className="text-3xl font-bold mt-2">$24,000</h2>
      </div>

    </div>

  )

}}

export default KPICards