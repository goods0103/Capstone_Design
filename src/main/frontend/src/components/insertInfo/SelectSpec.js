import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar3 from "./CategoryBar3";
import CategoryBar from "../category/CategoryBar";

function SelectSpec() {

    const [cpuInfo, setCpuInfo] = useState([]);
    const [gpuInfo, setGpuInfo] = useState([]);
    const [ramInfo, setRamInfo] = useState([]);

    const [selectCpu, setSelectCpu] = useState([]);
    const [selectGpu, setSelectGpu] = useState([]);
    const [selectRam, setSelectRam] = useState([]);


    // hello

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

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <>
            <CategoryBar3></CategoryBar3>
            <div>
            {cpuInfo.map((cpu) => (
                cpu.cpu_name === selectCpu && (
                <p>
                    cpu_name : {cpu.cpu_name}<br/>
                    cpu_mark : {cpu.cpu_mark}<br/>
                    cpu_rank : {cpu.cpu_rank}<br/>
                    cpu_value : {cpu.cpu_value}<br/>
                    cpu_price : {cpu.cpu_price}<br/>
                </p>
                )))}


                <br/>
                {gpuInfo.map((gpu) => (
                    gpu.gpu_name === selectGpu && (
                <p>
                    gpu_name : {gpu.gpu_name}<br/>
                    gpu_mark : {gpu.gpu_mark}<br/>
                    gpu_rank : {gpu.gpu_rank}<br/>
                    gpu_value : {gpu.gpu_value}<br/>
                    gpu_price : {gpu.gpu_price}<br/>
                </p>
                    )))}
                <br/>
                {ramInfo.map((ram) => (
                    ram.ram_name === selectRam && (
                <p>
                    ram_name : {ram.ram_name}<br/>
                    ram_type : {ram.ram_type}<br/>
                    ram_size : {ram.ram_size}<br/>
                    ram_latency : {ram.ram_latency}<br/>
                    ram_read : {ram.ram_read}<br/>
                    ram_write : {ram.ram_write}<br/>
                </p>
                    )))}
                <br/>
            </div>
        </>
    );
}

export default SelectSpec;