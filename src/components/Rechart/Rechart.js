import React, { useEffect, useState, useContext } from "react";
import {
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer,
} from "recharts";
import StateContext from "../../contexts/StateContext";
import Parse from "parse/dist/parse.min.js";

Parse.initialize(
  process.env.REACT_APP_PARSE_APP_ID,
  process.env.REACT_APP_PARSE_JS_KEY
);
Parse.serverURL = process.env.REACT_APP_PARSE_SERVER_URL;

function Rechart() {
  const [chartData, setChartData] = useState([]);
  const { refresh, setRefresh } = useContext(StateContext);

  const fetchChartData = async () => {
    const query = new Parse.Query("PriceData");
    query.ascending("price");
    query.limit(100000);
    query.find().then((results) => {
      const data = results.map((result) => {
        return {
          date: result.get("date"),
          price: result.get("price"),
        };
      });
      setChartData(data);
      setRefresh(refresh + 1);
    });
  };

  const xAxixTickFormatter = (tick) => {
    return new Date(tick).toLocaleDateString();
  };

  const brushTickFormatter = (tick) => {
    return new Date(tick).toLocaleString();
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChartData();
    }, 900000);
    return () => clearInterval(interval);
  }, [refresh]);

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <ResponsiveContainer height={350}>
      <AreaChart
        data={chartData}
        margin={{ top: 0, right: 0, bottom: 5, left: 30 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="1" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00FFFE" stopOpacity={1} />
            <stop offset="50%" stopColor="#FF4200" stopOpacity={1} />
            <stop offset="95%" stopColor="#1800FF" stopOpacity={1} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="price"
          stroke="#002730"
          fillOpacity={1}
          fill="url(#colorUv)"
        />

        <XAxis
          dataKey="date"
          tickFormatter={xAxixTickFormatter}
          minTickGap={48}
        />
        <YAxis
          dataKey="price"
          domain={["dataMin", "dataMax"]}
          tickCount={10}
          tickFormatter={(value) => `$${value}`}
          scale="linear"
        />
        <Tooltip />
        <Brush
          dataKey="date"
          height={30}
          stroke="#007070"
          tickFormatter={brushTickFormatter}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default Rechart;
