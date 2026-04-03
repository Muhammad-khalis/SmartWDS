import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from "recharts";

const TopProductsChart = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No product data
      </div>
    );
  }

  return (

    <ResponsiveContainer width="100%" height={300}>

      <BarChart data={data}>

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar
          dataKey="value"
          fill="#6366f1"
          radius={[6,6,0,0]}
        />

      </BarChart>

    </ResponsiveContainer>

  );

};

export default TopProductsChart;