import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Cell
} from "recharts";

const InventoryValueChart = ({ data }) => {
  // HCI: Loader or null if no data
  if (!data || data.length === 0) {
    return (
      <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-[400px] flex items-center justify-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest">No Analysis Data Available</p>
      </div>
    );
  }

  const COLORS = ["#6366f1", "#10b981", "#f43f5e", "#f59e0b", "#0f172a"];

  return (
    // ⭐ THE FIX: Added 'min-w-0' and 'w-full' to the container
    <div className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-slate-100 h-[400px] w-full min-w-0">
      <div className="mb-8 px-2">
        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest leading-none">Category Distribution</h4>
        <p className="text-[9px] text-slate-400 font-bold uppercase mt-1">Real-time Volume Analysis</p>
      </div>

      {/* ⭐ THE FIX: Wrapping in a div with fixed height to ensure calculation */}
      <div className="h-[280px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart 
            data={data} 
            margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: '700', fill: '#94a3b8' }}
              dy={10}
            />

            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fontWeight: '700', fill: '#94a3b8' }}
              width={50}
              tickFormatter={(value) => {
                if (value >= 1000) return `${value / 1000}k`;
                return value;
              }}
            />

            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ 
                borderRadius: '16px', 
                border: 'none', 
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)', 
                fontSize: '11px', 
                fontWeight: 'bold',
                padding: '12px' 
              }}
              formatter={(value) => [`${value} Units`, "Stock Volume"]}
            />

            <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={40}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default InventoryValueChart;