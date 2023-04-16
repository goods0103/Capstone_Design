import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";
import {Link} from "react-router-dom";
import MyBottleNeck from "./MyBottleNeck";

function MySpec() {

    const [cpuInfo, setCpuInfo] = useState([]);
    const [gpuInfo, setGpuInfo] = useState([]);
    const [ramInfo, setRamInfo] = useState([]);
    const [bottleNeckInfo, setBottleNeckInfo] = useState([]);
    const [showComponent, setShowComponent] = useState(false);

    function showMyBottleNeck() {
        setShowComponent(true);
    }

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

    useEffect(() => {
        axios.get('/myBottleNeck')
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
            <CategoryBar2></CategoryBar2>
            {localStorage.setItem('cpuData', cpuInfo.cpuName)}
            {localStorage.setItem('gpuData', gpuInfo.gpuName)}
            {localStorage.setItem('ramData', ramInfo.ramName)}


            <div>
                <p>
                    cpu_name : {cpuInfo.cpuName}<br/>
                    cpu_mark : {cpuInfo.cpuMark}<br/>
                    cpu_rank : {cpuInfo.cpuRank}<br/>
                    cpu_value : {cpuInfo.cpuValue}<br/>
                    cpu_price : {cpuInfo.cpuPrice}<br/>
                </p>
                <br/>
                <p>
                    gpu_name : {gpuInfo.gpuName}<br/>
                    gpu_mark : {gpuInfo.gpuMark}<br/>
                    gpu_rank : {gpuInfo.gpuRank}<br/>
                    gpu_value : {gpuInfo.gpuValue}<br/>
                    gpu_price : {gpuInfo.gpuPrice}<br/>
                </p>
                <br/>
                <p>
                    ram_name : {ramInfo.ramName}<br/>
                    ram_type : {ramInfo.ramType}<br/>
                    ram_size : {ramInfo.ramSize}<br/>
                    ram_latency : {ramInfo.ramLatency}<br/>
                    ram_read : {ramInfo.ramRead}<br/>
                    ram_write : {ramInfo.ramWrite}<br/>
                </p>
                <br/>
            </div>
            {!showComponent && <button type="submit"  onClick={showMyBottleNeck} className={styles.buttonSubmit}>BottleNeck</button>}
            {showComponent && <MyBottleNeck bottleneck={bottleNeckInfo}/>}
        </>
    );
}

export default MySpec;