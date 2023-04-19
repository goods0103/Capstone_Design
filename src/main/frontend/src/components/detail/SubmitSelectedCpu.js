import React, {useEffect, useState} from "react";
import axios from "axios";


function SubmitSelectedCpu({ selectedCpu, setSelectedCpuInfo, setSelectedCpuInfoDetail, setShowComponent }) {

    // const [selectedCpuInfo, setSelectedCpuInfo] = useState([]);
    // const [selectedCpuInfoDetail, setSelectedCpuInfoDetail] = useState([]);

    useEffect(() => {
        if (selectedCpu) {
            const fetchData = async () => {
                try {
                    const response = await axios.post('/find_cpu_detail_name', `${selectedCpu}`);
                    setSelectedCpuInfo(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [selectedCpu]);

    useEffect(() => {
        if (selectedCpu) {
            const fetchData = async () => {
                try {
                    const response = await axios.post('/find_cpu_detail_name', `${selectedCpu}`);
                    setSelectedCpuInfoDetail(response.data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchData();
        }
    }, [selectedCpu]);

    setShowComponent(true);
    return null;
}

export default SubmitSelectedCpu;