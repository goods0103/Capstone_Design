import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";

function MyCategoryGpu() {

    const [gpuInfo, setGpuInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/mySpecGpu');
                setGpuInfo(response.data);
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
                    gpu_name : {gpuInfo.gpu_name}<br/>
                    gpu_mark : {gpuInfo.gpu_mark}<br/>
                    gpu_rank : {gpuInfo.gpu_rank}<br/>
                    gpu_value : {gpuInfo.gpu_value}<br/>
                    gpu_price : {gpuInfo.gpu_price}<br/>
                </p>
                <br/>
            </div>
        </>
    );
}

export default MyCategoryGpu;