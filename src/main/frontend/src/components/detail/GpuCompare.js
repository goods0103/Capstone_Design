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
import SubmitSelectedGpu from "./SubmitSelectedGpu";

function GpuCompare() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    // 선택할 gpu
    const [selectedGpu, setSelectedGpu] = useState("");

    const [gpuOption, setGpuOption] = useState([]); // gpu 에 대한 배열
    // 선택된 gpu
    const [gpuInfo, setGpuInfo] = useState([]);
    const [gpuInfo2, setGpuInfo2] = useState([]);

    const [selectedCpuInfo, setSelectedCpuInfo] = useState([]);
    const [selectedCpuInfoDetail, setSelectedCpuInfoDetail] = useState([]);

    const [showComponent, setShowComponent] = useState(false);
    const [renderCount, setRenderCount] = useState(0);

    useEffect(() => {
        console.log('Component is rendered');
    }, [renderCount]);

    useEffect(() => {
        axios.get('/category/gpu_name')
            .then(response => {
                const gpus = response.data.map(gpus => ({
                    value: gpus,
                    label: gpus
                }));
                setGpuOption(gpus);
                // setSelectedCpu("");
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    function handleGpuChange(selectedGpu) {
        setSelectedGpu(selectedGpu)
        setShowComponent(false);
        // setSelectedCpu(selectedCpu);
        // setRenderCount(renderCount + 1);
        // setShowComponent(false);
    }

    useEffect(() => {
        axios.post('/find_gpu_id', { id })
            .then(response => {
                setGpuInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/find_gpu_details', { id })
            .then(response => {
                setGpuInfo2(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function handleClick() {
        //setRenderCount(renderCount + 1);
        setSelectedGpu(selectedGpu);
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
                <label>{gpuInfo.gpuName}</label>
                <form onSubmit={handleSubmit} className={styles.itemForm} >
                    <label>원하는 Gpu를 입력하세요 : </label>
                    <Select
                        value={selectedGpu}
                        onChange={handleGpuChange}
                        options={gpuOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
                    />
                    <label htmlFor="gpuSelect">Selected Gpu : &nbsp;</label>
                    <input name = "gpuSelect" className={styles.selectTagShow} value={selectedGpu ? selectedGpu.label : ''} />
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
                <SubmitSelectedGpu selectedGpu={selectedGpu}
                                   gpuInfo={gpuInfo}
                                   gpuInfo2={gpuInfo2}/>
            }

        </>
    );
}

export default GpuCompare;