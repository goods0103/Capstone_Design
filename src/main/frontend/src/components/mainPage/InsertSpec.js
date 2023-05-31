import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./eventBanner.module.css"
import {Link} from "react-router-dom";
import {useStateValue} from "../reducer/StateProvider";

function InsertSpec() {
    const [{count}, dispatch]= useStateValue();
    const [cpuOption, setCpuOption] = useState([]); // cpu 에 대한 배열
    // 나중에 스프링에서 데이터를 받아오면 let -> const 로 변환
    const [gpuOption, setGpuOption] = useState([]); // gpu 에 대한 배열
    const [ramOption, setRamOption] = useState([]); // ram 에 대한 배열

    // cpu 정보를 서버로부터 받아서 배열에 넣는다.
    useEffect(() => {
        axios.get('/category/cpu_name')
            .then(response => {
                console.log(response.data);
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

    // gpu 정보를 서버로부터 받아서 배열에 넣는다.
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

    // ram 정보를 서버로부터 받아서 배열에 넣는다.
    useEffect(() => {
        axios.get('/category/ram_name')
            .then(response => {
                const rams = response.data.map(rams => ({
                    value: rams,
                    label: rams
                }));
                setRamOption(rams);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [selectedCpu, setSelectedCpu] = useState("");
    const [selectedGpu, setSelectedGpu] = useState("");
    const [selectedRam, setSelectedRam] = useState("");

    function handleCpuChange(selectedCpu) {
        setSelectedCpu(selectedCpu);
    }

    function handleGpuChange(selectedGpu) {
        setSelectedGpu(selectedGpu);
    }

    function handleRamChange(selectedRam) {
        setSelectedRam(selectedRam);
    }
    function saveInsertSpec() {
        localStorage.setItem('selectCpuData', selectedCpu.value);
        localStorage.setItem('selectGpuData', selectedGpu.value);
        localStorage.setItem('selectRamData', selectedRam.value);
        axios.post('/selectedId',  {
            selectedCpu: selectedCpu.value,
            selectedGpu: selectedGpu.value,
            selectedRam: selectedRam.value
        })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            });
        dispatch({
            type:'3',
        });
    }
    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(count));
        console.log(count);
      }, [count]);

    return (
        <>
            <form onSubmit={handleSubmit} className={styles.formTag}>
                <h2 className={styles.animationLabel}>Insert Spec</h2>
                <hr className={styles.hrStyle}/>
                <br/><br/>
                <div className={styles.animationCpu}>
                    <label className={styles.labelStyle}>원하는 Cpu를 입력하세요</label> <br/>
                    <Select
                        value={selectedCpu}
                        onChange={handleCpuChange}
                        options={cpuOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
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
                </div>
                <br/><br/><br/>

                <div className={styles.animationGpu}>
                    <label className={styles.labelStyle}>원하는 Gpu를 입력하세요</label> <br/>
                    <Select
                        value={selectedGpu}
                        onChange={handleGpuChange}
                        options={gpuOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
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
                </div>
                <br/><br/><br/>

                <div className={styles.animationRam}>
                    <label className={styles.labelStyle}>원하는 Ram를 입력하세요</label> <br/>
                    <Select
                        value={selectedRam}
                        onChange={handleRamChange}
                        options={ramOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
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
                </div>
                <br/><br/><br/>
                {
                    selectedCpu && selectedGpu && selectedRam ? (
                        <Link to={'/SelectSpec'}><button type="submit" onClick={saveInsertSpec} className={styles.btnSubmitHover}>RESULT</button></Link>
                    ) : (
                        <Link to={'/SelectSpec'}><button disabled type="submit" onClick={saveInsertSpec} className={styles.btnSubmitHoverDisable}>RESULT</button></Link>
                    )
                }
            </form>
        </>
    );
}

export default InsertSpec;