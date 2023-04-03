import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import styles from "../eventBanner/eventBanner.module.css"
import CategoryBar2 from "./CategoryBar2";
import CategoryBar from "../category/CategoryBar";

function MySpec() {
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
    return(
        <>
            <CategoryBar2></CategoryBar2>
            <div>
                <p>
                    너 스펙
                </p>
            </div>
        </>
    );
}

export default MySpec;