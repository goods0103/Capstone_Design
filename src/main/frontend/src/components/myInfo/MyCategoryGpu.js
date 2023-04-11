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
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/gpu1');
                setGpuList(response.data);
                setData2(localStorage.getItem('gpuData'));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };
    const scrollToMySpec = () => {
        window.scrollTo({ top: document.body.scrollHeight/2, behavior: 'smooth' });
    };

    return (
        <>
            <CategoryBar2></CategoryBar2>
            <button onClick={scrollToMySpec}>내 스펙으로 이동</button>
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
                        <tr>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                borderLeft: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white"}}>
                                <img src="" alt="gpu_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white"}}>
                                <Link to={`/GpuSpec/${gpu.gpu_id}`}>{gpu.gpu_name}</Link></td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white"}}>
                                {gpu.gpu_mark}</td>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                 borderTop: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white"}}>
                            {gpu.gpu_rank}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white"}}>
                                {gpu.gpu_value}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white",
                                borderRight: data2 === gpu.gpu_name ? "2px solid red" : "1px solid white"}}>
                            {convertPrice(gpu.gpu_price)}원</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default MyCategoryGpu;