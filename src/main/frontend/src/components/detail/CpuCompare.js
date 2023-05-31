import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
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
        setSelectedCpu(selectedCpu);
        setShowComponent(true);
    }

    return(
        <>
        <div className={styles.bigFrame}>
            <div className={styles.selectContainer}>
                <label className={styles.selectSpecLabel}>{cpuInfo.cpuName}</label>
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
                        <button type="submit" onClick={handleClick} className={styles.customBtn}><span>비교하기&emsp;<FontAwesomeIcon icon={faRotate} spin size="xl" /></span></button>
                    </div>
                </form>
            </div>
            <hr className={styles.hrStyle}/>

            {showComponent &&
                <SubmitSelectedCpu selectedCpu={selectedCpu}
                                   cpuInfo={cpuInfo}
                                   cpuInfo2={cpuInfo2}/>
            }
            </div>
        </>
    );
}


export default CpuCompare;