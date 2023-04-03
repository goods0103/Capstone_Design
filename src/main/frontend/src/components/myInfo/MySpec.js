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
            <div>
                <p>
                    {cpuInfo.cpu_name}<br/>
                    {cpuInfo.cpu_mark}<br/>
                    {cpuInfo.cpu_rank}<br/>
                    {cpuInfo.cpu_value}<br/>
                    {cpuInfo.cpu_price}<br/>
                </p>
                <br/>
                <p>
                    {gpuInfo.gpu_name}<br/>
                    {gpuInfo.gpu_mark}<br/>
                    {gpuInfo.gpu_rank}<br/>
                    {gpuInfo.gpu_value}<br/>
                    {gpuInfo.gpu_price}<br/>
                </p>
                <br/>
                <p>
                    {ramInfo.ram_name}<br/>
                    {ramInfo.ram_type}<br/>
                    {ramInfo.ram_size}<br/>
                    {ramInfo.ram_latency}<br/>
                    {ramInfo.ram_read}<br/>
                    {ramInfo.ram_write}<br/>
                </p>
                <br/>
            </div>
        </>
    );
}

export default MySpec;