import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./category.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";
import {Link} from "react-router-dom";

function MyCategoryGpu() {

    const [gpuList, setGpuList] = useState([]);
    const [data2, setData2] = useState([]);


    useEffect(() => {
        if (data2) {
            const fetchData = async () => {
                console.log(data2);
                try {
                    const response = await axios.post('/myGpuRanking', `${data2}`);
                    setGpuList(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [data2]);

    useEffect(() => {
        setData2(localStorage.getItem('gpuData'));
    }, []);
    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const scrollToMySpec = (gpuName) => {
        const targetRow = document.querySelector(`tr[data-gpu-name="${gpuName}"]`);
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
                        <th className={styles.cssTh}>gpu_image</th>
                        <th className={styles.cssTh}>gpu_name</th>
                        <th className={styles.cssTh}>gpu_mark</th>
                        <th className={styles.cssTh}>gpu_rank</th>
                        <th className={styles.cssTh}>gpu_value</th>
                        <th className={styles.cssTh}>gpu_price</th>
                    </tr>
                    {gpuList.map((gpu) => (
                        <tr  data-gpu-name={gpu.gpuName}>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                borderLeft: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>
                                <img src="" alt="gpu_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>
                                <Link to={`/GpuSpec/${gpu.gpuId}`}>{gpu.gpuName}</Link></td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>
                                {gpu.gpuMark}</td>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                 borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>
                            {gpu.gpuRank}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>
                                {gpu.gpuValue}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",
                                borderRight: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>
                            {convertPrice(gpu.gpuPrice)}원</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default MyCategoryGpu;