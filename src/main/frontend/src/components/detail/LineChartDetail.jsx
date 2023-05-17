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

const data = [
    { name: 0, pv: 456, isMine: true },
    { name: 1000, pv: 230, isMine: true },
    { name: '', pv: 345, isMine: false },
    { name: '', pv: 450, isMine: true },
    { name: '', pv: 321, isMine: false },
    { name: '', pv: 235, isMine: true },
    { name: '', pv: 267, isMine: false },
    { name: '', pv: -378, isMine: true },
    { name: '', pv: -210},
    { name: '', pv: -23},
    { name: '1만', pv: 45 },
    { name: '', pv: 90 },
    { name: '', pv: 130 },
    { name: '', pv: 11 },
    { name: '', pv: 107 },
    { name: '', pv: 926 },
    { name: '', pv: 653 },
    { name: '', pv: 366 },
    { name: '', pv: 486 },
    { name: '', pv: 486 },
    { name: '2만', pv: 512 },
    { name: '', pv: 302 },
    { name: '', pv: 425 },
    { name: '', pv: 467 },
    { name: '', pv: -190 },
    { name: '', pv: 194 },
    { name: '', pv: 371 },
    { name: '', pv: 376 },
    { name: '', pv: 295 },
    { name: '', pv: 322 },
    { name: '3만', pv: 246 },
    { name: '', pv: 33 },
    { name: '', pv: 354 },
    { name: '', pv: 258 },
    { name: '', pv: 359 },
    { name: '', pv: 192 },
    { name: '', pv: 464 },
    { name: '', pv: -2 },
    { name: '', pv: 154 },
    { name: '', pv: 186 },
    { name: '4만', pv: 86 },
    { name: '', pv: 136 },
    { name: '', pv: 126 },
    { name: '', pv: 26 },
    { name: '', pv: 20 },
    { name: '', pv: 36 },
    { name: '', pv: 736 },
    { name: '', pv: 126 },
    { name: '', pv: 236 },
    { name: '', pv: 126 },
    { name: '5만', pv: 456 },
    { name: '', pv: 230 },
    { name: '', pv: 345 },
    { name: '', pv: 450 },
    { name: '', pv: 321 },
    { name: '', pv: 235 },
    { name: '', pv: 267 },
    { name: '', pv: -378 },
    { name: '', pv: -210 },
    { name: '', pv: -23 },
    { name: '6만', pv: 45 },
    { name: '', pv: 90 },
    { name: '', pv: 130 },
    { name: '', pv: 11 },
    { name: '', pv: 107 },
    { name: '', pv: 926 },
    { name: '', pv: 653 },
    { name: '', pv: 366 },
    { name: '', pv: 486 },
    { name: '', pv: 512 },
    { name: '7만', pv: 302 },
    { name: '', pv: 425 },
    { name: '', pv: 467 },
    { name: '', pv: -190 },
    { name: '', pv: 194 },
    { name: '', pv: 371 },
    { name: '', pv: 376 },
    { name: '', pv: 295 },
    { name: '', pv: 322 },
    { name: '', pv: 246 },
    { name: '8만', pv: 33},
    { name: '', pv: 354 },
    { name: '', pv: 258 },
    { name: '', pv: 359 },
    { name: '', pv: 192 },
    { name: '', pv: 464 },
    { name: '', pv: -2 },
    { name: '', pv: 154 },
    { name: '', pv: 186 },
    { name: '', pv: 36 },
    { name: '9만', pv: 116 },
    { name: '', pv: 156 },
    { name: '', pv: 126 },
    { name: '', pv: 16 },
    { name: '', pv: 86 },
    { name: '', pv: 416 },
    { name: '', pv: 646 },
    { name: '', pv: 112 },
    { name: 1000, pv: 184 },
    { name: '10만', pv: 124 },

];

export default class LineChartDetail extends PureComponent {
    static demoUrl = 'https://codesandbox.io/s/bar-chart-with-brush-ghsz3';

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={data}
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
                    <Tooltip />
                    <Legend verticalAlign="top" wrapperStyle={{ lineHeight: '40px' }} />
                    <ReferenceLine y={0} stroke="#000" />
                    <Brush dataKey="name" height={10} stroke="#8884d8" />
                    {/*<Bar dataKey="pv" fill="#8884d8" />*/}
                    <Bar dataKey="pv" fill="#8884d8" />

                </BarChart>
            </ResponsiveContainer>
        );
    }
}
