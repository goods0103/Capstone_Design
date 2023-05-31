import React, {PureComponent} from 'react';
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

export default class LineChartDetail extends PureComponent {

    static demoUrl = 'https://codesandbox.io/s/bar-chart-with-brush-ghsz3';

    render() {
        return (
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    width={500}
                    height={300}
                    data={this.props.chartData}
                >
                    <CartesianGrid strokeDasharray="3 3"/>
                    <XAxis dataKey="name"/>
                    <YAxis/>
                    <Tooltip contentStyle={{width: '250px', height: '100px'}}/>
                    <Legend verticalAlign="top" wrapperStyle={{lineHeight: '40px'}}/>
                    <ReferenceLine y={0} stroke="#000"/>
                    <Brush dataKey="name" height={10} stroke="#8884d8"/>
                    <Bar dataKey="benchMark" fill="#8884d8" shape={(props) => (
                        <rect
                            {...props}
                            width={5}
                        />
                    )}/>
                    <Bar dataKey="myBenchMark" fill="#ff0000" shape={(props) => (
                        <rect
                            {...props}
                            width={8}
                            fill="#151515" // 바의 색상을 빨간색으로 변경
                            x={props.x - 8} // X축으로 10만큼 이동
                            // y={props.y - 100}
                            stroke="#ff0000"
                            strokeWidth={3}
                        />
                    )}/>
                </BarChart>
            </ResponsiveContainer>
        );
    }
}
