import React, {useEffect, useState} from "react";
import axios from "axios";
import Select from "react-select";
import CategoryBar2 from "./CategoryBar2";
import styles from "./category.module.css"
import {Link} from "react-router-dom";
import Table from 'react-bootstrap/Table';

function MyCategoryCpu() {
    const [cpuList, setCpuList] = useState([]);
    const [data2, setData2] = useState("");
    // hello
    useEffect(() => {
        if (data2) {
            console.log(data2);
            const encodedData = encodeURIComponent(data2);
            const fetchData = async () => {
                try {
                    const response = await axios.post('/myCpuRanking', encodedData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        transformRequest: [(data) => data],
                    });
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
            <div className={styles.bigFrame}>
                {data2 !== "none" &&
                    <button className={styles.move} onClick={() => scrollToMySpec(data2)}>내 스펙으로 이동</button>
                }
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
                            data2 === cpu.cpuName ? (
                                    <tr className={styles.mySpecInfoHover} data-cpu-name={cpu.cpuName}>
                                        <td className={styles.mySpecInfo}><img src={cpu.cpuUrl} alt="cpu_image"
                                                                               className={styles.tableImg}/></td>
                                        <td className={styles.mySpecInfo}><Link to={`/CpuSpec/${cpu.cpuId}`}
                                                                                className={styles.myLink}>{cpu.cpuName}</Link>
                                        </td>
                                        <td className={styles.mySpecInfo}>{cpu.cpuMark}</td>
                                        <td className={styles.mySpecInfo}>{cpu.cpuRank}</td>
                                        <td className={styles.mySpecInfo}>{cpu.cpuValue}</td>
                                        <td className={styles.mySpecInfo}>{convertPrice(cpu.cpuPrice)}원</td>
                                    </tr>
                                ) :
                                (
                                    <tr>
                                        <td><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                        <td><Link to={`/CpuSpec/${cpu.cpuId}`}
                                                  className={styles.link}>{cpu.cpuName}</Link></td>
                                        <td>{cpu.cpuMark}</td>
                                        <td>{cpu.cpuRank}</td>
                                        <td>{cpu.cpuValue}</td>
                                        <td>{convertPrice(cpu.cpuPrice)}원</td>
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

export default MyCategoryCpu;