import React, {useEffect, useState} from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./detail.module.css";


function SubmitSelectedGpu({ selectedGpu, gpuInfo, gpuInfo2 }) {

    const [selectedGpuInfo, setSelectedGpuInfo] = useState([]);
    const [selectedGpuInfoDetail, setSelectedGpuInfoDetail] = useState([]);

    // selectedGpuInfo
    const [selectedGpuInfoPrice, setSelectedGpuInfoPrice] = useState(0);
    const [selectedGpuInfoValue, setSelectedGpuInfoValue] = useState(0);
    const [selectedGpuInfoMark, setSelectedGpuInfoMark] = useState(0);

    // cpuInfo
    const [gpuInfoPrice, setGpuInfoPrice] = useState(0);
    const [gpuInfoValue, setGpuInfoValue] = useState(0);
    const [gpuInfoMark, setGpuInfoMark] = useState(0);

    // selectedGpuInfoDetail
    const [selectedGpuInfoDetailMemorySize, setSelectedGpuInfoDetailMemorySize] = useState(0);
    const [selectedGpuInfoDetailCoreClock, setSelectedGpuInfoDetailCoreClock] = useState(0);
    const [selectedGpuInfoDetailMemoryClock, setSelectedGpuInfoDetailMemoryClock] = useState(0);

    // cpuInfoDetail
    const [gpuInfoDetailMemorySize, setGpuInfoDetailMemorySize] = useState(0);
    const [gpuInfoDetailCoreClock, setGpuInfoDetailCoreClock] = useState(0);
    const [gpuInfoDetailMemoryClock, setGpuInfoDetailMemoryClock] = useState(0);

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const GpuInfoProgressBar = (info1, info2) => {
        let a, b;
        a = info1/(info1 + info2) * 100;
        b = info2/(info1 + info2) * 100;
        a = Math.round(a);
        b = Math.round(b);

        return (
            <div>
                {a > 0 && b > 0 && !isNaN(a) && !isNaN(b) &&
                    <div>
                        <ProgressBar className={styles.progressBarCss}>
                            <ProgressBar animated variant="success" now={a} label={`${a}%(${info1})`} key={1} />
                            <ProgressBar animated variant="warning" now={b} label={`${b}%(${info2})`} key={2} />
                        </ProgressBar>
                    </div>
                }
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedGpu) {
                    const nameResponse = await axios.post('/find_gpu_name', `${selectedGpu.label}`);
                    setSelectedGpuInfo(nameResponse.data);
                    if (selectedGpuInfo) {
                        changeSelectedGpuInfoToInt(nameResponse.data);
                    }
                    changeGpuInfoToInt(gpuInfo);
                    console.log(nameResponse.data);
                }

                if (selectedGpu) {
                    const detailResponse = await axios.post('/find_gpu_detail_name', `${selectedGpu.label}`);
                    setSelectedGpuInfoDetail(detailResponse.data);
                    if (selectedGpuInfoDetail) {
                        changeSelectedGpuInfoDetailToInt(detailResponse.data);
                    }
                    changeGpuInfoDetailToInt(gpuInfo2);
                    console.log(detailResponse.data);
                }

                setLoading(false);
            } catch (error) {
                console.log(error); // ????
            }
        };

        fetchData();
    }, [selectedGpu]);

    const changeSelectedGpuInfoToInt = (gpuInfoF) => {
        // cpuInfo.cpuPrice, cpuInfo.cpuValue
        const strPrice = gpuInfoF.gpuPrice;
        const strValue = gpuInfoF.gpuValue;
        const strMark = gpuInfoF.gpuMark;

        const intPrice = parseInt(strPrice);
        const intValue = parseInt(strValue);
        const intMark = parseInt(strMark);

        setSelectedGpuInfoPrice(intPrice);
        setSelectedGpuInfoValue(intValue);
        setSelectedGpuInfoMark(intMark);
    }

    const changeGpuInfoToInt = (gpuInfoF) => {
        // cpuInfo.cpuPrice, cpuInfo.cpuValue
        const strPrice = gpuInfoF.gpuPrice;
        const strValue = gpuInfoF.gpuValue;
        const strMark = gpuInfoF.gpuMark;

        const intPrice = parseInt(strPrice);
        const intValue = parseInt(strValue);
        const intMark = parseInt(strMark);

        setGpuInfoPrice(intPrice);
        setGpuInfoValue(intValue);
        setGpuInfoMark(intMark);
    }

    const changeSelectedGpuInfoDetailToInt = (gpuInfoDetailF) => {

        let strMemorySize2 = gpuInfoDetailF.memorySize;
        let strCoreClock2 = gpuInfoDetailF.coreClock;
        let strMemoryClock2 = gpuInfoDetailF.memoryClock;

        let strMemorySize;
        let strCoreClock;
        let strMemoryClock;

        if(strMemorySize2) {
            strMemorySize = strMemorySize2.split(' ')[0];
        }
        else {
            strMemorySize = 0;
        }

        if(strCoreClock2) {
            strCoreClock = strCoreClock2.split(' ')[0];
        }
        else {
            strCoreClock = 0;
        }

        if(strMemoryClock2) {
            strMemoryClock = strMemoryClock2.split(' ')[0];
        }
        else {
            strMemoryClock = 0;
        }




        const intMemorySize = parseInt(strMemorySize);
        const intCoreClock = parseInt(strCoreClock);
        const intMemoryClock = parseInt(strMemoryClock);

        setSelectedGpuInfoDetailMemorySize(intMemorySize);
        setSelectedGpuInfoDetailCoreClock(intCoreClock);
        setSelectedGpuInfoDetailMemoryClock(intMemoryClock);
    }

    const changeGpuInfoDetailToInt = (gpuInfoDetailF) => {
        // cpuInfoDetail.clock, cpuInfoDetail.turbo, cpuInfoDetail.core
        let strMemorySize2 = gpuInfoDetailF.memorySize;
        let strCoreClock2 = gpuInfoDetailF.coreClock;
        let strMemoryClock2 = gpuInfoDetailF.memoryClock;

        let strMemorySize;
        let strCoreClock;
        let strMemoryClock;

        if(strMemorySize2) {
            strMemorySize = strMemorySize2.split(' ')[0];
        }
        else {
            strMemorySize = 0;
        }

        if(strCoreClock2) {
            strCoreClock = strCoreClock2.split(' ')[0];
        }
        else {
            strCoreClock = 0;
        }

        if(strMemoryClock2) {
            strMemoryClock = strMemoryClock2.split(' ')[0];
        }
        else {
            strMemoryClock = 0;
        }

        const intMemorySize = parseInt(strMemorySize);
        const intCoreClock = parseInt(strCoreClock);
        const intMemoryClock = parseInt(strMemoryClock);

        setGpuInfoDetailMemorySize(intMemorySize);
        setGpuInfoDetailCoreClock(intCoreClock);
        setGpuInfoDetailMemoryClock(intMemoryClock);
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            {/*{}*/}
            <div>
                {(gpuInfoMark > 0 && selectedGpuInfoMark > 0 && !isNaN(gpuInfoMark) && !isNaN(selectedGpuInfoMark)) &&
                    <div>
                        <label>Gpu BenchMark &nbsp;</label><br/>
                        {GpuInfoProgressBar(gpuInfoMark, selectedGpuInfoMark)}
                        <br/>
                    </div>
                }

                {(gpuInfoDetailMemorySize > 0 && selectedGpuInfoDetailMemorySize > 0 && !isNaN(gpuInfoDetailMemorySize) && !isNaN(selectedGpuInfoDetailMemorySize)) &&
                    <div>
                        <label>Gpu Memory Size &nbsp;</label><br/>
                        {GpuInfoProgressBar(gpuInfoDetailMemorySize, selectedGpuInfoDetailMemorySize)}
                        <br/>
                    </div>
                }

                {(gpuInfoDetailCoreClock > 0 && selectedGpuInfoDetailCoreClock > 0 && !isNaN(gpuInfoDetailCoreClock) && !isNaN(selectedGpuInfoDetailCoreClock)) &&
                    <div>
                        <label>Gpu Core Clock &nbsp;</label><br/>
                        {GpuInfoProgressBar(gpuInfoDetailCoreClock, selectedGpuInfoDetailCoreClock)}
                        <br/>
                    </div>
                }

                {(gpuInfoDetailMemoryClock > 0 && selectedGpuInfoDetailMemoryClock > 0 && !isNaN(gpuInfoDetailMemoryClock) && !isNaN(selectedGpuInfoDetailMemoryClock)) &&
                    <div>
                        <label>Gpu Memory Clock &nbsp;</label><br/>
                        {GpuInfoProgressBar(gpuInfoDetailMemoryClock, selectedGpuInfoDetailMemoryClock)}
                        <br/>
                    </div>
                }

                {(gpuInfoPrice > 0 && selectedGpuInfoPrice > 0 && !isNaN(gpuInfoPrice) && !isNaN(selectedGpuInfoPrice)) &&
                    <div>
                        <label>Gpu Price &nbsp;</label><br/>
                        {GpuInfoProgressBar(gpuInfoPrice, selectedGpuInfoPrice)}
                        <br/>
                    </div>
                }

                {(gpuInfoValue > 0 && selectedGpuInfoValue > 0 && !isNaN(gpuInfoValue) && !isNaN(selectedGpuInfoValue)) &&
                    <div>
                        <label>Gpu Value &nbsp;</label><br/>
                        {GpuInfoProgressBar(gpuInfoValue, selectedGpuInfoValue)}
                        <br/>
                    </div>
                }

            </div>
        </>
    );
}

export default SubmitSelectedGpu;