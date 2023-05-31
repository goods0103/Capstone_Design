import React, { useEffect, useState } from "react";
import axios from "axios";
import ShowInsertInfo from "./ShowInsertInfo";
import ShowInsertInfoRam from "./ShowInsertInfoRam";
import styles2 from "./category.module.css"
import ShowInsertInfoGpu from "./ShowInsertInfoGpu";
import InsertInfoBottleNeck from "./InsertInfoBottleNeck";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWineBottle} from "@fortawesome/free-solid-svg-icons";

function SelectSpec() {

    const [cpuInfo, setCpuInfo] = useState([]);
    const [gpuInfo, setGpuInfo] = useState([]);
    const [ramInfo, setRamInfo] = useState([]);

    const [selectCpu, setSelectCpu] = useState([]);
    const [selectGpu, setSelectGpu] = useState([]);
    const [selectRam, setSelectRam] = useState([]);
    const [bottleNeckInfo, setBottleNeckInfo] = useState([]);
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        document.body.style.backgroundColor = '#F0F6F8';
        document.body.style.color = "black";
        return () => {
            document.body.style.backgroundColor = '#151515';
            document.body.style.color = "white";
        };
    }, []);
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
            <div className={styles2.bigFrame}>
                <div className={styles2.divParent}>
                    {cpuInfo.map((cpu) => (
                        cpu.cpuName === selectCpu && (
                            <ShowInsertInfo infoName={cpu.cpuName} infoMark={cpu.cpuMark} infoRank={cpu.cpuRank} infoPrice={cpu.cpuPrice}
                                            infoValue={cpu.cpuValue} infoUrl="/images/product/cpuCategory02.png" infoId={cpu.cpuId}/>
                        )))}
                    <br/>
                    {gpuInfo.map((gpu) => (
                        gpu.gpuName === selectGpu && (
                            <ShowInsertInfoGpu infoName={gpu.gpuName} infoMark={gpu.gpuMark} infoRank={gpu.gpuRank} infoPrice={gpu.gpuPrice}
                                               infoValue={gpu.gpuValue} infoUrl="/images/product/gpuCategory02.png" infoId={gpu.gpuId}/>
                        )))}
                    <br/>
                    {ramInfo.map((ram) => (
                        ram.ramName === selectRam && (
                            <ShowInsertInfoRam infoName={ram.ramName} infoType={ram.ramType} infoSize={ram.ramSize} infoLatency={ram.ramLatency}
                                               infoRead={ram.ramRead} infoWrite={ram.ramWrite} infoUrl="/images/product/ramCategory01.png" infoId={ram.ramId}/>
                        )))}
                    <br/>
                </div>
                <br/>
                <div className={styles2.bottleNeckComp1}>
                    {!showComponent && <button type="submit"  onClick={showMyBottleNeck} className={styles2.buttonBottleNeck}><FontAwesomeIcon icon={faWineBottle} shake size="xl" />&emsp;BottleNeck</button>}
                    {showComponent && <InsertInfoBottleNeck info={showComponent}/>}
                </div>
            </div>
        </>
    );
}

export default SelectSpec;