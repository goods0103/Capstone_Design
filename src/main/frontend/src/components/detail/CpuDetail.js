import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import LineChartDetail from "./LineChartDetail"
import {ResponsiveContainer} from "recharts";
import { useNavigate } from 'react-router-dom';


function calculatePercentages(values) {
    // 필요한 값을 추출하여 배열에 저장
    const extractedValues = values.map(obj => obj.cpuMark);

    // 가장 큰 값을 찾기
    const max = Math.max(...extractedValues);

    // 비율을 계산하여 저장할 배열을 초기화
    // const percentages = values.map(value => parseFloat((value / max * 100).toFixed(2)));
    // console.log(percentages[0] +" "+percentages[1])
    //
    // return percentages;
    const percentages = extractedValues.map(value => parseFloat(((value / max) * 100).toFixed(2)));

    return percentages;
}

function calculatePercentagesPopular(values) {
    // 필요한 값을 추출하여 배열에 저장
    const extractedValues = values.map(obj => obj.cpuMark);

    // 가장 큰 값을 찾기
    const max = Math.max(...extractedValues);

    // 비율을 계산하여 저장할 배열을 초기화
    // const percentages = values.map(value => parseFloat((value / max * 100).toFixed(2)));
    // console.log(percentages[0] +" "+percentages[1])
    //
    // return percentages;
    const percentages = extractedValues.map(value => parseFloat(((value / max) * 100).toFixed(2)));

    return percentages;
}

