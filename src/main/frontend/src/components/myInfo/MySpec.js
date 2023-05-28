import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../mainPage/mainPage.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";
import {Link} from "react-router-dom";
import MyBottleNeck from "./MyBottleNeck";
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

    // useEffect(() => {
    //     axios.get('/myBottleNeck')
    //         .then(response => {
    //             setBottleNeckInfo(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <>


            <div className={styles2.bigFrame}>
                <div className={styles2.divParent}>
                    <ShowInsertInfo infoName={cpuInfo.cpuName} infoMark={cpuInfo.cpuMark} infoRank={cpuInfo.cpuRank} infoPrice={cpuInfo.cpuPrice}
                                    infoValue={cpuInfo.cpuValue} infoUrl="/images/product/cpuCategory02.png" infoId={cpuInfo.cpuId}/>



                    {/*<ShowInsertInfo infoName={"AMD Ryzen 5 5600X"} infoMark={"40397"} infoRank={"96"} infoPrice={"470388"}*/}
                    {/*                infoValue={"103.06"} infoUrl="/images/product/cpuCategory02.png"  infoId={"cpu"}/>*/}
                    <br/>
                    {/*&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;*/}

                            <ShowInsertInfoGpu infoName={gpuInfo.gpuName} infoMark={gpuInfo.gpuMark} infoRank={gpuInfo.gpuRank} infoPrice={gpuInfo.gpuPrice}
                                               infoValue={gpuInfo.gpuValue} infoUrl="/images/product/gpuCategory02.png" infoId={gpuInfo.gpuId}/>

                    {/*<ShowInsertInfoGpu infoName={"GeForce RTX 3070"} infoMark={"17685"} infoRank={"77"} infoPrice={"694080"}*/}
                    {/*                infoValue={"30.39"} infoUrl="/images/product/gpuCategory02.png" infoId={"gpu"}/>*/}
                    {/*&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;*/}
                    <br/>

                            <ShowInsertInfoRam infoName={ramInfo.ramName} infoType={ramInfo.ramType} infoSize={ramInfo.ramSize} infoLatency={ramInfo.ramLatency}
                                               infoRead={ramInfo.ramRead} infoWrite={ramInfo.ramWrite} infoUrl="/images/product/ramCategory01.png" infoId={ramInfo.ramId}/>
                    {/*<ShowInsertInfoRam infoName={"Samsung Ram"} infoType={"DDR4"} infoSize={"8GB"} infoLatency={"28"}*/}
                    {/*                   infoRead={"16.9"} infoWrite={"14.8"} infoUrl="/images/product/ramCategory01.png" infoId={"ram"}/>*/}
                    <br/>
                </div>
                <br/>
                {/*<div>*/}
                {/*    {!showComponent && <button type="submit"  onClick={showMyBottleNeck} className={styles.buttonSubmit}>BottleNeck</button>}*/}
                {/*    {showComponent && <MyBottleNeck/>}*/}
                {/*</div>*/}
                <div className={styles2.bottleNeckComp1}>
                    {!showComponent && mySpec.cpuName && mySpec.gpuName && <button type="submit"  onClick={showMyBottleNeck} className={styles2.buttonBottleNeck}><FontAwesomeIcon icon={faWineBottle} shake size="xl" />&emsp;BottleNeck</button>}
                    {showComponent && <InsertInfoBottleNeck/>}
                </div>
            </div>

        </>
    );
}

export default MySpec;