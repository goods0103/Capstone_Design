import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link, useLocation} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "./category.module.css"
import CategoryBar from "../category/CategoryBar";

function InsertCategoryBottleNeck() {
    const [bottleNeck, setBottleNeck] = useState([]);
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const gpu = searchParams.get('gpu');
    const cpu = searchParams.get('cpu');
    const [data, setData] = useState([]);
    const [bottleNeckCpu, setBottleNeckCpu] = useState([]);
    const [bottleNeckGpu, setBottleNeckGpu] = useState([]);
    const postData = {
        cpuName: cpu,
        gpuName: gpu
    };

    useEffect(() => {
        axios.post("/selectedBottleNeck", postData)
            .then(response => {
                setBottleNeck(response.data);
                const newData = [
                    { name: response.data.cpuInfo, bottleneck: response.data.cpuBottleNeckValue },
                    { name: response.data.gpuInfo, bottleneck: response.data.gpuBottleNeckValue },
                ];
                setData(newData);
                if (response.data.cpuBottleNeckValue >  response.data.gpuBottleNeckValue){
                    console.log("cpu 100");
                        axios.post("/recommendCpu",  response.data.cpuInfo )
                            .then(response => {
                                console.log(response.data); // 서버로부터 받은 데이터를 콘솔에 출력한다.
                                setBottleNeckGpu(response.data);
                            })
                            .catch(error => {
                                console.log(error);
                            });
                } else if (response.data.cpuBottleNeckValue <  response.data.gpuBottleNeckValue) {
                    console.log("gpu 100");
                    axios.post("/recommendGpu",  response.data.gpuInfo )
                        .then(response => {
                            setBottleNeckCpu(response.data)
                            console.log(response.data); // 서버로부터 받은 데이터를 콘솔에 출력한다.
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

    return(
        <>
            <CategoryBar></CategoryBar>
            <div className={styles.Chart}>
            <div className={styles.barChart}>
                <p> 프로세서 {bottleNeck.cpuInfo}가 {bottleNeck.cpuBottleNeckValue}% 활용되고 그래픽 카드 {bottleNeck.gpuInfo}가 {bottleNeck.gpuBottleNeckValue}% 활용됩니다. </p>
              <BarChart width={500} height={700} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="bottleneck" fill="#8884d8" />
            </BarChart>
            </div>
            <div className={styles.CircularChart}>
                <CircularProgressbar value={Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)} text={`${Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}%`} />
                <p>{Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}%의 병목 현상이 있습니다.</p>
            </div>
                <div>
                        {bottleNeck.cpuBottleNeckValue > bottleNeck.gpuBottleNeckValue && Math.abs(bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue) > 5 &&
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
                                {(bottleNeckGpu.map((gpu)=> (
                                <tr>
                                    <td>
                                        {gpu.gpuInfo}
                                    </td>
                                    <td>
                                        {Math.abs(gpu.cpuBottleNeckValue-gpu.gpuBottleNeckValue)}%
                                    </td>
                                </tr>
                                )))}
                            </table>
                            }

                    {bottleNeck.cpuBottleNeckValue < bottleNeck.gpuBottleNeckValue && Math.abs(bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue) > 5 &&
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
                            {(bottleNeckGpu.map((cpu)=> (
                                <tr>
                                    <td>
                                        {cpu.cpuInfo}
                                    </td>
                                    <td>
                                        {Math.abs(cpu.cpuBottleNeckValue-cpu.gpuBottleNeckValue)}%
                                    </td>
                                </tr>
                            )))}
                        </table>
                    }
                    { Math.abs(bottleNeck.cpuBottleNeckValue - bottleNeck.gpuBottleNeckValue) <= 5 &&
                        <table>
                            <tr>
                                5 % 이하의 병목률은 병목 현상을 크게 신경 쓰지 않아도 됩니다.
                            </tr>
                        </table>
                    }
                </div>
            </div>
        </>
    );
}


export default InsertCategoryBottleNeck;