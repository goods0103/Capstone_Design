import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./category.module.css"
import CategoryBar3 from "./CategoryBar3";


function InsertCategoryRam() {
    const [ramList, setRamList] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/ram1');
                setRamList(response.data);
                setData2(localStorage.getItem('selectRamData'));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    const scrollToMySpec = () => {
        window.scrollTo({ top: document.body.scrollHeight/2, behavior: 'smooth' });
    };
    return (
        <>
            <CategoryBar3></CategoryBar3>
            <button onClick={scrollToMySpec}>내 스펙으로 이동</button>
            <div>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>ram_image</th>
                        <th className={styles.cssTh}>ram_name</th>
                        <th className={styles.cssTh}>ram_size</th>
                        <th className={styles.cssTh}>ram_latency</th>
                        <th className={styles.cssTh}>ram_read</th>
                        <th className={styles.cssTh}>ram_write</th>
                    </tr>
                    {ramList.map((ram) => (
                        <tr>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderLeft: data2 === ram.ram_name ? "2px solid red" : "1px solid white"}}>
                            <img src="" alt="ram_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ram_name ? "2px solid red" : "1px solid white"}}>
                                {ram.ram_name}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ram_name ? "2px solid red" : "1px solid white"}}>
                                {ram.ram_size}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ram_name ? "2px solid red" : "1px solid white"}}>
                                {ram.ram_latency}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ram_name ? "2px solid red" : "1px solid white"}}>
                                {ram.ram_read}</td>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ram_name ? "2px solid red" : "1px solid white",
                                borderRight: data2 === ram.ram_name ? "2px solid red" : "1px solid white"}}>
                                {ram.ram_write}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default InsertCategoryRam;