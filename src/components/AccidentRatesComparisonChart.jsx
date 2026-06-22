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

import "./AccidentRatesComparisonChart.css";

function AccidentRatesComparisonChart({ topRankings = [], bottomRankings = [] }) {
  const chartData = Array.from({ length: 10 }, (_, index) => ({
    rank: `#${index + 1}`,
    topRegion: topRankings[index]?.region_name || "No data",
    topRate: Number(topRankings[index]?.value) || 0,
    bottomRegion: bottomRankings[index]?.region_name || "No data",
    bottomRate: Number(bottomRankings[index]?.value) || 0,
  }));

  return (
    <div className="rates-comparison-card">
      <h3>Top vs Bottom Accident Rates</h3>

      <ResponsiveContainer width="100%" height={370}>
        <LineChart
          data={chartData}
          margin={{
            top: 35,
            right: 18,
            left: -10,
            bottom: 28,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" vertical={false} />

          <XAxis
            dataKey="rank"
            tick={{ fontSize: 12 }}
            label={{
              value: "Region rank",
              position: "insideBottom",
              offset: -12,
              fontSize: 12,
            }}
          />

          <YAxis
            width={35}
            tick={{ fontSize: 12 }}
            label={{
              value: "Accident rate",
              angle: -90,
              position: "insideLeft",
              offset: 15,
              fontSize: 12,
            }}
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
            height={30}
            iconType="line"
            wrapperStyle={{
              fontSize: "12px",
              top: 0,
            }}
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

export default AccidentRatesComparisonChart;