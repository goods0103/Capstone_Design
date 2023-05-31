import React, { useEffect, useState } from "react";
import axios from "axios";
import styles2 from "../insertInfo/category.module.css";
import ShowInsertInfo from "../insertInfo/ShowInsertInfo";
import ShowInsertInfoGpu from "../insertInfo/ShowInsertInfoGpu";
import ShowInsertInfoRam from "../insertInfo/ShowInsertInfoRam";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faWineBottle} from "@fortawesome/free-solid-svg-icons";
import InsertInfoBottleNeck from "../insertInfo/InsertInfoBottleNeck";

function MySpec() {
    const [cpuInfo, setCpuInfo] = useState([]);
    const [gpuInfo, setGpuInfo] = useState([]);
    const [ramInfo, setRamInfo] = useState([]);
    const [mySpec, setMySpec] = useState([]);

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
    function showMyBottleNeck() {
        setShowComponent(true);
    }

    // hello
    useEffect(() => {
        const fetchData = async () => {
            try {
                if(mySpec){
                    localStorage.setItem('cpuData', mySpec.selectedCpu)
                    if(mySpec.selectedCpu !== "none"){

                    const response = await axios.post('/find_cpu_name', `${mySpec.selectedCpu}`);
                    setCpuInfo(response.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [mySpec]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(mySpec){
                    localStorage.setItem('gpuData', mySpec.selectedGpu)
                    if(mySpec.selectedGpu !== "none") {
                        const response = await axios.post('/find_gpu_name', `${mySpec.selectedGpu}`);
                        setGpuInfo(response.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [mySpec]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                if(mySpec){
                    localStorage.setItem('ramData', mySpec.selectedRam)
                    if(mySpec.selectedRam !== "none") {
                        // const ramValue = mySpec.selectedRam !== null ? mySpec.selectedRam : "ramNull";
                        const response = await axios.post('/find_ram_name', `${mySpec.selectedRam}`);
                        // const response = await axios.post('/find_ram_name', ramValue);
                        setRamInfo(response.data);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [mySpec]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/mySpec');
                setMySpec(response.data);
                console.log(response.data);

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
                    <ShowInsertInfo infoName={cpuInfo.cpuName} infoMark={cpuInfo.cpuMark} infoRank={cpuInfo.cpuRank} infoPrice={cpuInfo.cpuPrice}
                                    infoValue={cpuInfo.cpuValue} infoUrl="/images/product/cpuCategory02.png" infoId={cpuInfo.cpuId}/>

                    <br/>

                            <ShowInsertInfoGpu infoName={gpuInfo.gpuName} infoMark={gpuInfo.gpuMark} infoRank={gpuInfo.gpuRank} infoPrice={gpuInfo.gpuPrice}
                                               infoValue={gpuInfo.gpuValue} infoUrl="/images/product/gpuCategory02.png" infoId={gpuInfo.gpuId}/>

                    <br/>

                            <ShowInsertInfoRam infoName={ramInfo.ramName} infoType={ramInfo.ramType} infoSize={ramInfo.ramSize} infoLatency={ramInfo.ramLatency}
                                               infoRead={ramInfo.ramRead} infoWrite={ramInfo.ramWrite} infoUrl="/images/product/ramCategory01.png" infoId={ramInfo.ramId}/>
                    <br/>
                </div>
                <br/>
                <div className={styles2.bottleNeckComp1}>
                    {!showComponent && mySpec.selectedCpu && mySpec.selectedGpu && <button type="submit"  onClick={showMyBottleNeck} className={styles2.buttonBottleNeck}><FontAwesomeIcon icon={faWineBottle} shake size="xl" />&emsp;BottleNeck</button>}
                    {showComponent && <InsertInfoBottleNeck/>}
                </div>
            </div>

        </>
    );
}

export default MySpec;