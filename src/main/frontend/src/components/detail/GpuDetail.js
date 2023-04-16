import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "./detail.module.css";


function GpuDetail() {

    const [gpuValue, setGpuValue] = useState([]);
    const [gpuRank, setGpuRank] = useState([]);
    const [gpuPopular, setGpuPopular] = useState([]);

    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];


    useEffect(() => {
        axios.post('/gpuValue', { lastPart })
            .then(response => {
                setGpuValue(response.data);
            })
            .finally()
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/gpuRank', { lastPart })
            .then(response => {
                setGpuRank(response.data);
            })
            .finally()
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/gpuPopular', { lastPart })
            .then(response => {
                setGpuPopular(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <>
            <Link to={`/gpuCompare/?id=${lastPart}`}><button>비교하기</button></Link>
            <div>
                <p>
                    Class: Desktop                Socket: AM4 <br/>

                    Clockspeed: 3.7 GHz           Turbo Speed: 4.6 GHz<br/>

                    Cores: 6 Threads: 12          Typical TDP: 65 W<br/>

                    Cache Size: L1: 384 KB, L2: 3.0 MB, L3: 32 MB<br/>

                    Other names: AMD Ryzen 5 5600X 6-Core Processor<br/>

                    CPU First Seen on Charts: Q4 2020<br/>

                    CPUmark/$Price: 136.81<br/>

                    Overall Rank: 328<br/>

                    Last Price Change: $160.44 USD (2023-04-10) <br/>
                </p>
            </div>
            <div>
                <h3>similar rank</h3>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>image</th>
                        <th className={styles.cssTh}>name</th>
                        <th className={styles.cssTh}>mark</th>
                        <th className={styles.cssTh}>rank</th>
                    </tr>
                    {gpuRank.map((gpu) => (
                        gpu.gpuId == lastPart  && (
                            <tr>
                                <td className={styles.redBorder}><img src="" alt="gpu_image" className={styles.tableImg}/></td>
                                <td className={styles.redBorder}>{gpu.gpuName}</td>
                                <td className={styles.redBorder}>{gpu.gpuMark}</td>
                                <td className={styles.redBorder}>{gpu.gpuRank}</td>
                            </tr>
                        )))}
                    {gpuRank.map((gpu) => (
                        gpu.gpuId != lastPart  && (
                            <tr>
                                <td className={styles.cssTd}><img src="" alt="gpu_image" className={styles.tableImg}/></td>
                                <td className={styles.cssTd}>{gpu.gpuName}</td>
                                <td className={styles.cssTd}>{gpu.gpuMark}</td>
                                <td className={styles.cssTd}>{gpu.gpuRank}</td>
                            </tr>
                        )))}
                </table>
            </div>
            {gpuValue.length > 1 && (
                <div>
                    <h3>similar value</h3>
                    <table className={styles.cssTable}>
                        <tr>
                            <th className={styles.cssTh}>image</th>
                            <th className={styles.cssTh}>name</th>
                            <th className={styles.cssTh}>mark</th>
                            <th className={styles.cssTh}>value</th>
                        </tr>
                        {gpuValue.map((gpu) => (
                            gpu.gpuId == lastPart  &&(
                                <tr>
                                    <td className={styles.redBorder}><img src="" alt="gpu_image" className={styles.tableImg}/></td>
                                    <td className={styles.redBorder}>{gpu.gpuName}</td>
                                    <td className={styles.redBorder}>{gpu.gpuMark}</td>
                                    <td className={styles.redBorder}>{gpu.gpuValue}</td>
                                </tr>
                            )))}
                        {gpuValue.map((gpu) => (
                            gpu.gpuId != lastPart  &&(
                                <tr>
                                    <td className={styles.cssTd}><img src="" alt="gpu_image" className={styles.tableImg}/></td>
                                    <td className={styles.cssTd}>{gpu.gpuName}</td>
                                    <td className={styles.cssTd}>{gpu.gpuMark}</td>
                                    <td className={styles.cssTd}>{gpu.gpuValue}</td>
                                </tr>
                            )))}
                    </table>
                </div>
            )}
            <div>
                <h3>유명</h3>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>image</th>
                        <th className={styles.cssTh}>name</th>
                        <th className={styles.cssTh}>rank</th>
                        <th className={styles.cssTh}>price</th>
                    </tr>
                    {gpuPopular.map((gpu) => (
                        gpu.gpuId == lastPart  &&(
                            <tr>
                                <td className={styles.redBorder}><img src="" alt="gpu_image" className={styles.tableImg}/></td>
                                <td className={styles.redBorder}>{gpu.gpuName}</td>
                                <td className={styles.redBorder}>{gpu.gpuRank}</td>
                                <td className={styles.redBorder}>{gpu.gpuPrice}</td>
                            </tr>
                        )))}
                    {gpuPopular.map((gpu) => (
                        gpu.gpuId != lastPart  &&(
                            <tr>
                                <td className={styles.cssTd}><img src="" alt="gpu_image" className={styles.tableImg}/></td>
                                <td className={styles.cssTd}>{gpu.gpuName}</td>
                                <td className={styles.cssTd}>{gpu.gpuRank}</td>
                                <td className={styles.cssTd}>{gpu.gpuPrice}</td>
                            </tr>
                        )))}
                </table>
            </div>

        </>
    );
}


export default GpuDetail;