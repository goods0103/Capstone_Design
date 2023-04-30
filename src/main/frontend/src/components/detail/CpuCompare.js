import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProgressBar from 'react-bootstrap/ProgressBar';
import MyBottleNeck from "../myInfo/MyBottleNeck";
import SubmitSelectedCpu from "./SubmitSelectedCpu";

function CpuCompare() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    // 선택할 cpu
    const [selectedCpu, setSelectedCpu] = useState("");

    const [cpuOption, setCpuOption] = useState([]); // cpu 에 대한 배열
    // 선택된 cpu
    const [cpuInfo, setCpuInfo] = useState([]);
    const [cpuInfo2, setCpuInfo2] = useState([]);

    const [selectedCpuInfo, setSelectedCpuInfo] = useState([]);
    const [selectedCpuInfoDetail, setSelectedCpuInfoDetail] = useState([]);

    const [showComponent, setShowComponent] = useState(false);
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        console.log('Component is rendered');
        setSelectedCpu(selectedCpu);
    }, [renderCount]);

    useEffect(() => {
        axios.get('/category/cpu_name')
            .then(response => {
                const cpus = response.data.map(cpus => ({
                    value: cpus,
                    label: cpus
                }));
                setCpuOption(cpus);
                // setSelectedCpu("");
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    function handleCpuChange(selectedCpu) {
        setSelectedCpu(selectedCpu);
        // setRenderCount(renderCount + 1);
        // setShowComponent(false);
    }

    useEffect(() => {
        axios.post('/find_cpu_id2', { id })
            .then(response => {
                setCpuInfo(response.data);
            })
            .catch(error => {
                console.log(id);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/find_cpu_details2', { id })
            .then(response => {
                setCpuInfo2(response.data);
            })
            .catch(error => {
                console.log(id);
                console.log(error);
            });
    }, []);

    // useEffect(() => {
    //     axios.post('/cpuId', { id })
    //         .then(response => {
    //             setCpuInfo(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    //
    //     axios.post('/cpuId', { id })
    //         .then(response => {
    //             setCpuInfo(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);

    // const CpuInfoProgressBar = (info1, info2) => {
    //     let a, b;
    //     a = info1/(info1 + info2) * 100;
    //     b = info2/(info1 + info2) * 100;
    //     a = Math.round(a);
    //     b = Math.round(b);
    //
    //     return (
    //         <ProgressBar className={styles.progressBarCss}>
    //             <ProgressBar animated variant="success" now={a} label={`${a}%(${info1})`} key={1} />
    //             <ProgressBar animated variant="warning" now={b} label={`${b}%(${info2})`} key={2} />
    //         </ProgressBar>
    //     );
    // }

    function handleClick() {
        setRenderCount(renderCount + 1);
        setSelectedCpu(selectedCpu);
        // if (selectedCpu) {
        //     try {
        //         const response = axios.post('/find_cpu_name', `${selectedCpuInfo}`);
        //         setSelectedCpuInfo(response.data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }
        //
        // if (selectedCpu) {
        //     try {
        //         const response = axios.post('/find_cpu_detail_name', `${selectedCpuInfoDetail}`);
        //         setSelectedCpuInfoDetail(response.data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // }

        // useEffect(() => {
        //     if (selectedCpu) {
        //         const fetchData = async () => {
        //             try {
        //                 const response = await axios.post('/find_cpu_detail_name', `${selectedCpuInfo}`);
        //                 setSelectedCpuInfo(response.data);
        //             } catch (error) {
        //                 console.log(error);
        //             }
        //         };
        //         fetchData();
        //     }
        // }, [selectedCpu]);
        //
        // useEffect(() => {
        //     if (selectedCpu) {
        //         const fetchData = async () => {
        //             try {
        //                 const response = await axios.post('/find_cpu_detail_name', `${selectedCpuInfoDetail}`);
        //                 setSelectedCpuInfoDetail(response.data);
        //             } catch (error) {
        //                 console.log(error);
        //             }
        //         };
        //         fetchData();
        //     }
        // }, [selectedCpu]);


        // axios.post('/find_cpu_name', `${selectedCpu}`)
        //     .then(response => {
        //         setSelectedCpu(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        //
        // axios.post('/find_cpu_detail_name', `${selectedCpu}`)
        //     .then(response => {
        //         setSelectedCpu2(response.data);
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        setShowComponent(true);
    }

    return(
        <>
            {/*<Container>*/}
            {/*    <Row>*/}
            {/*        <Col>1 of 2</Col>*/}
            {/*        <Col>2 of 2</Col>*/}
            {/*    </Row>*/}
            {/*    <Row>*/}
            {/*        <Col>1 of 3</Col>*/}
            {/*        <Col>2 of 3</Col>*/}
            {/*        <Col>3 of 3</Col>*/}
            {/*    </Row>*/}
            {/*</Container>*/}
            <div className={styles.container1}>
                <div className={styles.itemLabel}>선택된 스펙이름</div><br/>
                <label>{cpuInfo.cpuName}</label>
                <form onSubmit={handleSubmit} className={styles.itemForm} >
                    <label>원하는 Cpu를 입력하세요 : </label>
                    <Select
                        value={selectedCpu}
                        onChange={handleCpuChange}
                        options={cpuOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
                    />
                    <label htmlFor="cpuSelect">Selected Cpu : &nbsp;</label>
                    <input name = "cpuSelect" className={styles.selectTagShow} value={selectedCpu ? selectedCpu.label : ''} />
                    <br/>
                    <button type="submit" onClick={handleClick} className={styles.buttonSubmit}>비교하기</button>
                    {/*<SubmitSelectedCpu selectedCpu={selectedCpu}*/}
                    {/*                   setSelectedCpuInfo={setSelectedCpuInfo}*/}
                    {/*                   setSelectedCpuInfoDetail={setSelectedCpuInfoDetail}*/}
                    {/*                   setShowComponent={setShowComponent}/>*/}
                </form>
            </div>
            <div className={styles.container2}>
                <div className={styles.itemLabel}>선택된 스펙 정보 출력</div>
                <div className={styles.itemLabel}>선택할 스펙 정보 출력</div>
            </div>

            {/*{showComponent &&*/}
            {/*<div>*/}
            {/*    <label>Cpu BenchMark &nbsp;</label><br/>*/}
            {/*    /!*<ProgressBar className={styles.progressBarCss}>*!/*/}
            {/*    /!*    <ProgressBar animated variant="success" now={35} label={`${35}%`} key={1} />*!/*/}
            {/*    /!*    <ProgressBar animated variant="warning" now={65} label={`${65}%`} key={2} />*!/*/}
            {/*    /!*</ProgressBar>*!/*/}
            {/*    {CpuInfoProgressBar(cpuInfo.cpuMark, selectedCpuInfoDetail.cpuMark)}*/}
            {/*    <br/>*/}
            {/*    <label>Cpu Clock Speed &nbsp;</label><br/>*/}
            {/*    /!*<ProgressBar className={styles.progressBarCss}>*!/*/}
            {/*    /!*    <ProgressBar animated variant="success" now={45} label={`${45}%`} key={1} />*!/*/}
            {/*    /!*    <ProgressBar animated variant="warning" now={55} label={`${55}%`} key={2} />*!/*/}
            {/*    /!*</ProgressBar>*!/*/}
            {/*    {CpuInfoProgressBar(cpuInfo2.clock, selectedCpuInfoDetail.clock)}*/}
            {/*    <br/>*/}
            {/*    <label>Cpu Turbo Speed &nbsp;</label><br/>*/}
            {/*    /!*<ProgressBar className={styles.progressBarCss}>*!/*/}
            {/*    /!*    <ProgressBar animated variant="success" now={75} label={`${75}%`} key={1} />*!/*/}
            {/*    /!*    <ProgressBar animated variant="warning" now={25} label={`${25}%`} key={2} />*!/*/}
            {/*    /!*</ProgressBar>*!/*/}
            {/*    {CpuInfoProgressBar(cpuInfo2.turbo, selectedCpuInfoDetail.turbo)}*/}
            {/*    <br/>*/}
            {/*    <label>Cpu Cores &nbsp;</label><br/>*/}
            {/*    /!*<ProgressBar className={styles.progressBarCss}>*!/*/}
            {/*    /!*    <ProgressBar animated variant="success" now={55} label={`${55}%`} key={1} />*!/*/}
            {/*    /!*    <ProgressBar animated variant="warning" now={45} label={`${45}%`} key={2} />*!/*/}
            {/*    /!*</ProgressBar>*!/*/}
            {/*    {CpuInfoProgressBar(cpuInfo2.core, selectedCpuInfoDetail.core)}*/}
            {/*    <br/>*/}
            {/*    <label>Cpu Price &nbsp;</label><br/>*/}
            {/*    /!*<ProgressBar className={styles.progressBarCss}>*!/*/}
            {/*    /!*    <ProgressBar animated variant="success" now={55} label={`${55}%`} key={1} />*!/*/}
            {/*    /!*    <ProgressBar animated variant="warning" now={45} label={`${45}%`} key={2} />*!/*/}
            {/*    /!*</ProgressBar>*!/*/}
            {/*    {CpuInfoProgressBar(cpuInfo.cpuPrice, selectedCpuInfo.cpuPrice)}*/}
            {/*    <br/>*/}
            {/*    <label>Cpu Value &nbsp;</label><br/>*/}
            {/*    /!*<ProgressBar className={styles.progressBarCss}>*!/*/}
            {/*    /!*    <ProgressBar animated variant="success" now={55} label={`${55}%`} key={1} />*!/*/}
            {/*    /!*    <ProgressBar animated variant="warning" now={45} label={`${45}%`} key={2} />*!/*/}
            {/*    /!*</ProgressBar>*!/*/}
            {/*    {CpuInfoProgressBar(cpuInfo.cpuValue, selectedCpuInfo.cpuValue)}*/}
            {/*    <br/>*/}
            {/*</div>*/}
            {/*}*/}

            {/*<SubmitSelectedCpu selectedCpu={selectedCpu}*/}
            {/*                   cpuInfo={cpuInfo}*/}
            {/*                   cpuInfo2={cpuInfo2}/>*/}

            {showComponent &&
                <SubmitSelectedCpu selectedCpu={selectedCpu}
                                   cpuInfo={cpuInfo}
                                   cpuInfo2={cpuInfo2}/>
            }

        </>
    );
}


export default CpuCompare;