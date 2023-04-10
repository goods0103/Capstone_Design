import React, { useEffect, useState } from "react";
import axios from "axios";


function CpuDetail() {
    const [cpuInfo, setCpuInfo] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];
    console.log(lastPart);

    useEffect(() => {
        axios.post('/cpuid', { lastPart })
            .then(response => {
                setCpuInfo(response.data);
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


export default CpuDetail;