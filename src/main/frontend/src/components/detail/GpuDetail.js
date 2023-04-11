import React, { useEffect, useState } from "react";
import axios from "axios";


function GpuDetail() {
    const [gpuInfo, setGpuInfo] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    console.log(lastPart);

    useEffect(() => {
        axios.post('/gpuid', { lastPart })
            .then(response => {
                setGpuInfo(response.data);
            })
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