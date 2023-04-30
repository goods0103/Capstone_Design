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
            <form onSubmit={handleSubmit} className={styles.formTag}>
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



                <Link to={`/InsertCategoryBottleNeck?gpu=${selectedGpu.value}&cpu=${selectedCpu.value}`}><button type="submit" className={styles.buttonSubmit}>Submit</button></Link>
            </form>
        </>
    );
}

export default CategoryBottleNeck;