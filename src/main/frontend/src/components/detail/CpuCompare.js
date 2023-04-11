import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import Select from "react-select";
import { useLocation } from 'react-router-dom';


function CpuCompare() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
// 선택할 cpu
    const [selectedCpu, setSelectedCpu] = useState("");
    const [cpuOption, setCpuOption] = useState([]); // cpu 에 대한 배열
    // 나중에 스프링에서 데이터를 받아오면 let -> const 로 변환

    // 선택된 cpu
    const [cpuInfo, setCpuInfo] = useState([]);

    useEffect(() => {
        axios.get('/category/cpu1')
            .then(response => {
                const cpus = response.data.map(cpus => ({
                    value: cpus.cpu_name,
                    label: cpus.cpu_name
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
        setSelectedCpu(selectedCpu);
    }

    useEffect(() => {
        axios.post('/cpuid', { id })
            .then(response => {
                setCpuInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);



    return(
        <>
            <div>선택된 스펙이름</div>
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
            </form>
            <div>선택된 스펙 정보 출력</div>
            <div>선택할 스펙 정보 출력</div>
        </>
    );
}


export default CpuCompare;