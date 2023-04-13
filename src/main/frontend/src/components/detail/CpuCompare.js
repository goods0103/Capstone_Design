import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import Select from "react-select";
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import ProgressBar from 'react-bootstrap/ProgressBar';
import ProgressBarLabel from 'react-bootstrap/ProgressBar';

const data1 = [
    { name: 'Benchmark', value: 21945 },
    { name: 'ClockSpeed', value: 3.7 },
    { name: 'TurboSpeed', value: 4.6 },
    { name: 'Cores', value: 6 },
    { name: 'Price', value: 187956 },
];
const data2 = [
    { name: 'Benchmark', value: 11945 },
    { name: 'ClockSpeed', value: 2.7 },
    { name: 'TurboSpeed', value: 3.6 },
    { name: 'Cores', value: 4 },
    { name: 'Price', value: 137956 },
];
function CpuCompare() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    // 선택할 cpu
    const [selectedCpu, setSelectedCpu] = useState("");
    const [cpuOption, setCpuOption] = useState([]); // cpu 에 대한 배열
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

            <div className={styles.container1}>
                <div className={styles.item}>선택된 스펙이름</div>
                <form onSubmit={handleSubmit} className={styles.item} >
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

            </div>
            <div className={styles.container2}>
                <div className={styles.item}>선택된 스펙 정보 출력

                </div>
                <div className={styles.item}>선택할 스펙 정보 출력



                </div>
            </div>
            <label>benchmark</label>
            <ProgressBar style={{ height: '30px' }}>
                <label>{data1.find(obj => obj.name === 'Benchmark').value}</label>
                <ProgressBar variant="success" now={data1.find(obj => obj.name === 'Benchmark').value/(data1.find(obj => obj.name === 'Benchmark').value+data2.find(obj => obj.name === 'Benchmark').value)*100} key={1} label={data1.find(obj => obj.name === 'Benchmark').value/(data1.find(obj => obj.name === 'Benchmark').value+data2.find(obj => obj.name === 'Benchmark').value)}/>
                <ProgressBar  variant="danger" now={data2.find(obj => obj.name === 'Benchmark').value/(data1.find(obj => obj.name === 'Benchmark').value+data2.find(obj => obj.name === 'Benchmark').value)*100} key={2} label={data2.find(obj => obj.name === 'Benchmark').value/(data1.find(obj => obj.name === 'Benchmark').value+data2.find(obj => obj.name === 'Benchmark').value)}/>
                <label>{data2.find(obj => obj.name === 'Benchmark').value}</label>
            </ProgressBar>
            <br/>
            <ProgressBar>
                <label>ClockSpeed</label>
                <ProgressBar  variant="success" now={45} key={1} />

                <ProgressBar  variant="danger" now={55} key={2} />
            </ProgressBar>
            <br/>
            <ProgressBar>
                <label>TurboSpeed</label>
                <ProgressBar  variant="success" now={75} key={1} />
                <ProgressBar  variant="danger" now={25} key={2} />
            </ProgressBar>
            <br/>
            <ProgressBar>
                <label>Cores</label>
                <ProgressBar striped variant="success" now={55} key={1} />
                <ProgressBar striped variant="danger" now={45} key={2} />
            </ProgressBar>
            <ProgressBar>
                <label>Price</label>
                <ProgressBar striped variant="success" now={55} key={1} />
                <ProgressBar striped variant="danger" now={45} key={2} />
            </ProgressBar>
        </>
    );
}


export default CpuCompare;