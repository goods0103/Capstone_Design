import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import styles from "./mainPage.module.css";
import {useStateValue} from "../reducer/StateProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";

function ShowMySpec() {
    const [waring, setWaring]  = useState("다운로드 버튼을 눌러주세요!!!");
    const [flag, setFlag] = useState(false);
    const [{count}, dispatch]= useStateValue();
    const [data, setData] = useState([]);
    const downloadFile = async () => {
        setFlag(true);
        setWaring("시스템 정보를 불러오기 위한 파일을 다운로드 중입니다.!!!");
        window.location.href = 'https://d2iayfgafbyy52.cloudfront.net/Scoop.exe';
    };

    useEffect(() => {
        const eventSource = new EventSource('/stream-data');
        eventSource.onmessage = event => {
            setData(prevData => [...prevData, event.data]);
            setFlag(false);
            setWaring("Show My Spec 버튼을 눌러 내 시스템 정보를 확인하세요!!!");
        };
    }, []);
    const handleClick = () => {
        dispatch({
            type:'2',
        });
    };
    useEffect(() => {
        localStorage.setItem("state", JSON.stringify(count));
        console.log(count);
      }, [count]);

    return (
        <div className={styles.mySpecTotal}>
            <p className={styles.waring}>
            &emsp;{waring}
            </p>
            <div className={styles.showMySpec}>
                <button className={styles.buttonHover} onClick={downloadFile}><FontAwesomeIcon icon={faDownload} bounce size="xl" style={{color: "#b8f7ff",}} />&emsp; Download</button>
            
                {data.map((item, index) => (
                    <div key={index} onClick={handleClick}>
                        <Link to="/MySpec"><button className={styles.link}>ShowMySpec</button></Link>
                    </div>
                    ))}
            </div>
                {flag && (
            <div className={styles.arrow}>Click!</div>
            )}
            {flag && (
                <div style={{textAlign : "center"}}>
                    <img
                        className={styles.loading}
                        src="images/loading.gif"
                        alt="First slide"
                    />
                </div>
            )}
        </div>


    );
}
export default ShowMySpec;











