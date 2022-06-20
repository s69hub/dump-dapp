import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Brush,
  AreaChart,
  Area,
  ResponsiveContainer
} from "recharts";

const API = axios.create({
  baseURL: process.env.REACT_APP_DUMP_PRICE_API,
});


function Rechart() {
  const [chartData, setChartData] = useState([]);

  const fetchChartData = () => {
    API.get("/price").then((res) => {
      setChartData(res.data);
      console.log(res.data);
    });
  };

  const xAxixTickFormatter = (tick) => {
    return new Date(tick).toLocaleDateString();
  };

  const brushTickFormatter = (tick) => {
    return new Date(tick).toLocaleString();
  };


  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <Container className="mt-5">
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
          </defs>
          <Area
            type="monotone"
            dataKey="price"
            stroke="#8884d8"
            fillOpacity={1}
            fill="url(#colorUv)"
          />

          <XAxis
            dataKey="date"
            
            tickFormatter={xAxixTickFormatter}
          />
          <YAxis dataKey="price" domain={[1.187, "auto"]} tickCount={25} />
          <Tooltip/>
          <Brush
            dataKey="date"
            height={30}
            stroke="#8884d8"
            tickFormatter={brushTickFormatter}
          />
          <CartesianGrid strokeDasharray="3 3" />
        </AreaChart>
      </ResponsiveContainer>
    </Container>
  );
}

export default Rechart;
