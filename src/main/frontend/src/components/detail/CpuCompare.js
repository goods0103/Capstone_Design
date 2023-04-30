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
        setSelectedCpu(selectedCpu)
        setShowComponent(false);
        // setSelectedCpu(selectedCpu);
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

    function handleClick() {
        //setRenderCount(renderCount + 1);
        setSelectedCpu(selectedCpu);
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
                </form>
            </div>
            <div className={styles.container2}>
                <div className={styles.itemLabel}>선택된 스펙 정보 출력</div>
                <div className={styles.itemLabel}>선택할 스펙 정보 출력</div>
            </div>

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