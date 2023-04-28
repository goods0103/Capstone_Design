import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import styles from "./category.module.css"

const data = [
    { name: 'Cpu', value: 100 },
    { name: 'Gpu', value: 80 },
];
function InsertCategoryBottleNeck() {
    const [bottleNeck, setBottleNeck] = useState([]);
    // useEffect(() => {
    //     axios.get( "/bottleNeck")
    //         .then(response => {
    //            setBottleNeck(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);
    useEffect(() => {
        axios.get("/bottleNeck")
            .then(response => {
                setBottleNeck(response.data);
                const maxValue = Math.max(response.data.cpuBottleNeckValue, response.data.gpuBottleNeckValue); // cpuvalue와 gpuvalue 중에서 큰 값을 찾는다.

                // maxValue를 다시 서버로 보내기 위해 axios.post()를 호출한다.
                axios.post("/compareValue", { maxValue })
                    .then(response => {
                        console.log(response.data); // 서버로부터 받은 데이터를 콘솔에 출력한다.
                    })
                    .catch(error => {
                        console.log(error);
                    });
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <>
            <div className={styles.Chart}>
            <div className={styles.barChart}>
                <p> 프로세서 AMD Ryzen 5 5600X가 100% 활용되고 그래픽 카드 NVIDIA GeForce RTX 3060 Ti가 80% 활용됩니다. </p>
              <BarChart width={500} height={700} data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
            </div>
            <div className={styles.CircularChart}>
                <CircularProgressbar value={50} text={`50%`} />
                <p>50%의 병목 현상이 있습니다.</p>
            </div>
                <div>

                </div>
            </div>
        </>
    );
}


export default InsertCategoryBottleNeck;