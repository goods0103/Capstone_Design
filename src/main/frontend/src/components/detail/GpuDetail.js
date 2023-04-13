import React, { useEffect, useState } from "react";
import axios from "axios";


function GpuDetail() {

    const [gpuValue, setGpuValue] = useState([]);
    const [gpuRank, setGpuRank] = useState([]);
    const [gpuPopular, setGpuPopular] = useState([]);

    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    console.log(lastPart);

    useEffect(() => {
        axios.post('/gpuValue', { lastPart })
            .then(response => {
                setGpuValue(response.data);
            })
            .finally()
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/gpuRank', { lastPart })
            .then(response => {
                setGpuRank(response.data);
            })
            .finally()
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post('/gpuPopular', { lastPart })
            .then(response => {
                setGpuPopular(response.data);
            })
            .finally()
            .catch(error => {
                console.log(error);
            });
    }, []);

    return(
        <>

        </>
    );
}


export default GpuDetail;