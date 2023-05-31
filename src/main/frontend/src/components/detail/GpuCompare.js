import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCodeCompare, faRotate} from "@fortawesome/free-solid-svg-icons";
import SubmitSelectedGpu from "./SubmitSelectedGpu";

function GpuCompare() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    // 선택할 cpu
    const [selectedGpu, setSelectedGpu] = useState("");

    const [gpuOption, setGpuOption] = useState([]); // cpu 에 대한 배열
    // 선택된 cpu
    const [gpuInfo, setGpuInfo] = useState([]);
    const [gpuInfo2, setGpuInfo2] = useState([]);

    const [selectedGpuInfo, setSelectedGpuInfo] = useState([]);
    const [selectedGpuInfoDetail, setSelectedGpuInfoDetail] = useState([]);

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
    }

    useEffect(() => {
        axios.post('/find_gpu_id', { id })
            .then(response => {
                setGpuInfo(response.data);
            })
            .catch(error => {
                console.log(id);
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/find_gpu_details', { id })
            .then(response => {
                setGpuInfo2(response.data);
            })
            .catch(error => {
                console.log(id);
                console.log(error);
            });
    }, []);

    function handleClick() {
        setSelectedGpu(selectedGpu);
        setShowComponent(true);
    }

    return(
        <>
        <div className={styles.bigFrame}>
            <div className={styles.selectContainer}>
                <label className={styles.selectSpecLabel}>{gpuInfo.gpuName}</label>
                <form onSubmit={handleSubmit} className={styles.fromStyle} >
                    <div className={styles.formContainer}>
                        <label style={{paddingTop:'10px'}}>비교할 제품 선택 </label>&emsp;
                        <Select
                            value={selectedGpu}
                            onChange={handleGpuChange}
                            options={gpuOption}
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
                        <button type="submit" onClick={handleClick} className={styles.customBtn}><span>비교하기&emsp;<FontAwesomeIcon icon={faRotate} spin size="xl" /></span></button>
                    </div>
                </form>
            </div>
            <hr className={styles.hrStyle}/>

            {showComponent &&
                <SubmitSelectedGpu selectedGpu={selectedGpu}
                                   gpuInfo={gpuInfo}
                                   gpuInfo2={gpuInfo2}/>
            }
        </div>
        </>
    );
}


export default GpuCompare;