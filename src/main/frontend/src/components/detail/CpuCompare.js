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


function CpuCompare() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    // 선택할 cpu
    const [selectedCpu, setSelectedCpu] = useState("");
    const [cpuOption, setCpuOption] = useState([]); // cpu 에 대한 배열
    // 선택된 cpu
    const [cpuInfo, setCpuInfo] = useState([]);

    useEffect(() => {
        axios.get('/category/cpu1')
            .then(response => {
                const cpus = response.data.map(cpus => ({
                    value: cpus.cpuName,
                    label: cpus.cpuName
                }));
                setCpuOption(cpus);
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
    }

    useEffect(() => {
        axios.post('/cpuid', { id })
            .then(response => {
                setCpuInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const CpuInfoProgressBar = (info1, info2) => {
        let a, b;
        a = info1/(info1 + info2) * 100;
        b = info2/(info1 + info2) * 100;
        a = Math.round(a);
        b = Math.round(b);

        return (
            <ProgressBar className={styles.progressBarCss}>
                <ProgressBar animated variant="success" now={a} label={`${a}%(${info1})`} key={1} />
                <ProgressBar animated variant="warning" now={b} label={`${b}%(${info2})`} key={2} />
            </ProgressBar>
        );
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
                <div className={styles.itemLabel}>선택된 스펙이름</div>
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
                </form>

            </div>
            <div className={styles.container2}>
                <div className={styles.itemLabel}>선택된 스펙 정보 출력</div>
                <div className={styles.itemLabel}>선택할 스펙 정보 출력</div>
            </div>

            <label>Cpu BenchMark &nbsp;</label><br/>
            {/*<ProgressBar className={styles.progressBarCss}>*/}
            {/*    <ProgressBar animated variant="success" now={35} label={`${35}%`} key={1} />*/}
            {/*    <ProgressBar animated variant="warning" now={65} label={`${65}%`} key={2} />*/}
            {/*</ProgressBar>*/}
            {CpuInfoProgressBar(2335, 7093)}
            <br/>
            <label>Cpu Clock Speed &nbsp;</label><br/>
            {/*<ProgressBar className={styles.progressBarCss}>*/}
            {/*    <ProgressBar animated variant="success" now={45} label={`${45}%`} key={1} />*/}
            {/*    <ProgressBar animated variant="warning" now={55} label={`${55}%`} key={2} />*/}
            {/*</ProgressBar>*/}
            {CpuInfoProgressBar(1245, 4523)}
            <br/>
            <label>Cpu Turbo Speed &nbsp;</label><br/>
            {/*<ProgressBar className={styles.progressBarCss}>*/}
            {/*    <ProgressBar animated variant="success" now={75} label={`${75}%`} key={1} />*/}
            {/*    <ProgressBar animated variant="warning" now={25} label={`${25}%`} key={2} />*/}
            {/*</ProgressBar>*/}
            {CpuInfoProgressBar(34, 12)}
            <br/>
            <label>Cpu Cores &nbsp;</label><br/>
            {/*<ProgressBar className={styles.progressBarCss}>*/}
            {/*    <ProgressBar animated variant="success" now={55} label={`${55}%`} key={1} />*/}
            {/*    <ProgressBar animated variant="warning" now={45} label={`${45}%`} key={2} />*/}
            {/*</ProgressBar>*/}
            {CpuInfoProgressBar(673, 234)}
            <br/>
            <label>Cpu Price &nbsp;</label><br/>
            {/*<ProgressBar className={styles.progressBarCss}>*/}
            {/*    <ProgressBar animated variant="success" now={55} label={`${55}%`} key={1} />*/}
            {/*    <ProgressBar animated variant="warning" now={45} label={`${45}%`} key={2} />*/}
            {/*</ProgressBar>*/}
            {CpuInfoProgressBar(2542, 8655)}
            <br/>
            <label>Cpu Value &nbsp;</label><br/>
            {/*<ProgressBar className={styles.progressBarCss}>*/}
            {/*    <ProgressBar animated variant="success" now={55} label={`${55}%`} key={1} />*/}
            {/*    <ProgressBar animated variant="warning" now={45} label={`${45}%`} key={2} />*/}
            {/*</ProgressBar>*/}
            {CpuInfoProgressBar(1212, 3232)}
            <br/>
        </>
    );
}


export default CpuCompare;