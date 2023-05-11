import React, {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import CategoryBar2 from "./CategoryBar2";
import styles from "./category.module.css"
import {Link} from "react-router-dom";
import Table from 'react-bootstrap/Table';

function MyCategoryCpu() {
    const [cpuList, setCpuList] = useState([]);
    const [data2, setData2] = useState([]);
    // hello
    useEffect(() => {
        if (data2) {
            const fetchData = async () => {
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
            window.scrollTo({top: y, behavior: "smooth"});
        }
    };
    return (
        <>
            <div>
                <button onClick={() => scrollToMySpec(data2)}>내 스펙으로 이동</button>
                <div className={styles.cssTable}>
                    <Table striped bordered hover variant="dark">
                        <thead>
                        <tr>
                            <th className={styles.cssTh}>Image</th>
                            <th className={styles.cssTh}>Name</th>
                            <th className={styles.cssTh}>Mark</th>
                            <th className={styles.cssTh}>Rank</th>
                            <th className={styles.cssTh}>Value</th>
                            <th className={styles.cssTh}>Price</th>
                        </tr>
                        </thead>
                        <tbody>
                        {cpuList.map((cpu) => (
                            <tr data-cpu-name={cpu.cpuName}>
                                <td className={data2 === cpu.cpuName ? `${styles.highlighted}` : ''}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                <td className={data2 === cpu.cpuName ? `${styles.highlighted}` : ''}><Link to={`/CpuSpec/${cpu.cpuId}`} className={styles.link}>{cpu.cpuName}</Link></td>
                                <td className={data2 === cpu.cpuName ? `${styles.highlighted}` : ''}>{cpu.cpuMark}</td>
                                <td className={data2 === cpu.cpuName ? `${styles.highlighted}` : ''}>{cpu.cpuRank}</td>
                                <td className={data2 === cpu.cpuName ? `${styles.highlighted}` : ''}>{cpu.cpuValue}</td>
                                <td className={data2 === cpu.cpuName ? `${styles.highlighted}` : ''}>{convertPrice(cpu.cpuPrice)}원</td>
                            </tr>
                        ))}
                        </tbody>
                    </Table>
                </div>
            </div>
        </>
    );
}

export default MyCategoryCpu;