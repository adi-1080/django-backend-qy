import React from 'react';
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Area } from 'recharts';

const MyLineChart = () => {
  const data = [
    { time: '20:00', value: 6070 },
    { time: '20:30', value: 5032 },
    { time: '21:30', value: 2043 },
    { time: '22:30', value: 4399 },
    { time: '23:30', value: 6832 },
    { time: '00:30', value: 4033 },
    { time: '01:00', value: 4003 },
    { time: '01:30', value: 3000 },
    { time: '02:00', value: 2003 },
    { time: '02:30', value: 3045 },
    { time: '03:00', value: 5353 },
    { time: '03:30', value: 4900 },
    { time: '04:00', value: 4343 },
    { time: '04:30', value: 2000 },
  ];

  const chartWidth = window.innerWidth * 0.9;

  return (
    <ComposedChart
      width={chartWidth}
      height={300}
      data={data}
      margin={{ top: 10, right: 30, left: 20, bottom: 5 }}
    >
      <defs>
        <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
          <stop offset="5%" stopColor="#FF0000" stopOpacity={0.15}/>
          <stop offset="95%" stopColor="#FF0000" stopOpacity={0.01}/>
        </linearGradient>
      </defs>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="time" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Area 
        type="monotone"
        dataKey="value"
        fill="url(#colorValue)"
        stroke="none"
        fillOpacity={1}
      />
      <Line 
        type="monotone" 
        dataKey="value" 
        stroke="#FF0000" 
        strokeWidth={2}
        dot={false}
        activeDot={{ r: 8 }} 
      />
    </ComposedChart>
  );
};

export default MyLineChart;