import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const InventoryValueChart = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No category data available
      </div>
    );
  }

  return (

    <ResponsiveContainer width="100%" height={300}>

      <BarChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="name"
          tick={{ fontSize: 12 }}
        />

        <YAxis />

        <Tooltip />

        <Legend />

        <Bar
          dataKey="value"
          fill="#3b82f6"
          radius={[6, 6, 0, 0]}
        />

      </BarChart>

    </ResponsiveContainer>

  );

};

export default InventoryValueChart;