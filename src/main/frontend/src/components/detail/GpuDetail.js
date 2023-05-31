import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import {Link, useNavigate} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import Table from 'react-bootstrap/Table';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import ProgressBar from "react-bootstrap/ProgressBar";
import LineChartDetail from "./LineChartDetail"
import {ResponsiveContainer} from "recharts";

function calculatePercentages(values) {
    // 필요한 값을 추출하여 배열에 저장
    const extractedValues = values.map(obj => obj.gpuMark);

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
    const extractedValues = values.map(obj => obj.gpuMark);

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

function GpuDetail() {
    const [gpuValue, setGpuValue] = useState([]);
    const [gpuRank, setGpuRank] = useState([]);
    const [gpuPopular, setGpuPopular] = useState([]);
    const [gpuInfoDetail, setGpuInfoDetail] = useState([]);
    const [gpuInfo, setGpuInfo] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    const [gpuMarkChart, setGpuMarkChart] = useState([]);

    const navigate = useNavigate();

    const handlePageNavigation2 = (path) => {
        navigate(path);
        window.location.reload();
    };


    useEffect(() => {
        window.scrollTo(0, 0); // 화면 맨 위로 스크롤
    }, []);

    useEffect(() => {
        axios.post('/gpuValue', { lastPart })
            .then(response => {
                setGpuValue(response.data);
            })
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

    useEffect(() => {
        axios.post('/find_gpu_details', { lastPart })
            .then(response => {
                setGpuInfoDetail(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/find_gpu_id', { lastPart })
            .then(response => {
                setGpuInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/gpu_mark_chart', { lastPart })
            .then(response => {
                setGpuMarkChart(response.data);
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


    const percentagesMark = calculatePercentages(gpuValue);
    const percentagesMark2 = calculatePercentagesPopular(gpuPopular);

    return(
        <>
            <div className={styles.bigFrame}>
                <div className={styles.detailHeaderExplain}>
                    <br/><br/>
                    <h2>{gpuInfo.gpuName}</h2>
                    <p>{gpuInfo.gpuName}의 가격 및 세부 성능 정보는 아래에서 확인할 수 있습니다. 이것은 수천개의 PerformanceTest 벤치마크 결과를 사용하여 만들어지며 매일 업데이트 됩니다.</p>
                    <ul className={styles.ulCss}>
                        <li>첫 번째 그래프는 PassMark GPU 마크 측면에서 10개의 다른 일반(단일) GPU와 비교한 GPU의 상대적 성능을 보여줍니다.</li>
                        <li>두 번째 그래프는 달러당 GPUMark 측면에서 비용 대비 가치를 보여줍니다.</li>
                        <li>가격 책정 기록 데이터에는 단일 프로세서의 가격이 표시됩니다. 여러 프로세서의 경우 표시된 가격에 GPU 수를 곱하십시오.</li>
                    </ul>
                </div>

                <div className={styles.cssTable}>
                    <Table  hover variant="light">
                        {/*<table>*/}
                        <thead>
                        <tr>
                            <th colSpan={2} className={styles.tableDetailTh}>{gpuInfo.gpuName}</th>
                            <th style={{textAlign: 'center'}} className={styles.tableDetailTh2}>Average GPU Mark</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td className={styles.tableDetailTd}><strong>Category:</strong> {gpuInfoDetail.category}</td>
                            <td className={styles.tableDetailTd}><strong>Memory Size:</strong> {gpuInfoDetail.memorySize}</td>
                            <td rowSpan={9}>
                                <div>
                                    <img src={"https://www.cpubenchmark.net/images/speedicon.svg"} alt="cpu_image" className={styles.tableDetailImg}/>
                                    <div className={styles.detailMark}>{gpuInfo.gpuMark}</div><br/>
                                    <Link to={`/gpuCompare/?id=${lastPart}`}>
                                        <button className={styles.buttonCompareDetail}>
                                            <FontAwesomeIcon icon={faPlus} shake size="xl" style={{color: "#ffffff",}} />&nbsp;COMPARE
                                        </button>
                                    </Link>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td className={styles.tableDetailTd}><strong>Core Clock:</strong> {gpuInfoDetail.coreClock}</td>
                            <td className={styles.tableDetailTd}><strong>Memory Clock:</strong> {gpuInfoDetail.memoryClock}</td>
                        </tr>
                        <tr>
                            <td className={styles.tableDetailTd}><strong>Typical TDP:</strong> {gpuInfoDetail.tdp}</td>
                            <td className={styles.tableDetailTd}></td>
                        </tr>
                        <tr>
                            <td colSpan={2} style={{height: '2.5rem'}}></td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}><strong>Other names:</strong> {gpuInfoDetail.otherName}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}><strong>GPU Mark/$Price:</strong> {gpuInfo.gpuValue}</td>
                        </tr>
                        <tr>
                            <td colSpan={2} className={styles.tableDetailTd}><strong>Overall Rank:</strong> {gpuInfo.gpuRank}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>

                <ResponsiveContainer width="100%" height={800} className={styles.lineChartDetail}>
                    <LineChartDetail chartData={gpuMarkChart}/>
                </ResponsiveContainer>

                {gpuValue.length > 1 && (
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
                                    <th className={styles.cssThProgress}>Average GPU Mark</th>
                                </tr>
                                </thead>
                                {gpuValue.map((gpu, index) => (
                                    gpu.gpuId === parseInt(lastPart, 10) ? (
                                        <tbody>
                                        <tr>
                                            <td className={styles.pointMySpecGpuTd}><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImgGpu}/></td>
                                            <td className={styles.pointMySpec} onClick={() => handlePageNavigation2(`/GpuSpec/${gpu.gpuId}`)} style={{ cursor: 'pointer' }}>
                                                {gpu.gpuName}
                                            </td>
                                            <td className={styles.pointMySpecGpu}>{gpu.gpuMark}</td>
                                            <td className={styles.pointMySpecGpu}>{gpu.gpuValue}</td>
                                            <td>
                                                {returnMarkProgressBar(percentagesMark[index])}
                                            </td>
                                        </tr>
                                        </tbody>
                                    ) : (
                                        <tbody>
                                        <tr>
                                            <td className={styles.pointMySpecGpuTd}><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImgGpu}/></td>
                                            <td onClick={() => handlePageNavigation2(`/GpuSpec/${gpu.gpuId}`)} style={{ cursor: 'pointer' }}>
                                                {gpu.gpuName}
                                            </td>
                                            <td>{gpu.gpuMark}</td>
                                            <td>{gpu.gpuValue}</td>
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
                                <th className={styles.cssThProgress}>Average GPU Mark</th>
                            </tr>
                            </thead>
                            {gpuPopular.map((gpu, index) => (
                                gpu.gpuId === parseInt(lastPart, 10) ? (
                                    <tbody>
                                    <tr>
                                        <td className={styles.pointMySpecGpuTd}><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImgGpu}/></td>
                                        <td className={styles.pointMySpecGpu} onClick={() => handlePageNavigation2(`/GpuSpec/${gpu.gpuId}`)} style={{ cursor: 'pointer' }}>
                                            {gpu.gpuName}
                                        </td>
                                        <td className={styles.pointMySpecGpu}>{gpu.gpuRank}</td>
                                        <td className={styles.pointMySpecGpu}>{gpu.gpuMark}</td>
                                        <td>
                                            {returnMarkProgressBar(percentagesMark2[index])}
                                        </td>
                                    </tr>
                                    </tbody>
                                ) : (
                                    <tbody>
                                    <tr>
                                        <td className={styles.pointMySpecGpuTd}><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImgGpu}/></td>
                                        <td onClick={() => handlePageNavigation2(`/GpuSpec/${gpu.gpuId}`)} style={{ cursor: 'pointer' }}>
                                            {gpu.gpuName}
                                        </td>
                                        <td>{gpu.gpuRank}</td>
                                        <td>{gpu.gpuMark}</td>
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


export default GpuDetail;