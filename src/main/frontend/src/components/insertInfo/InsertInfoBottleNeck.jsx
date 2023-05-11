import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./category.module.css"
import {Link} from "react-router-dom";
import {buildStyles, CircularProgressbar} from "react-circular-progressbar";
// import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { easeQuadInOut } from "d3-ease";
import AnimatedProgressProvider from "./AnimatedProgressProvider";
import ChangingProgressProvider from "./ChangingProgressProvider";


function InsertInfoBottleNeck() {
    const [postData, setPostData] = useState({
        cpuName: '',
        gpuName: ''
    });
    const [bottleNeck, setBottleNeck] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];

    const percentage = 66;

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
            <div className={styles.bottleNeckComp}>
                <p> 프로세서 {bottleNeck.cpuInfo}가 {bottleNeck.cpuBottleNeckValue}% 활용되고 그래픽 카드 {bottleNeck.gpuInfo}가 {bottleNeck.gpuBottleNeckValue}% 활용됩니다.</p>
                <div className={styles.CircularChart}>
                    <AnimatedProgressProvider
                        valueStart={0}
                        valueEnd={86}
                        duration={2.4}
                        easingFunction={easeQuadInOut}
                        repeat
                    >
                        {value => {
                            const roundedValue = Math.round(value);
                            return (
                                <CircularProgressbar
                                    value={value}
                                    text={`${roundedValue}%`}
                                    /* This is important to include, because if you're fully managing the
                              animation yourself, you'll want to disable the CSS animation. */
                                    styles={buildStyles({ pathTransition: "none" })}
                                />
                            );
                        }}
                    </AnimatedProgressProvider>
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        background
                        backgroundPadding={6}
                        styles={buildStyles({
                            backgroundColor: "#3e98c7",
                            textColor: "#fff",
                            pathColor: "#fff",
                            trailColor: "transparent"
                        })}
                    />
                    <ChangingProgressProvider values={[0, 20, 80]}>
                        {value => (
                            <CircularProgressbar
                                value={value}
                                text={`${value}%`}
                                circleRatio={0.75}
                                styles={buildStyles({
                                    rotation: 1 / 2 + 1 / 8,
                                    strokeLinecap: "butt",
                                    trailColor: "#eee"
                                })}
                            />
                        )}
                    </ChangingProgressProvider>
                </div>
                <p>{Math.abs(bottleNeck.cpuBottleNeckValue-bottleNeck.gpuBottleNeckValue)}%의 병목 현상이 있습니다.</p>
            </div>

        </>
    );
}

export default InsertInfoBottleNeck;