import React from "react";
import { VictoryBar, VictoryChart, VictoryAxis, VictoryLabel, VictoryTooltip, VictoryTheme } from "victory";



const ChartBar = ({data}) => {
    return (
        <VictoryChart
            domainPadding={50}
            height={200}
            horizontal // 수평 막대 그래프로 설정
        >
            <VictoryAxis
                dependentAxis
                style={{
                    axisLabel: { padding: 40 },
                    tickLabels: { padding: 3 }
                }}
            />
            <VictoryAxis
                tickFormat={(tick) => tick}
                style={{
                    axisLabel: { padding: 10 },
                    tickLabels: { padding: 5 }
                }}

            />
            <VictoryBar
                data={data}
                y="bottleneck"
                x="type"
                labels={({ datum }) => datum.bottleneck}
                labelComponent={<VictoryLabel dy={-10} style={{ fontSize: 1 }} />} // 폰트 크기 조절
                style={{
                    data: { fill: "#88D4F4" }
                }}
                animate={{
                    duration: 1000,
                    onLoad: { duration: 1000 }
                }}
                barWidth={20}
                events={[
                    {
                        target: "data",
                        eventHandlers: {
                            onMouseOver: () => {
                                return [
                                    { target: "labels", mutation: () => ({ active: true }) },
                                    { target: "data", mutation: () => ({ style: { fill: "#F48888" } }) }
                                ];
                            },
                            onMouseOut: () => {
                                return [
                                    { target: "labels", mutation: () => ({ active: false }) },
                                    { target: "data", mutation: () => ({ style: { fill: "#88D4F4" } }) }
                                ];
                            }
                        }
                    }
                ]}
                labelComponent={<VictoryTooltip />}
            />
        </VictoryChart>
    );
};


export default ChartBar;