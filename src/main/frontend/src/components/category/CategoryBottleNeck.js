import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import Select from "react-select";
import {Link} from "react-router-dom";

function CategoryBottleNeck() {

    const [cpuOption, setCpuOption] = useState([]); // cpu 에 대한 배열
    const [gpuOption, setGpuOption] = useState([]); // gpu 에 대한 배열

    useEffect(() => {
        axios.get( "/category/bottleNeckList")
            .then(response => {
                const gpus = response.data.map(gpus => ({
                    value: gpus.gpuName,
                    label: gpus.gpuName
                }));
                setGpuOption(gpus);
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
    const [selectedCpu, setSelectedCpu] = useState("");
    const [selectedGpu, setSelectedGpu] = useState("");

    function handleCpuChange(selectedCpu) {
        setSelectedCpu(selectedCpu);
    }

    function handleGpuChange(selectedGpu) {
        setSelectedGpu(selectedGpu);
    }


    return (
        <>
            {/*<CategoryBar></CategoryBar>*/}
            <form onSubmit={handleSubmit} className={styles.bottleNeckFormTag}>
                <h2 className={styles.animationLabel}>BOTTLENECK</h2>
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
                            menu: (provided, state) => ({
                                ...provided,
                                maxWidth: '800px', // Select 태그의 너비와 동일한 값으로 설정
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
                    selectedCpu && selectedGpu ? (
                        <Link to={`/InsertCategoryBottleNeck?gpu=${selectedGpu.value}&cpu=${selectedCpu.value}`}><button type="submit" className={styles.btnSubmitHover}>Result</button></Link>
                    ) : (
                        <Link to={`/InsertCategoryBottleNeck?gpu=${selectedGpu.value}&cpu=${selectedCpu.value}`}><button disabled type="submit" className={styles.btnSubmitHoverDisable2}>Result</button></Link>                    )
                }
            </form>
        </>
    );
}

export default CategoryBottleNeck;