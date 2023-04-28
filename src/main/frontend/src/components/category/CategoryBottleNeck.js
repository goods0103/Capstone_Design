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
        axios.get( "/category/bottleNeck")
            .then(response => {
                const cpus = response.data.map(cpus => cpus.cpuInfo);
                const uniqueCpus = [...new Set(cpus)].map(value => ({
                    value :value,
                    label: value
                }));
                setCpuOption(uniqueCpus);
                const gpus = response.data.map(gpus => gpus.gpuInfo);
                const uniqueGpus = [...new Set(gpus)].map(value => ({
                    value: value,
                    label: value
                }));
                setGpuOption(uniqueGpus);
                // const cpus2 = response.data.map(cpus2 => ({
                //     value: cpus2.gpuInfo,
                //     label: cpus2.gpuInfo
                // }));
                // setGpuOption(cpus2);
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


    function saveInsertSpec() {
        axios.post('/selectedBottleNeck',  {
            selectedCpu: selectedCpu.value,
            selectedGpu: selectedGpu.value,
        })
            .then(response => {
            })
            .catch(error => {
                console.log(error);
            });

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



                <Link to={'/InsertCategoryBottleNeck'}><button type="submit" onClick={saveInsertSpec} className={styles.buttonSubmit}>Submit</button></Link>
            </form>
        </>
    );
}

export default CategoryBottleNeck;