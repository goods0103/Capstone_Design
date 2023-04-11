import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./eventBanner.module.css"
import {Link} from "react-router-dom";

function InsertSpec() {

    const [cpuOption, setCpuOption] = useState([]); // cpu 에 대한 배열
    // 나중에 스프링에서 데이터를 받아오면 let -> const 로 변환
    const [gpuOption, setGpuOption] = useState([]); // gpu 에 대한 배열
    const [ramOption, setRamOption] = useState([]); // ram 에 대한 배열

    // // 임시 데이터
    // gpuOption = [
    //     { value: 'rtx 3070', label: 'Rtx 3070' },
    //     { value: 'rtx 3080', label: 'Rtx 3080' },
    //     { value: 'rtx 3090', label: 'Rtx 3090' },
    // ];
    //
    // ramOption = [
    //     { value: '8GB', label: '8GB' },
    //     { value: '16GB', label: '16GB' },
    //     { value: '32GB', label: '32GB' },
    // ];

    // cpu 정보를 서버로부터 받아서 배열에 넣는다.
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

    // gpu 정보를 서버로부터 받아서 배열에 넣는다.
    useEffect(() => {
        axios.get('/category/gpu1')
            .then(response => {
                const gpus = response.data.map(gpus => ({
                    value: gpus.gpu_name,
                    label: gpus.gpu_name
                }));
                setGpuOption(gpus);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    // ram 정보를 서버로부터 받아서 배열에 넣는다.
    useEffect(() => {
        axios.get('/category/ram1')
            .then(response => {
                const rams = response.data.map(rams => ({
                    value: rams.ram_name,
                    label: rams.ram_name
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
        console.log(selectedCpu.value);
        console.log(selectedGpu.value);
        axios.post('/selectedId', { selectedCpu,selectedGpu,selectedRam })
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

                <label>원하는 Ram를 입력하세요 : </label>
                <Select
                    value={selectedRam}
                    onChange={handleRamChange}
                    options={ramOption}
                    placeholder="Choose an option"
                    isSearchable={true}
                    className={styles.selectTag}
                />
                <label htmlFor="ramSelect">Selected Ram : &nbsp;</label>
                <input name = "ramSelect" className={styles.selectTagShow} value={selectedRam ? selectedRam.label : ''} />
                <br/>

                <Link to={'/SelectSpec'}><button type="submit" onClick={saveInsertSpec} className={styles.buttonSubmit}>Submit</button></Link>
            </form>
        </>
    );
}

export default InsertSpec;