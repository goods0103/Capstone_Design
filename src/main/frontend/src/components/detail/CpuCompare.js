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
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCodeCompare, faRotate} from "@fortawesome/free-solid-svg-icons";

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
        axios.post('/find_cpu_id', { id })
            .then(response => {
                setCpuInfo(response.data);
            })
            .catch(error => {
                console.log(id);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/find_cpu_details', { id })
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
            <div className={styles.selectContainer}>
                <label className={styles.selectSpecLabel}>{cpuInfo.cpuName}</label>
                {/*<label className={styles.selectSpecLabel}>{"cpu 5600X"}</label>*/}
                <form onSubmit={handleSubmit} className={styles.fromStyle} >
                    <div className={styles.formContainer}>
                        <label style={{paddingTop:'10px'}}>비교할 제품 선택 </label>&emsp;
                        <Select
                            value={selectedCpu}
                            onChange={handleCpuChange}
                            options={cpuOption}
                            placeholder="Choose an option"
                            isSearchable={true}
                            className={styles.selectTagCompare}
                            styles={{
                                option: (provided, state) => ({
                                    ...provided,
                                    color: 'black',
                                }),
                                control: (provided, state) => ({
                                    ...provided,
                                    // width: '800px', // 원하는 너비로 조정
                                    backgroundColor: '#3c3c3c',
                                    border: state.isFocused ? '3px solid white' : 'solid',
                                }),
                                singleValue: (provided) => ({
                                    ...provided,
                                    color: 'white', // 선택된 값의 글자색을 하얀색으로 설정
                                    fontSize: '1rem', // 선택된 값의 폰트 크기를 원하는 크기로 조정
                                }),
                                input: (provided) => ({
                                    ...provided,
                                    color: 'white',
                                }),
                            }}
                        />
                        <button type="submit" onClick={handleClick} className={styles.buttonCompare}>비교하기&emsp;<FontAwesomeIcon icon={faRotate} spin size="xl" /></button>
                    </div>
                </form>
            </div>
            <hr className={styles.hrStyle}/>

            {/*<div className={styles.infoNameFrame}>*/}
            {/*        <span>*/}
            {/*            <div>*/}
            {/*                cpu1*/}
            {/*            </div>*/}
            {/*            <div className={styles.infoNameLabel}>*/}
            {/*                {"cpuInfo.cpuName"}*/}
            {/*            </div>*/}
            {/*        </span>*/}
            {/*    <span>*/}
            {/*            <div>*/}
            {/*                cpu2*/}
            {/*            </div>*/}
            {/*            <div className={styles.infoNameLabel}>*/}
            {/*                {"selectedCpuInfo.cpuName"}*/}
            {/*            </div>*/}
            {/*        </span>*/}
            {/*</div>*/}

            {showComponent &&
                <SubmitSelectedCpu selectedCpu={selectedCpu}
                                   cpuInfo={cpuInfo}
                                   cpuInfo2={cpuInfo2}/>
            }
        </>
    );
}


export default CpuCompare;