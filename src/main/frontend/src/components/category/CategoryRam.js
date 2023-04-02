import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";


function CategoryRam() {
    const [ramList, setRamList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/ram1');
                setRamList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const sortProduct = (type) => {
        // if (type === "name") {
        //     const newProduct = [...cpuList];
        //     newProduct.sort((a, b) => a.cpu_name - b.cpu_name);
        //     setCpuList(newProduct);
        // }
        if (type === "sizeLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => {
                if (a.ram_size === 1 && b.ram_size === 1) {
                    return 0; // 두 객체 모두 cpu_price가 0인 경우에는 순서를 유지
                } else if (a.ram_size === 1) {
                    return 1; // a.cpu_price가 0이고 b.cpu_price가 0이 아닌 경우 b를 먼저 위치시킴
                } else if (b.ram_size === 1) {
                    return -1; // a.cpu_price가 0이 아니고 b.cpu_price가 0인 경우 a를 먼저 위치시킴
                } else {
                    return a.ram_size - b.ram_size; // 두 객체 모두 cpu_price가 0이 아닌 경우 cpu_price 기준으로 정렬
                }
            });
            setRamList(newProduct);
        } else if (type === "sizeHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ram_size - a.ram_size);
            setRamList(newProduct);
        } else if (type === "latencyLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ram_latency - b.ram_latency);
            setRamList(newProduct);
        } else if (type === "latencyHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ram_latency - a.ram_latency);
            setRamList(newProduct);
        } else if (type === "readLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ram_read - b.ram_read);
            setRamList(newProduct);
        } else if (type === "readHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ram_read - a.ram_read);
            setRamList(newProduct);
        } else if (type === "writeLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ram_write - b.ram_write);
            setRamList(newProduct);
        } else if (type === "writeHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ram_write - a.ram_write);
            setRamList(newProduct);
        }
    };
    return (
        <>
            <CategoryBar></CategoryBar>
            <div>
                <div className={styles.filter}>
                    {/*<p onClick={() => sortProduct("name")}>이름순</p>*/}
                    <p onClick={() => sortProduct("sizeHigh")}>크기 순</p>
                    <p onClick={() => sortProduct("latencyHigh")}>지연도 순 ⬆️</p>
                    <p onClick={() => sortProduct("latencyLow")}>지연도 순 ⬇️</p>
                    <p onClick={() => sortProduct("readHigh")}>접근 속도 순(읽기) ⬆️</p>
                    <p onClick={() => sortProduct("readLow")}>접근 속도 순(읽기) ⬇️</p>
                    <p onClick={() => sortProduct("writeHigh")}>접근 속도 순(쓰기) ⬆️</p>
                    <p onClick={() => sortProduct("writeLow")}>접근 속도 순(쓰기) ⬇️</p>
                </div>
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
                            <td className={styles.cssTd}><img src="" alt="ram_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}>{ram.ram_name}</td>
                            <td className={styles.cssTd}>{ram.ram_size}</td>
                            <td className={styles.cssTd}>{ram.ram_latency}</td>
                            <td className={styles.cssTd}>{ram.ram_read}</td>
                            <td className={styles.cssTd}>{ram.ram_write}</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default CategoryRam;