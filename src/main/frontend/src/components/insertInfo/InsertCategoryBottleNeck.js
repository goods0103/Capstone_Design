import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
import {buildStyles, CircularProgressbar} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "./category.module.css"
import CategoryBar from "../category/CategoryBar";
import ChartBar from "./ChartBar";
import ChartLine from "./ChartLine";


function InsertCategoryBottleNeck() {
    const [bottleNeck, setBottleNeck] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const gpu = searchParams.get('gpu');
    const cpu = searchParams.get('cpu');
    const [data, setData] = useState([]);
    const [bottleNeckCpu, setBottleNeckCpu] = useState([]);
    const [bottleNeckGpu, setBottleNeckGpu] = useState([]);
    const [allBottleNeck, setAllBottleNeck] = useState([]);
    const postData = {
        cpuName: cpu,
        gpuName: gpu
    };

    useEffect(() => {
        document.body.style.backgroundColor = '#F0F6F8';
        document.body.style.color = "black";
        return () => {
            document.body.style.backgroundColor = '#151515';
            document.body.style.color = "white";
        };
    }, []);


    useEffect(() => {
        axios.post("/selectedBottleNeck", postData)
            .then(response => {
                setBottleNeck(response.data);
                const newData = [
                    {type: 'cpu', name: response.data.cpuInfo, bottleneck: response.data.cpuBottleNeckValue},
                    {type: 'gpu', name: response.data.gpuInfo, bottleneck: response.data.gpuBottleNeckValue},
                ];
                setData(newData);
                if (response.data.cpuBottleNeckValue > response.data.gpuBottleNeckValue) {
                    console.log("cpu 100");
                    axios.post("/recommendGpu", response.data.gpuInfo)
                        .then(response => {
                            setBottleNeckCpu(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });

                    axios.post("/bottleneck_info", response.data.gpuInfo)
                        .then(response => {
                            console.log(response.data); // 서버로부터 받은 데이터를 콘솔에 출력한다.
                            setAllBottleNeck(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else if (response.data.cpuBottleNeckValue < response.data.gpuBottleNeckValue) {
                    console.log("gpu 100");
                    axios.post("/recommendCpu", response.data.cpuInfo)
                        .then(response => {
                            setBottleNeckGpu(response.data)
                            console.log(response.data); // 서버로부터 받은 데이터를 콘솔에 출력한다.
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    axios.post("/bottleneck_info2", response.data.cpuInfo)
                        .then(response => {
                            console.log(response.data); // 서버로부터 받은 데이터를 콘솔에 출력한다.
                            setAllBottleNeck(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    console.log("same");
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <>
            <div>
                <div className={styles.bottleNeckResult}>
                    <div>
                    <p className={styles.bottleNeckTitle}>CALCULATOR RESULT</p>
                    {bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue>5 &&(
                        <p> 작업을 실행할 때 {bottleNeck.cpuInfo}는 {bottleNeck.gpuInfo}에 비해 약합니다.</p>
                    )}
                    {bottleNeck.gpuBottleNeckValue-bottleNeck.cpuBottleNeckValue>5 &&(
                        <p> 작업을 실행할 때 {bottleNeck.gpuInfo}는 {bottleNeck.cpuInfo}에 비해 약합니다.</p>
                    )}
                    { Math.abs(bottleNeck.gpuBottleNeckValue-bottleNeck.cpuBottleNeckValue)<=5 &&(
                        <p> 작업을 실행할 때 {bottleNeck.cpuInfo} 및 {bottleNeck.gpuInfo}는 잘 작동합니다.</p>
                    )}
                    <p style={{marginBottom:0}}>이 구성에서는 {Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}%의 프로세스 병목 현상이 있습니다.</p>
                    <p>5% 미만의 병목 현상은 고려하지 않아도 됩니다.</p>
                    </div>
                    <div className={styles.circular}>

                        <CircularProgressbar
                            value={Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}
                            text={`${Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}%`}
                            circleRatio={0.5}
                            arcSweepAngle={180}
                            styles={buildStyles({
                                rotation: 1 / 2 + 1 / 4,
                                strokeLinecap: "butt",
                                trailColor: "#eee"
                            })}
                        />
                    </div>
                </div>
                    <div className={styles.chart}>
                        <p className={styles.chartTitle}>{bottleNeck.cpuInfo} & {bottleNeck.gpuInfo} Bottleneck</p>
                        <ChartBar data={data} />
                        <p className={styles.chartResult}>작업을 실행할 때 <strong style={{ color: "red" }}>{bottleNeck.cpuInfo}</strong>는 {bottleNeck.cpuBottleNeckValue}%로 활용되고 <strong style={{ color: "red" }}>{bottleNeck.gpuInfo}</strong>는 {bottleNeck.gpuBottleNeckValue}%로 활용됩니다.</p>
                    </div>
                <div className={styles.bottleNeckTable}>
                            {bottleNeck.cpuBottleNeckValue < bottleNeck.gpuBottleNeckValue && Math.abs(bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue) > 5 &&
                                <table>
                                    <tr>
                                        cpu를 100% 활용하기 위해선 그래픽카드를 업그레이드를 해야합니다
                                    </tr>
                                    <tr>
                                        <td>
                                            추천 gpu
                                        </td>
                                        <td>
                                            병목 현상 퍼센트
                                        </td>
                                    </tr>
                                    {(bottleNeckGpu.map((gpu) => (
                                        <tr>
                                            <td>
                                                {gpu.gpuInfo}
                                            </td>
                                            <td>
                                                {Math.abs(gpu.cpuBottleNeckValue - gpu.gpuBottleNeckValue)}%
                                            </td>
                                        </tr>
                                    )))}
                                </table>
                            }

                            {bottleNeck.cpuBottleNeckValue > bottleNeck.gpuBottleNeckValue && Math.abs(bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue) > 5 &&
                                <table>
                                    <tr>
                                        그래픽 카드를 100% 활용하기 위해선 cpu를 업그레이드를 해야합니다
                                    </tr>
                                    <tr>
                                        <td>
                                            추천 cpu
                                        </td>
                                        <td>
                                            병목 현상 퍼센트
                                        </td>
                                    </tr>
                                    {(bottleNeckCpu.map((cpu) => (
                                        <tr>
                                            <td>
                                                {cpu.cpuInfo}
                                            </td>
                                            <td>
                                                {Math.abs(cpu.cpuBottleNeckValue - cpu.gpuBottleNeckValue)}%
                                            </td>
                                        </tr>
                                    )))}
                                </table>
                            }
                </div>
                <div className={styles.lineChart}>
                    <ChartLine data={allBottleNeck} />
                </div>
            </div>
        </>
    );
}


export default InsertCategoryBottleNeck;