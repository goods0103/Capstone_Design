import React, { useState, useEffect } from 'react';
import styles from "../main/main.module.css";
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

    return (
        <>
            <CategoryBar></CategoryBar>
            <main className={styles.flex_wrap}>
                <div>
                    {/*{ramList.map((ram) => (*/}
                    {/*    <div key={ram.cpu_name}>*/}
                    {/*        <p>{ram.cpu_name}*/}
                    {/*            {ram.cpu_rank}*/}
                    {/*            {ram.cpu_value}*/}
                    {/*            {ram.cpu_price}</p>*/}
                    {/*    </div>*/}
                    {/*))}*/}
                    hello? ram
                </div>
            </main>
        </>
    );
}

export default CategoryRam;