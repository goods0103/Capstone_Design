import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import Select from "react-select";
import CategoryBar3 from "./CategoryBar3";
import styles from "./category.module.css"
import {Link} from "react-router-dom";

function InsertCategoryCpu() {
    const [cpuList, setCpuList] = useState([]);
    const [data2, setData2] = useState("");
    const tableRef = useRef(null);

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
        setData2(localStorage.getItem('selectCpuData'));
    }, []);


    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };


    const scrollToMySpec = () => {
        // window.scrollTo({ top: document.body.scrollHeight/2, behavior: 'smooth' });
        if (tableRef.current) {
            const row = tableRef.current.rows[30]; // 0번째부터 시작하므로 5번째 행은 4입니다
            row.scrollIntoView({ behavior: 'smooth' }); // smooth하게 스크롤링됩니다
        }
    };

    // useEffect(() => {
    //     // tableRef가 설정될 때마다, 5번째 행으로 스크롤바를 이동시킴
    //     if (tableRef.current) {
    //         const row = tableRef.current.rows[10]; // 0번째부터 시작하므로 5번째 행은 4입니다
    //         row.scrollIntoView({ behavior: 'smooth' }); // smooth하게 스크롤링됩니다
    //     }
    // }, [tableRef, cpuList]);

    return (
        <>
            <CategoryBar3></CategoryBar3>
            <button onClick={scrollToMySpec}>내 스펙으로 이동</button>
            <div>
                {/*<div className={styles.filter}>*/}
                {/*    /!*<p onClick={() => sortProduct("name")}>이름순</p>*!/*/}
                {/*    <p onClick={() => sortProduct("low")}>낮은 가격</p>*/}
                {/*    <p onClick={() => sortProduct("high")}>높은 가격</p>*/}
                {/*    <p onClick={() => sortProduct("rankHigh")}>cpu 순위 ⬆️</p>*/}
                {/*    <p onClick={() => sortProduct("rankLow")}>cpu 순위 ⬇️</p>*/}
                {/*</div>*/}
                <table className={styles.cssTable} ref={tableRef}>
                    <tr>
                        <th className={styles.cssTh}>cpu_image</th>
                        <th className={styles.cssTh}>cpu_name</th>
                        <th className={styles.cssTh}>cpu_rank</th>
                        <th className={styles.cssTh}>cpu_value</th>
                        <th className={styles.cssTh}>cpu_price</th>
                    </tr>
                    {cpuList.map((cpu) => (
                        <tr>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                                borderLeft: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white"
                            }}><img src="" alt="cpu_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                            }}><Link to={`/CpuSpec/${cpu.cpu_id}`}>{cpu.cpu_name}</Link></td>

                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                            }}>{cpu.cpu_rank}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                            }}>{cpu.cpu_value}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white",
                                borderRight: data2 === cpu.cpu_name ? "2px solid red" : "1px solid white"
                            }}>{convertPrice(cpu.cpu_price)}원</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default InsertCategoryCpu;