import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";

function MyCategoryCpu() {

    const [ramInfo, setRamInfo] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/mySpecRam');
                setRamInfo(response.data);
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
                    ram_name : {ramInfo.ram_name}<br/>
                    ram_type : {ramInfo.ram_type}<br/>
                    ram_size : {ramInfo.ram_size}<br/>
                    ram_latency : {ramInfo.ram_latency}<br/>
                    ram_read : {ramInfo.ram_read}<br/>
                    ram_write : {ramInfo.ram_write}<br/>
                </p>
                <br/>
            </div>
        </>
    );
}

export default MyCategoryCpu;