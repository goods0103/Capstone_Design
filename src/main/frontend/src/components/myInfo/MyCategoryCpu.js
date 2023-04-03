import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";

function MyCategoryCpu() {

    const [cpuInfo, setCpuInfo] = useState([]);

    // hello
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/mySpecCpu');
                setCpuInfo(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <>
            <CategoryBar2></CategoryBar2>
            <div>
                <p>
                    {cpuInfo.cpu_name}<br/>
                    {cpuInfo.cpu_mark}<br/>
                    {cpuInfo.cpu_rank}<br/>
                    {cpuInfo.cpu_value}<br/>
                    {cpuInfo.cpu_price}<br/>
                </p>
                <br/>
            </div>
        </>
    );
}

export default MyCategoryCpu;