import React, { useState, useEffect } from 'react';
import styles from "../main/main.module.css";
import axios from 'axios';
import CategoryBar from "./categoryBar";

function CategoryCpu() {
  const [cpuList, setCpuList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/category/c10');
        setCpuList(response.data);
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
        {cpuList.map((cpu) => (
      <div key={cpu.cpu_name}>
            <p>{cpu.cpu_name}
            {cpu.cpu_rank}
            {cpu.cpu_value}
            {cpu.cpu_price}</p>
          </div>
        ))}
      </div>
      </main>
    </>
  );
}

export default CategoryCpu;