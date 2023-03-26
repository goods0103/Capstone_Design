import React, { useState, useEffect } from 'react';
import styles from "../main/main.module.css";
import axios from 'axios';
import CategoryBar from "./CategoryBar";

function CategoryGpu() {
    const [gpuList, setGpuList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/gpu1');
                setGpuList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <CategoryBar></CategoryBar>
            <main className={styles.flex_wrap}>
                <div>
                    {/*{gpuList.map((gpu) => (*/}
                    {/*    <div key={gpu.cpu_name}>*/}
                    {/*        <p>{gpu.cpu_name}*/}
                    {/*            {gpu.cpu_rank}*/}
                    {/*            {gpu.cpu_value}*/}
                    {/*            {gpu.cpu_price}</p>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    hello? gpu
                </div>
            </main>
        </>
    );
}

export default CategoryGpu;