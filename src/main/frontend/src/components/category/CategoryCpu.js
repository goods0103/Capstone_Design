import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";

function CategoryCpu() {
  const [cpuList, setCpuList] = useState([]);

  // hello
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/category/cpu1');
        setCpuList(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const convertPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <>
      <CategoryBar></CategoryBar>
      <div>
          <table className={styles.cssTable}>
              <tr>
                  <th className={styles.cssTh}>cpu_image</th>
                  <th className={styles.cssTh}>cpu_name</th>
                  <th className={styles.cssTh}>cpu_rank</th>
                  <th className={styles.cssTh}>cpu_value</th>
                  <th className={styles.cssTh}>cpu_price</th>
              </tr>
              {cpuList.map((cpu) => (
                  <tr>
                      <td className={styles.cssTd}><img src="../../../public/images/product/cpu2.jpg" alt="cpu_image" className={styles.tableImg}/></td>
                      <td className={styles.cssTd}>{cpu.cpu_name}</td>
                      <td className={styles.cssTd}>{cpu.cpu_rank}</td>
                      <td className={styles.cssTd}>{cpu.cpu_value}</td>
                      <td className={styles.cssTd}>{convertPrice(cpu.cpu_price)}원</td>
                  </tr>
              ))}
          </table>
      </div>
    </>
  );
}

export default CategoryCpu;