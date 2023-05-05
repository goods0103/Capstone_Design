import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';

function CpuDetail() {
    const [cpuValue, setCpuValue] = useState([]);
    const [cpuRank, setCpuRank] = useState([]);
    const [cpuPopular, setCpuPopular] = useState([]);
    const [cpuInfo, setCpuInfo] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];

    useEffect(() => {
        axios.post('/cpuValue', { lastPart })
            .then(response => {
                setCpuValue(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/cpuRank', { lastPart })
            .then(response => {
                setCpuRank(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/cpuPopular', { lastPart })
            .then(response => {
                setCpuPopular(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    useEffect(() => {
        axios.post('/find_cpu_details', { lastPart })
            .then(response => {
                setCpuInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <>
            <Link to={`/cpuCompare/?id=${lastPart}`}><button>비교하기</button></Link>
            <div>

                <p>
                    name : {cpuInfo.cpuName} &emsp;
                    class type : {cpuInfo.classType}
                    <br/>
                    socket : {cpuInfo.socket} &emsp;
                    clock : {cpuInfo.clock}
                    <br/>
                    turbo : {cpuInfo.turbo}&emsp;
                    core : {cpuInfo.core}
                    <br/>
                    tdp : {cpuInfo.tdp} &emsp;
                    cache : {cpuInfo.cache}
                    <br/>
                    otherName : {cpuInfo.otherName}
                    <br/>
                    Single Thread Rating : {cpuInfo.str}
                    {/*Class: Desktop                Socket: AM4 <br/>*/}

                    {/*Clockspeed: 3.7 GHz           Turbo Speed: 4.6 GHz<br/>*/}

                    {/*Cores: 6 Threads: 12          Typical TDP: 65 W<br/>*/}

                    {/*Cache Size: L1: 384 KB, L2: 3.0 MB, L3: 32 MB<br/>*/}

                    {/*Other names: AMD Ryzen 5 5600X 6-Core Processor<br/>*/}

                    {/*CPU First Seen on Charts: Q4 2020<br/>*/}

                    {/*CPUmark/$Price: 136.81<br/>*/}

                    {/*Overall Rank: 328<br/>*/}

                    {/*Last Price Change: $160.44 USD (2023-04-10) <br/>*/}
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
                    {cpuRank.map((cpu) => (
                        cpu.cpuId === lastPart  && (
                            <tr>
                                <td className={styles.redBorder}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                <td className={styles.redBorder}>{cpu.cpuName}</td>
                                <td className={styles.redBorder}>{cpu.cpuMark}</td>
                                <td className={styles.redBorder}>{cpu.cpuRank}</td>
                            </tr>
                        )))}
                    {cpuRank.map((cpu) => (
                        cpu.cpuId !== lastPart  && (
                            <tr>
                                <td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                <td className={styles.cssTd}>{cpu.cpuName}</td>
                                <td className={styles.cssTd}>{cpu.cpuMark}</td>
                                <td className={styles.cssTd}>{cpu.cpuRank}</td>
                            </tr>
                        )))}
                </table>
            </div>
            {cpuValue.length > 1 && (
                <div>
                    <h3>similar value</h3>
                    <table className={styles.cssTable}>
                        <tr>
                            <th className={styles.cssTh}>image</th>
                            <th className={styles.cssTh}>name</th>
                            <th className={styles.cssTh}>mark</th>
                            <th className={styles.cssTh}>value</th>
                        </tr>
                        {cpuValue.map((cpu) => (
                            cpu.cpuId === lastPart  &&(
                                <tr>
                                    <td className={styles.redBorder}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                    <td className={styles.redBorder}>{cpu.cpuName}</td>
                                    <td className={styles.redBorder}>{cpu.cpuMark}</td>
                                    <td className={styles.redBorder}>{cpu.cpuValue}</td>
                                </tr>
                            )))}
                        {cpuValue.map((cpu) => (
                            cpu.cpuId !== lastPart  &&(
                                <tr>
                                    <td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                    <td className={styles.cssTd}>{cpu.cpuName}</td>
                                    <td className={styles.cssTd}>{cpu.cpuMark}</td>
                                    <td className={styles.cssTd}>{cpu.cpuValue}</td>
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
                    {cpuPopular.map((cpu) => (
                        cpu.cpuId === lastPart  &&(
                            <tr>
                                    <td className={styles.redBorder}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                <td className={styles.redBorder}>{cpu.cpuName}</td>
                                <td className={styles.redBorder}>{cpu.cpuRank}</td>
                                <td className={styles.redBorder}>{convertPrice(cpu.cpuPrice)}</td>
                            </tr>
                        )))}
                    {cpuPopular.map((cpu) => (
                        cpu.cpuId !== lastPart  &&(
                            <tr>
                                <td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                <td className={styles.cssTd}>{cpu.cpuName}</td>
                                <td className={styles.cssTd}>{cpu.cpuRank}</td>
                                <td className={styles.cssTd}>{convertPrice(cpu.cpuPrice)}</td>
                            </tr>
                        )))}
                </table>
            </div>

        </>
    );
}


export default CpuDetail;