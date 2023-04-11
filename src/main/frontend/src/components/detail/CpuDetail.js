import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./detail.module.css";
import {Link} from "react-router-dom";

function CpuDetail() {
    const [cpuInfo, setCpuInfo] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    console.log(lastPart);

    useEffect(() => {
        axios.post('/cpuid', { lastPart })
            .then(response => {
                setCpuInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    return(
        <>
            <Link to={`/cpuCompare/?id=${lastPart}`}><button>비교하기</button></Link>
            <div>
                <p>
                Class: Desktop                Socket: AM4 <br/>

                Clockspeed: 3.7 GHz           Turbo Speed: 4.6 GHz<br/>

                Cores: 6 Threads: 12          Typical TDP: 65 W<br/>

                Cache Size: L1: 384 KB, L2: 3.0 MB, L3: 32 MB<br/>

                Other names: AMD Ryzen 5 5600X 6-Core Processor<br/>

                CPU First Seen on Charts: Q4 2020<br/>

                CPUmark/$Price: 136.81<br/>

                Overall Rank: 328<br/>

                Last Price Change: $160.44 USD (2023-04-10) <br/>
                </p>
            </div>
            <div>
                <h3>similar rank</h3>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>cpu_image</th>
                        <th className={styles.cssTh}>cpu_name</th>
                        <th className={styles.cssTh}>cpu_rank</th>
                    </tr>
                </table>
            </div>
            <div>
                <h3>similar value</h3>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>cpu_image</th>
                        <th className={styles.cssTh}>cpu_name</th>
                        <th className={styles.cssTh}>cpu_value</th>
                    </tr>
                </table>
            </div>
            <div>
                <h3>유명</h3>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>cpu_image</th>
                        <th className={styles.cssTh}>cpu_name</th>
                        <th className={styles.cssTh}>cpu_rank</th>
                        <th className={styles.cssTh}>cpu_price</th>
                    </tr>
                </table>
            </div>

        </>
    );
}


export default CpuDetail;