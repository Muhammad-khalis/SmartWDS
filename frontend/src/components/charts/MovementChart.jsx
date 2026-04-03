import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from "recharts";

const MovementChart = ({ data }) => {

  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px] text-gray-400">
        No movement data available
      </div>
    );
  }

  return (

    <ResponsiveContainer width="100%" height={300}>

      <LineChart
        data={data}
        margin={{ top: 10, right: 20, left: 0, bottom: 5 }}
      >

        <CartesianGrid strokeDasharray="3 3" />

        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
        />

        <YAxis />

        <Tooltip />

        <Legend />

        <Line
          type="monotone"
          dataKey="inbound"
          stroke="#10b981"
          strokeWidth={3}
          dot={{ r: 4 }}
        />

        <Line
          type="monotone"
          dataKey="outbound"
          stroke="#ef4444"
          strokeWidth={3}
          dot={{ r: 4 }}
        />

      </LineChart>

    </ResponsiveContainer>

  );

};

export default MovementChart;