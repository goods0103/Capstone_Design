import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./category.module.css"
import CategoryBar2 from "./CategoryBar2";


function MyCategoryRam() {
    const [ramList, setRamList] = useState([]);
    const [data2, setData2] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/ram1');
                setRamList(response.data);
                setData2(localStorage.getItem('ramData'));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    const scrollToMySpec = (ramName) => {
        const targetRow = document.querySelector(`tr[data-ram-name="${ramName}"]`);
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
                        <th className={styles.cssTh}>ram_image</th>
                        <th className={styles.cssTh}>ram_name</th>
                        <th className={styles.cssTh}>ram_size</th>
                        <th className={styles.cssTh}>ram_latency</th>
                        <th className={styles.cssTh}>ram_read</th>
                        <th className={styles.cssTh}>ram_write</th>
                    </tr>
                    {ramList.map((ram) => (
                        <tr  data-ram-name={ram.ramName}
                             onClick={() => scrollToMySpec(ram.ramName)}
                        >
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderLeft: data2 === ram.ramName ? "2px solid red" : "1px solid white"}}>
                            <img src="" alt="ram_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ramName ? "2px solid red" : "1px solid white"}}>
                                {ram.ramName}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ramName ? "2px solid red" : "1px solid white"}}>
                                {ram.ramSize}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ramName ? "2px solid red" : "1px solid white"}}>
                                {ram.ramLatency}</td>
                            <td className={styles.cssTd} style={{
                                borderBottom: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ramName ? "2px solid red" : "1px solid white"}}>
                                {ram.ramRead}</td>
                            <td className={styles.cssTd}  style={{
                                borderBottom: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderTop: data2 === ram.ramName ? "2px solid red" : "1px solid white",
                                borderRight: data2 === ram.ramName ? "2px solid red" : "1px solid white"}}>
                                {ram.ramWrite}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default MyCategoryRam;