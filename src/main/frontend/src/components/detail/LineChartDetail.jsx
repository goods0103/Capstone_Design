import React, { PureComponent } from 'react';
import {
    BarChart,
    Bar,
    Brush,
    ReferenceLine,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';
import {Background} from "victory";

// const data = [
//     { name: 0, pv: 456, pv2: 456 },
//     { name: 1000, pv: 230, pv2: 230 },
//     { name: 2000, pv: 345, pv2: 345 },
//     { name: 2000, pv: 450 },
//     { name: 2000, pv: 321 },
//     { name: 2000, pv: 235 },
//     { name: 2000, pv: 267 },
//     { name: 2000, pv: -378 },
//     { name: 2000, pv: -210},
//     { name: 2000, pv: -23},
//     { name: '1만', pv: 45 },
//     { name: 2000, pv: 90 },
//     { name: 2000, pv: 130 },
//     { name: 2000, pv: 11 },
//     { name: 2000, pv: 107 },
//     { name: 2000, pv: 926 },
//     { name: 2000, pv: 653 },
//     { name: 2000, pv: 366 },
//     { name: 2000, pv: 486 },
//     { name: 2000, pv: 486 },
//     { name: '2만', pv: 512 },
//     { name: 2000, pv: 302 },
//     { name: 2000, pv: 425 },
//     { name: 2000, pv: 467 },
//     { name: 2000, pv: -190 },
//     { name: 2000, pv: 194 },
//     { name: 2000, pv: 371 },
//     { name: 2000, pv: 376 },
//     { name: 2000, pv: 295 },
//     { name: 2000, pv: 322 },
//     { name: '3만', pv: 246 },
//     { name: 2000, pv: 33 },
//     { name: 2000, pv: 354 },
//     { name: 2000, pv: 258 },
//     { name: 2000, pv: 359 },
//     { name: 2000, pv: 192 },
//     { name: 2000, pv: 464 },
//     { name: 2000, pv: -2 },
//     { name: 2000, pv: 154 },
//     { name: 2000, pv: 186 },
//     { name: '4만', pv: 86 },
//     { name: 2000, pv: 136 },
//     { name: 2000, pv: 126 },
//     { name: 2000, pv: 26 },
//     { name: 2000, pv: 20 },
//     { name: 2000, pv: 36 },
//     { name: 2000, pv: 736 },
//     { name: 2000, pv: 126 },
//     { name: 2000, pv: 236 },
//     { name: 2000, pv: 126 },
//     { name: '5만', pv: 456 },
//     { name: 2000, pv: 230 },
//     { name: 2000, pv: 345 },
//     { name: 2000, pv: 450 },
//     { name: 2000, pv: 321 },
//     { name: 2000, pv: 235 },
//     { name: 2000, pv: 267 },
//     { name: 2000, pv: -378 },
//     { name: 2000, pv: -210 },
//     { name: 2000, pv: -23 },
//     { name: '6만', pv: 45 },
//     { name: 2000, pv: 90 },
//     { name: 2000, pv: 130 },
//     { name: 2000, pv: 11 },
//     { name: 2000, pv: 107, pv2: 107 },
//     { name: 2000, pv: 926 },
//     { name: 2000, pv: 653 },
//     { name: 2000, pv: 366 },
//     { name: 2000, pv: 486 },
//     { name: 2000, pv: 512 },
//     { name: '7만', pv: 302 },
//     { name: 2000, pv: 425 },
//     { name: 2000, pv: 467 },
//     { name: 2000, pv: -190 },
//     { name: 2000, pv: 194 },
//     { name: 2000, pv: 371 },
//     { name: 2000, pv: 376 },
//     { name: 2000, pv: 295 },
//     { name: 2000, pv: 322 },
//     { name: 2000, pv: 246 },
//     { name: '8만', pv: 33},
//     { name: '', pv: 354 },
//     { name: '', pv: 258 },
//     { name: '', pv: 359 },
//     { name: '', pv: 192 },
//     { name: '', pv: 464 },
//     { name: '', pv: -2 },
//     { name: '', pv: 154 },
//     { name: '', pv: 186 },
//     { name: '', pv: 36 },
//     { name: '9만', pv: 116 },
//     { name: '', pv: 156 },
//     { name: '', pv: 126 },
//     { name: '', pv: 16 },
//     { name: '', pv: 86 },
//     { name: '', pv: 416 },
//     { name: '', pv: 646 },
//     { name: '', pv: 112 },
//     { name: 1000, pv: 184 },
//     { name: '10만', pv: 124 },
//
// ];

export default class LineChartDetail extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/bar-chart-with-brush-ghsz3';

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.chartData}
                    // data={data}
                    // margin={{
                    //     top: 5,
                    //     right: 30,
                    //     left: 20,
                    //     bottom: 5,
                    // }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip contentStyle={{ width: '150px', height: '100px' }}/>
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={10} stroke="#8884d8" />
                    <Bar dataKey="benchMark" fill="#8884d8" shape={(props) => (
                        <rect
                            {...props}
                            width={5}
                        />
                    )}/>
                    <Bar dataKey="myBenchMark" fill="#82ca9d" shape={(props) => (
                        <rect
                            {...props}
                            width={10}
                            fill="#151515" // 바의 색상을 빨간색으로 변경
                            x={props.x - 10} // X축으로 10만큼 이동
                            // y={props.y - 100}
                            stroke="#ff0000"
                            strokeWidth={3}
                        />
                    )}/>
                    {/*<Bar dataKey="pv" fill="#8884d8" shape={(props) => (*/}
                    {/*    <rect*/}
                    {/*        {...props}*/}
                    {/*        width={5}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {/*/>*/}
                    {/*<Bar dataKey="pv2" fill="#82ca9d" shape={(props) => (*/}
                    {/*    <rect*/}
                    {/*        {...props}*/}
                    {/*        width={10}*/}
                    {/*        fill="#ff0000" // 바의 색상을 빨간색으로 변경*/}
                    {/*        x={props.x - 10} // X축으로 10만큼 이동*/}
                    {/*        // y={props.y - 100}*/}
                    {/*        stroke="#151515"*/}
                    {/*        strokeWidth={3}*/}
                    {/*    />*/}
                    {/*)}*/}
                    {/*/>*/}
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
