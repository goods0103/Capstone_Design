import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import styles from "./eventBanner.module.css";
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
        const response = await axios({
            url: 'https://cb30-2001-2d8-ed10-5c8b-fe-494c-7de0-cdd3.ngrok-free.app/ShowMySpec',
            method: 'GET',
            responseType: 'blob', // 파일 다운로드를 위한 설정
        });

        // 파일 다운로드를 위한 코드
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'Scoop.exe');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
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
                <button className={styles.buttonHover} onClick={downloadFile}><FontAwesomeIcon icon={faDownload} bounce size="xl" style={{color: "#b8f7ff",}} />&emsp; Download</button>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;

              
            
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
            <img
                className={styles.loading}
                src="images/loading.gif"
                alt="First slide"
            />
            )}
        </div>


    );
}
export default ShowMySpec;











