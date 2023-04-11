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
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/cpu1');
                setCpuList(response.data);
                setData2(localStorage.getItem('cpuData'));

            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    // const sortProduct = (type) => {
    //     if (type === "low") {
    //         const newProduct = [...cpuList];
    //         newProduct.sort((a, b) => {
    //             if (a.cpu_price === 0 && b.cpu_price === 0) {
    //                 return 0; // 두 객체 모두 cpu_price가 0인 경우에는 순서를 유지
    //             } else if (a.cpu_price === 0) {
    //                 return 1; // a.cpu_price가 0이고 b.cpu_price가 0이 아닌 경우 b를 먼저 위치시킴
    //             } else if (b.cpu_price === 0) {
    //                 return -1; // a.cpu_price가 0이 아니고 b.cpu_price가 0인 경우 a를 먼저 위치시킴
    //             } else {
    //                 return a.cpu_price - b.cpu_price; // 두 객체 모두 cpu_price가 0이 아닌 경우 cpu_price 기준으로 정렬
    //             }
    //         });
    //         setCpuList(newProduct);
    //     } else if (type === "high") {
    //         const newProduct = [...cpuList];
    //         newProduct.sort((a, b) => b.cpu_price - a.cpu_price);
    //         setCpuList(newProduct);
    //     } else if (type === "rankLow") {
    //         const newProduct = [...cpuList];
    //         newProduct.sort((a, b) => b.cpu_rank - a.cpu_rank);
    //         setCpuList(newProduct);
    //     } else if (type === "rankHigh") {
    //         const newProduct = [...cpuList];
    //         newProduct.sort((a, b) => a.cpu_rank - b.cpu_rank);
    //         setCpuList(newProduct);
    //
    //     }
    // };
    const scrollToMySpec = () => {
        window.scrollTo({ top: document.body.scrollHeight/2, behavior: 'smooth' });
    };
    return (
        <>
            <CategoryBar2></CategoryBar2>
            <button onClick={scrollToMySpec}>내 스펙으로 이동</button>
            <div>
                {/*<div className={styles.filter}>*/}
                {/*    /!*<p onClick={() => sortProduct("name")}>이름순</p>*!/*/}
                {/*    <p onClick={() => sortProduct("low")}>낮은 가격</p>*/}
                {/*    <p onClick={() => sortProduct("high")}>높은 가격</p>*/}
                {/*    <p onClick={() => sortProduct("rankHigh")}>cpu 순위 ⬆️</p>*/}
                {/*    <p onClick={() => sortProduct("rankLow")}>cpu 순위 ⬇️</p>*/}
                {/*</div>*/}
                <table className={styles.cssTable}>
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

export default MyCategoryCpu;