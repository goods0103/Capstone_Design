import React from "react";
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';
import styles from "./category.module.css"



const ChartLine = ({data, name}) => {
    const processedData = data.map((item) => ({
        ...item,
        isLowBottleNeck: item.bottleNeckDiff <= 5,
        isMatched: item.info === name,
    }));
    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className={styles.customTooltip}>
                    <p className="info">{`name: ${payload[0].payload.info}`}</p>
                    <p className="label">{`병목률: ${payload[0].value}%`}</p>
                </div>
            );
        }

        return null;
    };
    console.log(name);
    console.log(processedData);
    return (
        <LineChart
            width={1000}
            height={500}
            data={processedData}
            margin={{
                top: 5, right: 30, left: 20, bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="mark" />
            <YAxis dataKey="bottleNeckDiff" />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="bottleNeckDiff" stroke="#82ca9d"
                  dot={(props) => {
                        if (props.payload && props.payload.isMatched) {
                            return <circle cx={props.cx} cy={props.cy} r={4} fill="#F05650" strokeWidth={2}/>;
                        }
                        else if (props.payload && props.payload.isLowBottleNeck) {
                          return <circle cx={props.cx} cy={props.cy} r={4} fill="#82ca9d" strokeWidth={2} />;
                        }
                        else{
                          return null;
                        }
                  }}
            />
        </LineChart>
    );
};


export default ChartLine;