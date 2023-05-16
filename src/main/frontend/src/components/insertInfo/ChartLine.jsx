import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    {
        name: 'Page A', bottleneck: 30, benchmark: 12400
    },
    {
        name: 'Page B', bottleneck: 40, benchmark: 11398
    },
    {
        name: 'Page C', bottleneck: 50, benchmark: 19800
    },
    {
        name: 'Page D', bottleneck: 80, benchmark: 13908
    },
    {
        name: 'Page E', bottleneck: 90, benchmark: 14800
    },
    {
        name: 'Page F', bottleneck: 100, benchmark: 13800
    },
    {
        name: 'Page G', bottleneck: 35, benchmark: 23800
    },
];
const ChartLine = () => {
    return (
        <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="benchmark" />
            <YAxis/>
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bottleneck" stroke="#8884d8" activeDot={{ r: 8 }} />
        </LineChart>
    );
};


export default ChartLine;