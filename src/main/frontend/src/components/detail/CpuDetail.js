import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";

function CpuDetail() {
    const [cpuValue, setCpuValue] = useState([]);
    const [cpuRank, setCpuRank] = useState([]);
    const [cpuPopular, setCpuPopular] = useState([]);
    const [cpuInfoDetail, setCpuInfoDetail] = useState([]);
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
                setCpuInfoDetail(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/find_cpu_id', { lastPart })
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
            <div>
                <div className={styles.detailHeaderExplain}>
                    <br/><br/>
                    {/*<h2>{cpuInfo.cpuName}</h2>*/}
                    {/*<p>{cpuInfo.cpuName}의 가격 및 세부 성능 정보는 아래에서 확인할 수 있습니다. 이것은 수천개의 PerformanceTest 벤치마크 결과를 사용하여 만들어지며 매일 업데이트 됩니다.</p>*/}
                    <h2>CPU 5600X</h2><br/>
                    <p>CPU 5600X의 가격 및 세부 성능 정보는 아래에서 확인할 수 있습니다. 이것은 수천개의 PerformanceTest 벤치마크 결과를 사용하여 만들어지며 매일 업데이트 됩니다.</p>
                    <ul>
                        <li>첫 번째 그래프는 PassMark CPU 마크 측면에서 10개의 다른 일반(단일) CPU와 비교한 CPU의 상대적 성능을 보여줍니다.</li>
                        <li>두 번째 그래프는 달러당 CPUMark 측면에서 비용 대비 가치를 보여줍니다.</li>
                        <li>가격 책정 기록 데이터에는 단일 프로세서의 가격이 표시됩니다. 여러 프로세서의 경우 표시된 가격에 CPU 수를 곱하십시오.</li>
                    </ul>
                </div>
                <div className={styles.cssTable}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th colSpan={2} className={styles.tableDetailTh}>{cpuInfo.cpuName}</th>
                            {/*<th colSpan={2}>AMD Ryzen 5 5600X</th>*/}
                            <th style={{textAlign: 'center'}} className={styles.tableDetailTh}>Average CPU Mark</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={styles.tableDetailTd}>Class: {cpuInfoDetail.classType}</td>
                            <td className={styles.tableDetailTd}>Socket: {cpuInfoDetail.socket}</td>
                            <td rowSpan={10}>
                                <div>
                                    <img src={"/images/product/calc1.png"} alt="cpu_image" className={styles.tableDetailImg}/>
                                    <div className={styles.detailMark}>{cpuInfo.cpuMark}1235</div><br/>
                                    <div>Single Thread Rating: {cpuInfoDetail.str}</div>
                                    <Link to={`/cpuCompare/?id=${lastPart}`}>
                                        <button className={styles.buttonCompareDetail}>
                                            <FontAwesomeIcon icon={faPlus} shake size="xl" style={{color: "#ffffff",}} />&nbsp;COMPARE
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.tableDetailTd}>Clock Speed: {cpuInfoDetail.clock}</td>
                            <td className={styles.tableDetailTd}>Turbo Speed: {cpuInfoDetail.turbo}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableDetailTd}>Cores: {cpuInfoDetail.core}</td>
                            <td className={styles.tableDetailTd}>Typical TDP: {cpuInfoDetail.tdp}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}>Cache Size: {cpuInfoDetail.cache}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{height: '2.5rem'}}></td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}>Other names: {cpuInfoDetail.otherName}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}>CPU Mark/$Price: {cpuInfo.cpuValue}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}>Overall Rank: {cpuInfoDetail.cpuRank}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                {cpuValue.length > 1 && (
                    <div>
                        <h2>Similar value</h2>
                        <div className={styles.cssTable}>
                            <Table striped bordered hover variant="dark">
                                <thead>
                                    <tr>
                                        <th className={styles.tableDetailTh}>Image</th>
                                        <th className={styles.tableDetailTh}>Name</th>
                                        <th className={styles.tableDetailTh}>Mark</th>
                                        <th className={styles.tableDetailTh}>Value</th>
                                        <th>Average CPU Mark</th>
                                    </tr>
                                </thead>
                                {cpuValue.map((cpu) => (
                                    cpu.cpuId === lastPart ? (
                                        <tbody>
                                            <tr>
                                                <td className={styles.redBorder}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                                <td className={styles.redBorder}>{cpu.cpuName}</td>
                                                <td className={styles.redBorder}>{cpu.cpuMark}</td>
                                                <td className={styles.redBorder}>{cpu.cpuValue}</td>
                                                <td>
                                                    <div>
                                                        <ProgressBar now={11} label={`${11}%`} className={styles.infoProgressBar} variant="" style={{height: '1.5rem'}} />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr>
                                                <td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                                <td className={styles.cssTd}>{cpu.cpuName}</td>
                                                <td className={styles.cssTd}>{cpu.cpuMark}</td>
                                                <td className={styles.cssTd}>{cpu.cpuValue}</td>
                                                <td>
                                                    <div>
                                                        <ProgressBar now={11} label={`${11}%`} className={styles.infoProgressBar} variant="" style={{height: '1.5rem'}} />
                                                    </div>
                                                </td>
                                            </tr>
                                        </tbody>
                                    )
                                ))}
                            </Table>
                        </div>
                    </div>
                )}
                <div>
                    <h2>Popular</h2>
                    <div className={styles.cssTable}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th className={styles.cssTh}>Image</th>
                                <th className={styles.cssTh}>Name</th>
                                <th className={styles.cssTh}>Rank</th>
                                <th className={styles.cssTh}>Price</th>
                                <th>Average CPU Mark</th>
                            </tr>
                            </thead>
                            {cpuPopular.map((cpu) => (
                                cpu.cpuId === lastPart  &&(
                                    <thead>
                                    <tr>
                                        <td className={styles.redBorder}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                        <td className={styles.redBorder}>{cpu.cpuName}</td>
                                        <td className={styles.redBorder}>{cpu.cpuRank}</td>
                                        <td className={styles.redBorder}>{convertPrice(cpu.cpuPrice)}</td>
                                        <td>
                                            <div>
                                                <ProgressBar now={11} label={`${11}%`} className={styles.infoProgressBar} variant="" style={{height: '1.5rem'}} />
                                            </div>
                                        </td>
                                    </tr>
                                    </thead>
                                )))}
                            {cpuPopular.map((cpu) => (
                                cpu.cpuId !== lastPart  &&(
                                    <thead>
                                    <tr>
                                        <td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                        <td className={styles.cssTd}>{cpu.cpuName}</td>
                                        <td className={styles.cssTd}>{cpu.cpuRank}</td>
                                        <td className={styles.cssTd}>{convertPrice(cpu.cpuPrice)}</td>
                                        <td>
                                            <div>

                                            </div>
                                        </td>
                                    </tr>
                                    </thead>
                                )))}
                        </Table>
                    </div>
                </div>
            </div>
        </>
    );
}


export default CpuDetail;