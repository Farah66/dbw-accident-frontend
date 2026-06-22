import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import "./TopAccidentRatesChart.css";

function TopAccidentRatesChart({ topRankings = [], bottomRankings = [] }) {
  const chartData = Array.from({ length: 10 }, (_, index) => ({
    rank: `#${index + 1}`,
    topRegion: topRankings[index]?.region_name || "No data",
    topRate: Number(topRankings[index]?.value) || 0,
    bottomRegion: bottomRankings[index]?.region_name || "No data",
    bottomRate: Number(bottomRankings[index]?.value) || 0,
  }));

  return (
    <div className="line-chart-card">
      <h3>Top vs Bottom Accident Rates</h3>

      <ResponsiveContainer width="100%" height={360}>
        <LineChart
          data={chartData}
          margin={{ top: 10, right: 15, left: -25, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis dataKey="rank" tick={{ fontSize: 12 }} />

          <YAxis
            tick={{ fontSize: 12 }}
            width={35}
          />

          <Tooltip
            formatter={(value, name, props) => {
              if (name === "topRate") {
                return [`${value}`, `Top: ${props.payload.topRegion}`];
              }
              return [`${value}`, `Bottom: ${props.payload.bottomRegion}`];
            }}
          />

          <Legend
            verticalAlign="top"
            align="center"
            height={28}
            iconType="line"
          />

          <Line
            type="monotone"
            dataKey="topRate"
            name="Top 10 Rates"
            stroke="#ef4444"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />

          <Line
            type="monotone"
            dataKey="bottomRate"
            name="Bottom 10 Rates"
            stroke="#10b981"
            strokeWidth={3}
            dot={{ r: 4 }}
            activeDot={{ r: 7 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default TopAccidentRatesChart;