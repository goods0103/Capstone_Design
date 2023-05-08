import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar3 from "./CategoryBar3";
import CategoryBar from "../category/CategoryBar";
import MyBottleNeck from "../myInfo/MyBottleNeck";
import ShowInsertInfo from "./ShowInsertInfo";
import ShowInsertInfoRam from "./ShowInsertInfoRam";
import styles2 from "./category.module.css"


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

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <>
            <div className={styles2.divParent}>
                {cpuInfo.map((cpu) => (
                    cpu.cpuName === selectCpu && (
                        <div className={styles2.divChild}>
                            <ShowInsertInfo infoName={cpu.cpuName} infoMark={cpu.cpuMark} infoRank={cpu.cpuRank} infoPrice={cpu.cpuPrice}
                                            infoValue={cpu.cpuValue} infoUrl="/images/product/cpuCategory01.png" infoCategory="cpu" infoId={cpu.cpuId}/>
                        </div>
                    )))}
                <br/>
                {gpuInfo.map((gpu) => (
                    gpu.gpuName === selectGpu && (
                        <div className={styles2.divChild}>
                            <ShowInsertInfo infoName={gpu.gpuName} infoMark={gpu.gpuMark} infoRank={gpu.gpuRank} infoPrice={gpu.gpuPrice}
                                            infoValue={gpu.gpuValue} infoUrl="/images/product/gpuCategory01.png" infoCategory="gpu" infoId={gpu.gpuId}/>
                        </div>
                    )))}
                <br/>
                {ramInfo.map((ram) => (
                    // src/main/frontend/public/images/product/ramCategory01.png
                    ram.ramName === selectRam && (
                        <div className={styles2.divChild}>
                            <ShowInsertInfoRam infoName={ram.ramName} infoType={ram.ramType} infoSize={ram.ramSize} infoLatency={ram.ramLatency}
                                            infoRead={ram.ramRead} infoWrite={ram.ramWrite} infoUrl="/images/product/ramCategory01.png" infoId={ram.ramId}/>
                        </div>
                    )))}
                <br/>
            </div>
            <br/>
            {!showComponent && <button type="submit"  onClick={showMyBottleNeck} className={styles.buttonSubmit}>BottleNeck</button>}
            {showComponent && <MyBottleNeck/>}
        </>
    );
}

export default SelectSpec;