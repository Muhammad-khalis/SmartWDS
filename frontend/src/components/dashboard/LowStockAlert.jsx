const LowStockAlert = () => {

  const lowStockProducts = [

    {
      id:1,
      name:"Mouse",
      qty:3
    },

    {
      id:2,
      name:"Keyboard",
      qty:2
    }

  ]
const LowStockAlert = () => {

  return (

    <div className="bg-white p-6 rounded-xl shadow-sm border">

      <h3 className="font-semibold mb-4 text-red-500">
        Low Stock Alerts
      </h3>

      <p className="text-gray-500">
        No low stock items
      </p>

    </div>

  )

}
}
export default LowStockAlert