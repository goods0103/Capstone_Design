import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import CategoryBar2 from "./CategoryBar2";
import styles from "./category.module.css"
import {Link} from "react-router-dom";

function MyCategoryCpu() {
    const [cpuList, setCpuList] = useState([]);
    const [data2, setData2] = useState([]);
    // hello
    useEffect(() => {
        if (data2) {
            const fetchData = async () => {
                console.log(data2);
                try {
                    const response = await axios.post('/myCpuRanking', `${data2}`);
                    setCpuList(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [data2]);

    useEffect(() => {
        setData2(localStorage.getItem('cpuData'));
    }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const scrollToMySpec = (cpuName) => {
        const targetRow = document.querySelector(`tr[data-cpu-name="${cpuName}"]`);
        if (targetRow) {
            const yOffset = -50; // optional offset to adjust scroll position
            const y = targetRow.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };
    return (
        <>
            <CategoryBar2></CategoryBar2>
            <button onClick={() => scrollToMySpec(data2)}>내 스펙으로 이동</button>
            <div>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>cpu_image</th>
                        <th className={styles.cssTh}>cpuName</th>
                        <th className={styles.cssTh}>cpu_rank</th>
                        <th className={styles.cssTh}>cpu_value</th>
                        <th className={styles.cssTh}>cpu_price</th>
                    </tr>
                    {cpuList.map((cpu) => (
                        <tr  data-cpu-name={cpu.cpuName}
                             onClick={() => scrollToMySpec(cpu.cpuName)}
                        >
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                                borderLeft: data2 === cpu.cpuName ? "2px solid red" : "1px solid white"
                            }}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                            }}><Link to={`/CpuSpec/${cpu.cpuId}`}>{cpu.cpuName}</Link></td>

                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                            }}>{cpu.cpuRank}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                            }}>{cpu.cpuValue}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpuName ? "2px solid red" : "1px solid white",
                                borderRight: data2 === cpu.cpuName ? "2px solid red" : "1px solid white"
                            }}>{convertPrice(cpu.cpuPrice)}원</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default MyCategoryCpu;