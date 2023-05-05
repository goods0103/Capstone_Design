import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from 'react-router-dom';
import styles from "./eventBanner.module.css";

function ShowMySpec() {
    let waring = "시스템 정보를 불러오기 위한 파일을 다운로드 중입니다. 다운이 완료되면 실행 시켜 주세요!!!"
    const [flag, setFlag] = useState(false);

    const [data, setData] = useState([]);
    const downloadFile = async () => {
        setFlag(true);
        const response = await axios({
            url: 'http://localhost:12000/ShowMySpec',
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
        };
    }, []);


    return (
        <div>


            <p>
            &emsp;{waring}

                <button className={styles.button} onClick={downloadFile}>download</button>&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
                <Link to="/MySpec">
                    <button>develop button</button>
                </Link>
              
            </p>
            {data.map((item, index) => (
                <div key={index}>
                      <Link to="/MySpec"><button className={styles.link}>GotoMySpec</button></Link>
                </div>
                ))}
                {flag && (
            <div className={styles.arrow}>Click!</div>
            )}
            {flag && (
            <img
                className={styles.banner}
                src="images/loading.gif"
                alt="First slide"
            />
            )}
        </div>


    );
}
export default ShowMySpec;











