import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "./category.module.css"
import CategoryBar3 from "./CategoryBar3";
import CategoryBar from "../category/CategoryBar";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";

function InsertCategoryGpu() {

    const [gpuList, setGpuList] = useState([]);
    const [data2, setData2] = useState("");


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
        setData2(localStorage.getItem('selectGpuData'));
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

            <button className={styles.move} onClick={() => scrollToMySpec(data2)}>내 스펙으로 이동</button>
            <div>
                {/*<table className={styles.cssTable}>*/}
                {/*    <tr>*/}
                {/*        <th className={styles.cssTh}>image</th>*/}
                {/*        <th className={styles.cssTh}>name</th>*/}
                {/*        <th className={styles.cssTh}>mark</th>*/}
                {/*        <th className={styles.cssTh}>rank</th>*/}
                {/*        <th className={styles.cssTh}>value</th>*/}
                {/*        <th className={styles.cssTh}>price</th>*/}
                {/*    </tr>*/}
                {/*    {gpuList.map((gpu) => (*/}
                {/*        <tr  data-gpu-name={gpu.gpuName}>*/}
                {/*            <td className={styles.cssTd}  style={{*/}
                {/*                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                borderLeft: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>*/}
                {/*                <img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImg}/></td>*/}
                {/*            <td className={styles.cssTd}  style={{*/}
                {/*                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>*/}
                {/*                <Link to={`/GpuSpec/${gpu.gpuId}`}>{gpu.gpuName}</Link></td>*/}
                {/*            <td className={styles.cssTd} style={{*/}
                {/*                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>*/}
                {/*                {gpu.gpuMark}</td>*/}
                {/*            <td className={styles.cssTd}  style={{*/}
                {/*                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                 borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>*/}
                {/*            {gpu.gpuRank}</td>*/}
                {/*            <td className={styles.cssTd} style={{*/}
                {/*                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>*/}
                {/*                {gpu.gpuValue}</td>*/}
                {/*            <td className={styles.cssTd} style={{*/}
                {/*                borderBottom: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                borderTop: data2 === gpu.gpuName ? "2px solid red" : "1px solid white",*/}
                {/*                borderRight: data2 === gpu.gpuName ? "2px solid red" : "1px solid white"}}>*/}
                {/*            {convertPrice(gpu.gpuPrice)}원</td>*/}
                {/*        </tr>*/}
                {/*    ))}*/}
                {/*</table>*/}
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
                        {gpuList.map((gpu) => (
                            data2 === gpu.gpuName ? (
                                    <tr className={styles.mySpecInfoHover} data-gpu-name={gpu.gpuName}>
                                        <td className={styles.mySpecInfo}><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImg}/></td>
                                        <td className={styles.mySpecInfo}><Link to={`/GpuSpec/${gpu.gpuId}`} className={styles.myLink}>{gpu.gpuName}</Link></td>
                                        <td className={styles.mySpecInfo}>{gpu.gpuMark}</td>
                                        <td className={styles.mySpecInfo}>{gpu.gpuRank}</td>
                                        <td className={styles.mySpecInfo}>{gpu.gpuValue}</td>
                                        <td className={styles.mySpecInfo}>{convertPrice(gpu.gpuPrice)}원</td>
                                    </tr>
                                ) : (
                                    <tr>
                                        <td><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImg}/></td>
                                        <td><Link to={`/GpuSpec/${gpu.gpuId}`} className={styles.link}>{gpu.gpuName}</Link></td>
                                        <td>{gpu.gpuMark}</td>
                                        <td>{gpu.gpuRank}</td>
                                        <td>{gpu.gpuValue}</td>
                                        <td>{convertPrice(gpu.gpuPrice)}원</td>
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

export default InsertCategoryGpu;