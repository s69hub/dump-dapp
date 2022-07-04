import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
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

const API = axios.create({
  baseURL: process.env.REACT_APP_DUMP_PRICE_API,
});

function Rechart() {
  const [chartData, setChartData] = useState([]);
  const { refresh, setRefresh } = useContext(StateContext);

  const fetchChartData = () => {
    API.get("/price").then((res) => {
      setChartData(res.data);
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
