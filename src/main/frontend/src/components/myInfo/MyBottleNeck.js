import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import CategoryBar2 from "./CategoryBar2";
import styles from "./category.module.css"
import {Link} from "react-router-dom";
import {CircularProgressbar} from "react-circular-progressbar";

function MyBottleNeck() {
    const [postData, setPostData] = useState({
        cpuName: '',
        gpuName: ''
    });
    const [bottleNeck, setBottleNeck] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    useEffect(() => {
        if(lastPart === "MySpec"){
            console.log("hi1");
            const cpuData = localStorage.getItem('cpuData');
            const gpuData = localStorage.getItem('gpuData');
            setPostData({ cpuName: cpuData, gpuName: gpuData });
        }
        else if(lastPart === "SelectSpec"){
            console.log("hi2");
            const cpuData = localStorage.getItem('selectCpuData');
            const gpuData = localStorage.getItem('selectGpuData');
            setPostData({ cpuName: cpuData, gpuName: gpuData });
        }
    }, []);

    useEffect(() => {
        if (postData.cpuName && postData.gpuName) {
            const fetchData = async () => {
                try {
                    const response = await axios.post('/selectedBottleNeck', postData);
                    setBottleNeck(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [postData]);

    return (
        <>
            <p> 프로세서 {bottleNeck.cpuInfo}가 {bottleNeck.cpuBottleNeckValue}% 활용되고 그래픽 카드 {bottleNeck.gpuInfo}가 {bottleNeck.gpuBottleNeckValue}% 활용됩니다.</p>
            <div className={styles.CircularChart}>
                <CircularProgressbar value={Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)} text={`${Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}%`} />
            </div>
            <p>{Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}%의 병목 현상이 있습니다.</p>
        </>
    );
}

export default MyBottleNeck;