function CpuDetail() {
    const [cpuValue, setCpuValue] = useState([]);
    const [cpuRank, setCpuRank] = useState([]);
    const [cpuPopular, setCpuPopular] = useState([]);
    const [cpuInfoDetail, setCpuInfoDetail] = useState([]);
    const [cpuInfo, setCpuInfo] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];

    const [cpuMark, setCpuMark] = useState([]);
    const [percentages2, setPercentages2] = useState([]);
    const [cpuMarkChart, setCpuMarkChart] = useState([]);

    const handlePageNavigation = (path) => {
        window.location.href = path;
    };

    const navigate = useNavigate();

    const handlePageNavigation2 = (path) => {
        navigate(path);
        window.location.reload();
    };


    useEffect(() => {
        window.scrollTo(0, 0); // 화면 맨 위로 스크롤
    }, []);

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

    useEffect(() => {
        axios.post('/cpu_mark_chart', { lastPart })
            .then(response => {
                console.log(response.data);
                setCpuMarkChart(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = '#F0F6F8';
        document.body.style.color = "black";
        return () => {
            document.body.style.backgroundColor = '#151515';
            document.body.style.color = "white";
        };
    }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const returnMarkProgressBar = (info1) => {
        return (
            <div>
                <ProgressBar now={info1} label={`${info1}%`} className={styles.infoProgressBar} variant="" style={{height: '1.5rem', marginTop: '20px'}} />
            </div>
        );
    }


    const percentagesMark = calculatePercentages(cpuValue);
    const percentagesMark2 = calculatePercentagesPopular(cpuPopular);

    return(
        <>
            <div className={styles.bigFrame}>
                <div className={styles.detailHeaderExplain}>
                    <br/><br/>
                    <h2>{cpuInfo.cpuName}</h2>
                    <p>{cpuInfo.cpuName}의 가격 및 세부 성능 정보는 아래에서 확인할 수 있습니다. 이것은 수천개의 PerformanceTest 벤치마크 결과를 사용하여 만들어지며 매일 업데이트 됩니다.</p>
                    <ul className={styles.ulCss}>
                        <li>첫 번째 그래프는 PassMark CPU 마크 측면에서 10개의 다른 일반(단일) CPU와 비교한 CPU의 상대적 성능을 보여줍니다.</li>
                        <li>두 번째 그래프는 달러당 CPUMark 측면에서 비용 대비 가치를 보여줍니다.</li>
                        <li>가격 책정 기록 데이터에는 단일 프로세서의 가격이 표시됩니다. 여러 프로세서의 경우 표시된 가격에 CPU 수를 곱하십시오.</li>
                    </ul>
                </div>

                <div className={styles.cssTable}>
                    <Table  hover variant="light">
                        <thead>
                        <tr>
                            <th colSpan={2} className={styles.tableDetailTh}>{cpuInfo.cpuName}</th>
                            <th style={{textAlign: 'center'}} className={styles.tableDetailTh2}>Average CPU Mark</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={styles.tableDetailTd}><strong>Class:</strong> {cpuInfoDetail.classType}</td>
                            <td className={styles.tableDetailTd}><strong>Socket:</strong> {cpuInfoDetail.socket}</td>
                            <td rowSpan={10}>
                                <div>
                                    <img src={"https://www.cpubenchmark.net/images/speedicon.svg"} alt="cpu_image" className={styles.tableDetailImg}/>
                                    <div className={styles.detailMark}>{cpuInfo.cpuMark}</div><br/>
                                    <div style={{fontWeight : "bold"}}><strong>Single Thread Rating:</strong> {cpuInfoDetail.str}</div>
                                    <Link to={`/cpuCompare/?id=${lastPart}`}>
                                        <button className={styles.buttonCompareDetail}>
                                            <FontAwesomeIcon icon={faPlus} shake size="xl" style={{color: "#ffffff",}} />&nbsp;COMPARE
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.tableDetailTd}><strong>Clock Speed:</strong> {cpuInfoDetail.clock}</td>
                            <td className={styles.tableDetailTd}><strong>Turbo Speed:</strong> {cpuInfoDetail.turbo}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableDetailTd}><strong>Cores:</strong> {cpuInfoDetail.core}</td>
                            <td className={styles.tableDetailTd}><strong>Typical TDP:</strong> {cpuInfoDetail.tdp}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}><strong>Cache Size:</strong> {cpuInfoDetail.cache}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{height: '2.5rem'}}></td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}><strong>Other names:</strong> {cpuInfoDetail.otherName}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}><strong>CPU Mark/$Price:</strong> {cpuInfo.cpuValue}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}><strong>Overall Rank:</strong> {cpuInfo.cpuRank}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                <ResponsiveContainer width="100%" height={800} className={styles.lineChartDetail}>
                    <LineChartDetail chartData={cpuMarkChart}/>
                </ResponsiveContainer>

                {cpuValue.length > 1 && (
                    <div>
                        <br/><br/>
                        <div className={`${styles.detailHeaderExplain} ${styles.detailPopularValue}`}>
                            <h2>Similar value</h2>
                            <br/>
                        </div>
                        <div className={styles.cssTable}>
                            <Table   hover variant="light">
                                <thead>
                                    <tr>
                                        <th className={styles.cssTh}>Image</th>
                                        <th className={styles.cssTh}>Name</th>
                                        <th className={styles.cssTh}>Mark</th>
                                        <th className={styles.cssTh}>Value</th>
                                        <th className={styles.cssThProgress}>Average CPU Mark</th>
                                    </tr>
                                </thead>
                                {cpuValue.map((cpu, index) => (
                                    cpu.cpuId === parseInt(lastPart, 10) ? (
                                        <tbody>
                                            <tr>
                                                <td className={styles.pointMySpec}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                                <td className={styles.pointMySpec} onClick={() => handlePageNavigation2(`/CpuSpec/${cpu.cpuId}`)} style={{ cursor: 'pointer' }}>
                                                    {cpu.cpuName}
                                                </td>
                                                <td className={styles.pointMySpec}>{cpu.cpuMark}</td>
                                                <td className={styles.pointMySpec}>{cpu.cpuValue}</td>
                                                <td>
                                                    {returnMarkProgressBar(percentagesMark[index])}
                                                </td>
                                            </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                            <tr>
                                                <td><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                                <td onClick={() => handlePageNavigation2(`/CpuSpec/${cpu.cpuId}`)} style={{ cursor: 'pointer' }}>
                                                    {cpu.cpuName}
                                                </td>
                                                <td>{cpu.cpuMark}</td>
                                                <td>{cpu.cpuValue}</td>
                                                <td>
                                                    {returnMarkProgressBar(percentagesMark[index])}
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
                    <br/><br/>
                    <div className={`${styles.detailHeaderExplain} ${styles.detailPopularValue}`}>
                        <h2>Popular</h2>
                        <br/>
                    </div>
                    <div className={styles.cssTable}>
                        <Table   hover variant="light">
                            <thead>
                            <tr>
                                <th className={styles.cssTh}>Image</th>
                                <th className={styles.cssTh}>Name</th>
                                <th className={styles.cssTh}>Rank</th>
                                <th className={styles.cssTh}>Mark</th>
                                <th className={styles.cssThProgress}>Average CPU Mark</th>
                            </tr>
                            </thead>
                            {cpuPopular.map((cpu, index) => (
                                cpu.cpuId === parseInt(lastPart, 10) ? (
                                    <tbody>
                                    <tr>
                                        <td className={styles.pointMySpec}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                        <td className={styles.pointMySpec} onClick={() => handlePageNavigation2(`/CpuSpec/${cpu.cpuId}`)} style={{ cursor: 'pointer' }}>
                                            {cpu.cpuName}
                                        </td>
                                        <td className={styles.pointMySpec}>{cpu.cpuRank}</td>
                                        <td className={styles.pointMySpec}>{cpu.cpuMark}</td>
                                        <td>
                                            {returnMarkProgressBar(percentagesMark2[index])}
                                        </td>
                                    </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                    <tr>
                                        <td><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                        <td onClick={() => handlePageNavigation2(`/CpuSpec/${cpu.cpuId}`)} style={{ cursor: 'pointer' }}>
                                            {cpu.cpuName}
                                        </td>
                                        <td>{cpu.cpuRank}</td>
                                        <td>{cpu.cpuMark}</td>
                                        <td>
                                            {returnMarkProgressBar(percentagesMark2[index])}
                                        </td>
                                    </tr>
                                    </tbody>
                                    )
                            ))}
                        </Table>
                    </div>
                </div>

            </div>
        </>
    );
}


export default CpuDetail;