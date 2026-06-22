import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function MonthlyChart({ data }) {
  return (
    <div style={{ width: "100%", height: "220px", marginTop: "20px" }}>
      <h3>Accidents per Month</h3>

      <ResponsiveContainer>
        <BarChart data={data}>
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="count" fill="#00a86b" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

export default MonthlyChart;