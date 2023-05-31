import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./category.module.css"
import CategoryBar3 from "./CategoryBar3";
import Table from "react-bootstrap/Table";


function InsertCategoryRam() {
    const [ramList, setRamList] = useState([]);
    const [data2, setData2] = useState("");

    useEffect(() => {
        if (data2) {
            const fetchData = async () => {
                try {
                    const response = await axios.post('/myRamRanking', `${data2}`);
                    setRamList(response.data);
                } catch (error) {
                    console.log(error);
                }
            };

            fetchData();
        }
    }, [data2]);

    useEffect(() => {
        setData2(localStorage.getItem('selectRamData'));
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
            <div className={styles.bigFrame}>
            <button className={styles.move} onClick={() => scrollToMySpec(data2)}>내 스펙으로 이동</button>
                <div className={styles.cssTable}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th className={styles.cssTh}>name</th>
                            <th className={styles.cssTh}>size</th>
                            <th className={styles.cssTh}>latency</th>
                            <th className={styles.cssTh}>read</th>
                            <th className={styles.cssTh}>write</th>
                        </tr>
                        </thead>
                        <tbody>
                        {ramList.map((ram) => (
                            data2 === ram.ramName ? (
                                    <tr className={styles.mySpecInfoHover} data-ram-name={ram.ramName}>
                                        <td className={styles.mySpecInfo}>{ram.ramName}</td>
                                        <td className={styles.mySpecInfo}>{ram.ramSize}</td>
                                        <td className={styles.mySpecInfo}>{ram.ramLatency}</td>
                                        <td className={styles.mySpecInfo}>{ram.ramRead}</td>
                                        <td className={styles.mySpecInfo}>{ram.ramWrite}</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td>{ram.ramName}</td>
                                        <td>{ram.ramSize}</td>
                                        <td>{ram.ramLatency}</td>
                                        <td>{ram.ramRead}</td>
                                        <td>{ram.ramWrite}</td>
                                    </tr>
                                )
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default InsertCategoryRam;