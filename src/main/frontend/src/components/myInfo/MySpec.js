import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";

function MySpec() {

    const [cpuInfo, setCpuInfo] = useState([]);
    const [gpuInfo, setGpuInfo] = useState([]);
    const [ramInfo, setRamInfo] = useState([]);

    // hello
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/mySpecCpu');
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
                const response = await axios.get('/mySpecGpu');
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
                const response = await axios.get('/mySpecRam');
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
            <CategoryBar2></CategoryBar2>
            {localStorage.setItem('cpuData', cpuInfo.cpu_name)}
            {localStorage.setItem('gpuData', gpuInfo.gpu_name)}
            {localStorage.setItem('ramData', ramInfo.ram_name)}
            <div>
                <p>
                    cpu_name : {cpuInfo.cpu_name}<br/>
                    cpu_mark : {cpuInfo.cpu_mark}<br/>
                    cpu_rank : {cpuInfo.cpu_rank}<br/>
                    cpu_value : {cpuInfo.cpu_value}<br/>
                    cpu_price : {cpuInfo.cpu_price}<br/>
                </p>
                <br/>
                <p>
                    gpu_name : {gpuInfo.gpu_name}<br/>
                    gpu_mark : {gpuInfo.gpu_mark}<br/>
                    gpu_rank : {gpuInfo.gpu_rank}<br/>
                    gpu_value : {gpuInfo.gpu_value}<br/>
                    gpu_price : {gpuInfo.gpu_price}<br/>
                </p>
                <br/>
                <p>
                    ram_name : {ramInfo.ram_name}<br/>
                    ram_type : {ramInfo.ram_type}<br/>
                    ram_size : {ramInfo.ram_size}<br/>
                    ram_latency : {ramInfo.ram_latency}<br/>
                    ram_read : {ramInfo.ram_read}<br/>
                    ram_write : {ramInfo.ram_write}<br/>
                </p>
                <br/>
            </div>
        </>
    );
}

export default MySpec;