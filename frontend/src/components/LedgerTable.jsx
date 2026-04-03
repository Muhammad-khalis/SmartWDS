import { useEffect,useState } from "react"
import api from "../api/axios.js"

/*
Ledger Page

Shows stock movements
*/

const Ledger = ()=>{

  const [ledger,setLedger]=useState([])

  useEffect(()=>{

    const fetch=async()=>{

      const res = await api.get("/ledger")

      setLedger(res.data.data || [])

    }

    fetch()

  },[])

  return(

    <div className="p-6">

      <h1 className="text-xl font-bold mb-4">Inventory Ledger</h1>

      <table className="w-full">

        <thead className="bg-gray-800 text-white">

          <tr>
            <th className="p-2">Product</th>
            <th className="p-2">Type</th>
            <th className="p-2">Before</th>
            <th className="p-2">After</th>
          </tr>

        </thead>

        <tbody>

          {ledger.map(l=>(
            <tr key={l._id} className="border-b">
              <td className="p-2">{l.productId?.name}</td>
              <td className="p-2">{l.type}</td>
              <td className="p-2">{l.quantityBefore}</td>
              <td className="p-2">{l.quantityAfter}</td>
            </tr>
          ))}

        </tbody>

      </table>

    </div>

  )

}

export default Ledger