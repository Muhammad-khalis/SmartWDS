const RecentActivity = () => {

  const activities = [

    {
      id:1,
      action:"Inbound",
      product:"Laptop",
      qty:20
    },

    {
      id:2,
      action:"Outbound",
      product:"Keyboard",
      qty:5
    }

  ]

  const RecentActivity = () => {

  return (

    <div className="bg-white p-6 rounded-xl shadow-sm border">

      <h3 className="font-semibold mb-4">
        Recent Activity
      </h3>

      <p className="text-gray-500">
        No activity yet
      </p>

    </div>

  )

}
}
export default RecentActivity