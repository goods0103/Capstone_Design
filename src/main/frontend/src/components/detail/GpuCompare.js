import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import Select from "react-select";
import SubmitSelectedCpu from "./SubmitSelectedCpu";
import SubmitSelectedGpu from "./SubmitSelectedGpu";


function GpuCompare() {
    const [gpuOption, setGpuOption] = useState([]); // cpu 에 대한 배열
    // 나중에 스프링에서 데이터를 받아오면 let -> const 로 변환

    // cpu 정보를 서버로부터 받아서 배열에 넣는다.
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

    // gpu 정보를 서버로부터 받아서 배열에 넣는다.




    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [selectedGpu, setSelectedGpu] = useState("");


    function handleCpuChange(selectedGpu) {
        setSelectedGpu(selectedGpu);
    }





    return(
        <>
            <form onSubmit={handleSubmit} className={styles.formTag}>
                <label>원하는 Gpu를 입력하세요 : </label>
                <Select
                    value={selectedGpu}
                    onChange={handleCpuChange}
                    options={gpuOption}
                    placeholder="Choose an option"
                    isSearchable={true}
                    className={styles.selectTag}
                />
                <label htmlFor="gpuSelect">Selected Gpu : &nbsp;</label>
                <input name = "gpuSelect" className={styles.selectTagShow} value={selectedGpu ? selectedGpu.label : ''} />
                <br/>
            </form>
            <SubmitSelectedGpu selectedGpu={selectedGpu}
                               gpuInfo={gpuInfo}
                               gpuInfo2={gpuInfo2}/>
        </>
    );
}


export default GpuCompare;