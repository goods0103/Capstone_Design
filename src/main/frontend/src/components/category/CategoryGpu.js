import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";

// [Mod] for check
function CategoryGpu() {
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

    const sortProduct = (type) => {
        // 이름순 수정
        // if (type === "name") {
        //     const newProduct = [...cpuList];
        //     newProduct.sort((a, b) => a.cpu_name - b.cpu_name);
        //     setCpuList(newProduct);
        // }
        if (type === "low") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => {
                if (a.gpu_price === 0 && b.gpu_price === 0) {
                    return 0; // 두 객체 모두 cpu_price가 0인 경우에는 순서를 유지
                } else if (a.gpu_price === 0) {
                    return 1; // a.cpu_price가 0이고 b.cpu_price가 0이 아닌 경우 b를 먼저 위치시킴
                } else if (b.gpu_price === 0) {
                    return -1; // a.cpu_price가 0이 아니고 b.cpu_price가 0인 경우 a를 먼저 위치시킴
                } else {
                    return a.gpu_price - b.gpu_price; // 두 객체 모두 cpu_price가 0이 아닌 경우 cpu_price 기준으로 정렬
                }
            });
            setGpuList(newProduct);
        } else if (type === "high") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => b.gpu_price - a.gpu_price);
            setGpuList(newProduct);
        } else if (type === "rankLow") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => b.gpu_rank - a.gpu_rank);
            setGpuList(newProduct);
        } else if (type === "rankHigh") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => a.gpu_rank - b.gpu_rank);
            setGpuList(newProduct);
        } else if (type === "gpuValue") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => b.gpu_value - a.gpu_value);
            setGpuList(newProduct);
        }
    };

    return (
        <>
            <CategoryBar></CategoryBar>
            <div>
                <div className={styles.filter}>
                    {/*<p onClick={() => sortProduct("name")}>이름순</p>*/}
                    <p onClick={() => sortProduct("low")}>낮은 가격</p>
                    <p onClick={() => sortProduct("high")}>높은 가격</p>
                    <p onClick={() => sortProduct("rankHigh")}>gpu 순위 ⬆️</p>
                    <p onClick={() => sortProduct("rankLow")}>gpu 순위 ⬇️</p>
                    <p onClick={() => sortProduct("gpuValue")}>가성비순</p>

                </div>
                <p>{data2}</p>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>gpu_image</th>
                        <th className={styles.cssTh}>gpu_name</th>
                        <th className={styles.cssTh}>gpu_mark</th>
                        <th className={styles.cssTh}>gpu_rank</th>
                        <th className={styles.cssTh}>gpu_value</th>
                        <th className={styles.cssTh}>gpu_price</th>
                    </tr>
                    {gpuList.map((cpu) => (
                        <tr>
                            <td className={styles.cssTd}><img src="" alt="gpu_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}>{cpu.gpu_name}</td>
                            <td className={styles.cssTd}>{cpu.gpu_mark}</td>
                            <td className={styles.cssTd}>{cpu.gpu_rank}</td>
                            <td className={styles.cssTd}>{cpu.gpu_value}</td>
                            <td className={styles.cssTd}>{convertPrice(cpu.gpu_price)}원</td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default CategoryGpu;