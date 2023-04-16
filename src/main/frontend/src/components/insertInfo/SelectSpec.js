import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar3 from "./CategoryBar3";
import CategoryBar from "../category/CategoryBar";
import MyBottleNeck from "../myInfo/MyBottleNeck";

function SelectSpec() {

    const [cpuInfo, setCpuInfo] = useState([]);
    const [gpuInfo, setGpuInfo] = useState([]);
    const [ramInfo, setRamInfo] = useState([]);

    const [selectCpu, setSelectCpu] = useState([]);
    const [selectGpu, setSelectGpu] = useState([]);
    const [selectRam, setSelectRam] = useState([]);
    const [bottleNeckInfo, setBottleNeckInfo] = useState([]);
    const [showComponent, setShowComponent] = useState(false);

    // hello
    function showMyBottleNeck() {
        setShowComponent(true);
    }
    useEffect(() => {
        setSelectCpu(localStorage.getItem('selectCpuData'));
        setSelectGpu(localStorage.getItem('selectGpuData'));
        setSelectRam(localStorage.getItem('selectRamData'));


    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/cpu1');
                setCpuInfo(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/gpu1');
                setGpuInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/ram1');
                setRamInfo(response.data);

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        axios.get('/SelectBottleNeck')
            .then(response => {
                setBottleNeckInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <>
            <CategoryBar3></CategoryBar3>
            <div>
            {cpuInfo.map((cpu) => (
                cpu.cpuName === selectCpu && (
                <p>
                    cpu_name : {cpu.cpuName}<br/>
                    cpu_mark : {cpu.cpuMark}<br/>
                    cpu_rank : {cpu.cpuRank}<br/>
                    cpu_value : {cpu.cpuValue}<br/>
                    cpu_price : {cpu.cpuPrice}<br/>
                </p>
                )))}


                <br/>
                {gpuInfo.map((gpu) => (
                    gpu.gpuName === selectGpu && (
                <p>
                    gpu_name : {gpu.gpuName}<br/>
                    gpu_mark : {gpu.gpuMark}<br/>
                    gpu_rank : {gpu.gpuRank}<br/>
                    gpu_value : {gpu.gpuValue}<br/>
                    gpu_price : {gpu.gpuPrice}<br/>
                </p>
                    )))}
                <br/>
                {ramInfo.map((ram) => (
                    ram.ramName === selectRam && (
                <p>
                    ram_name : {ram.ramName}<br/>
                    ram_type : {ram.ramType}<br/>
                    ram_size : {ram.ramSize}<br/>
                    ram_latency : {ram.ramLatency}<br/>
                    ram_read : {ram.ramRead}<br/>
                    ram_write : {ram.ramWrite}<br/>
                </p>
                    )))}
                <br/>
            </div>
            {!showComponent && <button type="submit"  onClick={showMyBottleNeck} className={styles.buttonSubmit}>BottleNeck</button>}
            {showComponent && <MyBottleNeck bottleneck={bottleNeckInfo}/>}
        </>
    );
}

export default SelectSpec;