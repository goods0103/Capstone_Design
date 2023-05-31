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
    const [name, setName] = useState("");
    const [otherName, setOtherName] = useState("");
    const [flag, setFlag] = useState(1);
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
                    {type: 'GPU', name: response.data.gpuInfo, bottleneck: parseFloat((response.data.gpuBottleNeckValue/10).toFixed(2))},
                    {type: 'CPU', name: response.data.cpuInfo, bottleneck: parseFloat((response.data.cpuBottleNeckValue/10).toFixed(2))},
                ];
                setData(newData);
                if (response.data.cpuBottleNeckValue > response.data.gpuBottleNeckValue) {
                    setName(response.data.cpuInfo);
                    setOtherName(response.data.gpuInfo);
                    setFlag(2);
                    axios.post("/recommendGpu", response.data.gpuInfo)
                        .then(response => {
                            setBottleNeckCpu(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });

                    axios.post("/bottleneck_info", response.data.gpuInfo)
                        .then(response => {
                            setAllBottleNeck(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else if (response.data.cpuBottleNeckValue < response.data.gpuBottleNeckValue) {
                    setName(response.data.gpuInfo);
                    setOtherName(response.data.cpuInfo);
                    setFlag(1);
                    axios.post("/recommendCpu", response.data.cpuInfo)
                        .then(response => {
                            setBottleNeckGpu(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                    axios.post("/bottleneck_info2", response.data.cpuInfo)
                        .then(response => {
                            setAllBottleNeck(response.data);
                        })
                        .catch(error => {
                            console.log(error);
                        });
                } else {
                    setFlag(3);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        if (allBottleNeck.length === 0) {
            setFlag(3);
        }
    },[allBottleNeck]);

    return (
        <>
            <div className={styles.bigFrame}>
                <div className={styles.bottleNeckResult}>
                    <div className={styles.bottleNeckResultDiv}>
                        <p className={styles.bottleNeckTitle}>CALCULATOR RESULT</p>
                        {parseFloat(((bottleNeck.cpuBottleNeckValue)/10).toFixed(2)) - parseFloat(((bottleNeck.gpuBottleNeckValue)/10).toFixed(2)) > 5 && (
                            <p> 작업을 실행할 때 {bottleNeck.cpuInfo}는 <br/>{bottleNeck.gpuInfo}에 비해 <strong
                                style={{color: "red"}}>약합니다</strong>.</p>
                        )}
                        {parseFloat(((bottleNeck.gpuBottleNeckValue)/10).toFixed(2)) - parseFloat(((bottleNeck.cpuBottleNeckValue)/10).toFixed(2)) > 5 && (
                            <p> 작업을 실행할 때 {bottleNeck.gpuInfo}는 <br/>{bottleNeck.cpuInfo}에 비해 <strong
                                style={{color: "red"}}>약합니다</strong>.</p>
                        )}
                        {Math.abs(parseFloat(((bottleNeck.gpuBottleNeckValue)/10).toFixed(2)) - parseFloat(((bottleNeck.cpuBottleNeckValue)/10).toFixed(2))) <= 5 && (
                            <p> 작업을 실행할 때 {bottleNeck.cpuInfo} 및 {bottleNeck.gpuInfo}는 <br/><strong
                                style={{color: "#116B2A"}}>잘 작동합니다</strong>.</p>
                        )}
                        <p style={{marginBottom: 0}}>
                            이 구성에서는 <strong
                                style={{color: "#116B2A"}}>{Math.abs(parseFloat(((bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue)/10).toFixed(2)))}%</strong>의 프로세스 병목
                            현상이 있습니다.</p>
                        <p>5% 미만의 병목 현상은 고려하지 않아도 됩니다.</p>
                    </div>
                    <div className={styles.circular}>

                        <CircularProgressbar
                            value={Math.abs(parseFloat(((bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue)/10).toFixed(2)))}
                            text={`${Math.abs(parseFloat(((bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue)/10).toFixed(2)))}%`}
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
                    <ChartBar data={data}/>
                    <p className={styles.chartResult}>작업을 실행할 때 <strong
                        style={{color: "red"}}>{bottleNeck.cpuInfo}</strong>는 <strong
                        style={{color: "#116B2A"}}>{parseFloat(((bottleNeck.cpuBottleNeckValue)/10).toFixed(2))}%</strong>로
                        활용되고 <strong
                            style={{color: "red"}}>{bottleNeck.gpuInfo}</strong>는 <strong
                            style={{color: "#116B2A"}}>{parseFloat(((bottleNeck.gpuBottleNeckValue)/10).toFixed(2))}%</strong>로
                        활용됩니다.</p>
                </div>


                    { flag!==3 && parseFloat(((bottleNeck.cpuBottleNeckValue)/10).toFixed(2)) < parseFloat(((bottleNeck.gpuBottleNeckValue)/10).toFixed(2))
                        && Math.abs(parseFloat(((bottleNeck.cpuBottleNeckValue)/10).toFixed(2)) - parseFloat(((bottleNeck.gpuBottleNeckValue)/10).toFixed(2))) > 5 &&
                        <div className={styles.bottleNeckTable}>
                            <p className={styles.title}>Solution</p>
                            <p className={styles.semiTitle}>프로세서를 다운그레이드하거나 그래픽 카드를 업그레이드하여 이 문제를 해결할 수 있습니다.<br/>
                                프로세서를 다운그레이드하는 것은 별 의미가 없으며 이 경우 현재 프로세서를 컴퓨터에 그대로 두는 것이 좋습니다.<br/>
                                다음은 {bottleNeck.cpuInfo}와 5%미만의 병목률을 보여주는 GPU 중 인기있는 제품들입니다</p>
                            <hr/>
                            <div className="table-container">
                                <table className={styles.table}>
                                    <tr>
                                        <td className={styles.tableTd}>
                                            <strong>추천 GPU</strong>
                                        </td>
                                        <td className={styles.tableTd2}>
                                            <strong>병목률</strong>
                                        </td>
                                    </tr>
                                    {(bottleNeckGpu.map((gpu) => (
                                        <tr>
                                            <td className={styles.tableTd}>
                                                {gpu.gpuInfo}
                                            </td>
                                            <td className={styles.tableTd2}>
                                                {Math.abs(parseFloat(((gpu.cpuBottleNeckValue - gpu.gpuBottleNeckValue)/10).toFixed(2)))}%
                                            </td>
                                        </tr>
                                    )))}
                                </table>
                            </div>
                        </div>
                    }

                    { flag!==3 && parseFloat(((bottleNeck.cpuBottleNeckValue)/10).toFixed(2)) > parseFloat(((bottleNeck.gpuBottleNeckValue)/10).toFixed(2))
                        && Math.abs(parseFloat(((bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue)/10).toFixed(2))) > 5 &&
                        <div className={styles.bottleNeckTable}>
                            <p className={styles.title}>Solution</p>
                            <p className={styles.semiTitle}>프로세서를 업그레이드하거나 그래픽 카드를 다운그레이드하여 이 문제를 해결할 수 있습니다.<br/>
                                그래픽 카드를 다운그레이드하는 것은 별 의미가 없으며 이 경우 현재 그래픽 카드를 컴퓨터에 그대로 두는 것이 좋습니다.<br/>
                                다음은 {bottleNeck.gpuInfo}와 5%미만의 병목률을 보여주는 CPU 중 인기있는 제품들입니다</p>
                            <hr/>
                            <div className="table-container">
                        <table className={styles.table}>
                            <tr>
                                <td className={styles.tableTd}>
                                    <strong>&emsp;추천 CPU</strong>
                                </td>
                                <td className={styles.tableTd2}>
                                    <strong>병목률</strong>
                                </td>
                            </tr>
                            {(bottleNeckCpu.map((cpu) => (
                                <tr>
                                    <td className={styles.tableTd}>
                                        {cpu.cpuInfo}
                                    </td>
                                    <td className={styles.tableTd2}>
                                        {Math.abs(parseFloat(((cpu.cpuBottleNeckValue - cpu.gpuBottleNeckValue)/10).toFixed(2)))}%
                                    </td>
                                </tr>
                            )))}
                        </table>
                            </div>
                        </div>
                    }

                {flag === 1 && (
                    <div className={styles.lineChart}>
                        <p className={styles.title}><strong>{otherName}</strong>와 가장 잘 작동하는 그래픽카드</p>
                        <p>아래 차트는 작업을 위한 <strong style={{color: "red"}}>{otherName}</strong> 프로세서의 병목 현상 계산에서 그래픽카드 벤치 마크 점수에 대한 의존성을 보여줍니다.</p>
                        <ChartLine data={allBottleNeck} name={name}/>
                    </div>
                )}

                {flag === 2 && (
                    <div className={styles.lineChart}>
                        <p className={styles.title}><strong>{otherName}</strong>와 가장 잘 작동하는 프로세서</p>
                        <p>아래 차트는 작업을 위한 <strong style={{color: "red"}}>{otherName}</strong> 그래픽 카드의 병목 현상 계산에서 프로세서 벤치 마크 점수에 대한 의존성을 보여줍니다.</p>
                        <ChartLine data={allBottleNeck} name={name}/>
                    </div>
                )}
            </div>
        </>
    );
}


export default InsertCategoryBottleNeck;