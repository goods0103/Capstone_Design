import React, {useEffect, useState} from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./detail.module.css";


function SubmitSelectedGpu({selectedGpu, gpuInfo, gpuInfo2}) {
    const [data, setData] = useState([]);

    const [selectedGpuInfo, setSelectedGpuInfo] = useState([]);
    const [selectedGpuInfoDetail, setSelectedGpuInfoDetail] = useState([]);

    // selectedCpuInfo
    const [selectedGpuInfoPrice, setSelectedGpuInfoPrice] = useState(0);
    const [selectedGpuInfoValue, setSelectedGpuInfoValue] = useState(0);
    const [selectedGpuInfoMark, setSelectedGpuInfoMark] = useState(0);

    // cpuInfo
    const [gpuInfoPrice, setGpuInfoPrice] = useState(0);
    const [gpuInfoValue, setGpuInfoValue] = useState(0);
    const [gpuInfoMark, setGpuInfoMark] = useState(0);

    // selectedCpuInfoDetail
    const [selectedCpuInfoDetailClock, setSelectedCpuInfoDetailClock] = useState(0);
    const [selectedCpuInfoDetailTurbo, setSelectedCpuInfoDetailTurbo] = useState(0);
    const [selectedCpuInfoDetailCore, setSelectedCpuInfoDetailCore] = useState(0);

    // cpuInfoDetail
    const [cpuInfoDetailClock, setCpuInfoDetailClock] = useState(0);
    const [cpuInfoDetailTurbo, setCpuInfoDetailTurbo] = useState(0);
    const [cpuInfoDetailCore, setCpuInfoDetailCore] = useState(0);

    const [count, setCount] = useState(0);
    const [loading, setLoading] = useState(true);

    const Gpu1Compare = (info1, info2) => {
        let a, b, flag;
        a = info1 >= info2 ? info1 : info2;
        if (a === info1) {
            a = 100;
            b = info2 * 100 / info1;
            flag = 1;
        } else {
            b = 100;
            a = info1 * 100 / info2;
            flag = 2;
        }

        return (
            <div>
                <div className={styles.infoNameFrame}>
                    <span>
                         {flag === 1 ?
                             <div style={{fontWeight:"bold",color:"lightgreen"}} className={styles.infoProgressBarLabel}>
                                 {gpuInfo.gpuName}
                             </div>
                             :
                             <div className={styles.infoProgressBarLabel}>
                                 {gpuInfo.gpuName}
                             </div>
                         }
                    </span>
                    <span className={styles.infoProgressBarSpan}>
                                    <div style={{width: '100%'}}>
                                        <div style={{width: `${a}%`}} className={styles.progress2}>
                                            <span className={styles.progressSpan}>{info1}</span>
                                        </div>
                                    </div>
                                </span>
                </div>
                <div className={styles.infoNameFrame}>
                    <span>
                        <div className={styles.infoProgressBarLabel}>
                            {selectedGpuInfo.gpuName}
                        </div>
                        {flag === 2 ?
                            <div style={{fontWeight:"bold",color:"lightgreen"}} className={styles.infoProgressBarLabel}>
                                {selectedGpuInfo.gpuName}
                            </div>
                            :
                            <div className={styles.infoProgressBarLabel}>
                                {selectedGpuInfo.gpuName}
                            </div>
                        }
                    </span>
                    <span className={styles.infoProgressBarSpan}>
                                    <div style={{width: '100%'}}>
                                        <div style={{width: `${b}%`}} className={styles.progress}>
                                            <span className={styles.progressSpan}>{info2}</span>
                                        </div>
                                    </div>
                                </span>
                </div>
            </div>
        );
    }

    const Gpu2Compare = (info1, info2) => {
        let a, b, flag;
        a = info1 >= info2 ? info1 : info2;
        if (a === info1) {
            a = 100;
            b = info2 * 100 / info1;
            flag = 1;
        } else {
            b = 100;
            a = info1 * 100 / info2;
            flag = 2;
        }

        return (
            <div>
                <div className={styles.infoNameFrame}>
                    <span>
                                 {flag === 1 ?
                                     <div style={{fontWeight:"bold",color:"lightgreen"}} className={styles.infoProgressBarLabel}>
                                         {gpuInfo.gpuName}
                                     </div>
                                     :
                                     <div className={styles.infoProgressBarLabel}>
                                         {gpuInfo.gpuName}
                                     </div>
                                 }
                    </span>
                    <span className={styles.infoProgressBarSpan}>
                                    <div style={{width: '100%'}}>
                                        <div style={{width: `${a}%`}} className={styles.progress}>
                                            <span className={styles.progressSpan}>{info1}</span>
                                        </div>
                                    </div>
                                </span>
                </div>
                <div className={styles.infoNameFrame}>
                    <span>
                                 {flag === 2 ?
                                     <div style={{fontWeight:"bold",color:"lightgreen"}} className={styles.infoProgressBarLabel}>
                                         {selectedGpuInfo.gpuName}
                                     </div>
                                     :
                                     <div className={styles.infoProgressBarLabel}>
                                         {selectedGpuInfo.gpuName}
                                     </div>
                                 }
                    </span>
                    <span className={styles.infoProgressBarSpan}>
                                    <div style={{width: '100%'}}>
                                        <div style={{width: `${b}%`}} className={styles.progress3}>
                                            <span className={styles.progressSpan}>{info2}</span>
                                        </div>
                                    </div>
                                </span>
                </div>
            </div>
        );
    }

    const CpuInfoProgressBar = (info1, info2) => {
        let a, b;
        a = info1 / (info1 + info2) * 100;
        b = info2 / (info1 + info2) * 100;
        a = Math.round(a);
        b = Math.round(b);

        return (
            <div>
                {a > 0 && b > 0 && !isNaN(a) && !isNaN(b) &&
                    <div>
                        <ProgressBar className={styles.progressBarCss}>
                            <ProgressBar animated variant="success" now={a} label={`${a}%(${info1})`} key={1}/>
                            <ProgressBar animated variant="warning" now={b} label={`${b}%(${info2})`} key={2}/>
                        </ProgressBar>
                    </div>
                }
            </div>
        );
    }

    const SingleProgressBar = (infoA, infoB) => {
        // const number1 = infoA;
        // const number2 = infoB;
        const percentage = (infoA / (infoA + infoB) * 100).toFixed(2);
        // const percentage = (number1 * 100).toFixed(2);
        console.log(percentage);
        const numPercentage = parseFloat(percentage);
        console.log(numPercentage);

        return (
            <div>
                <ProgressBar now={numPercentage} label={`${numPercentage}%`} className={styles.infoProgressBar}
                             variant="" style={{height: '1.5rem'}}/>
            </div>
        );
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (selectedGpu) {
                    const encodedData = encodeURIComponent(selectedGpu.label);
                    const nameResponse = await axios.post('/find_gpu_name', encodedData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        transformRequest: [(data) => data],
                    });
                    setSelectedGpuInfo(nameResponse.data);
                    if (selectedGpuInfo) {
                        changeSelectedGpuInfoToInt(nameResponse.data);
                    }
                    changeGpuInfoToInt(gpuInfo);
                    console.log(nameResponse.data);

                    const newData = [
                        {type: 'gpu', name: gpuInfo.gpuName, value: parseInt(gpuInfo.gpuMark)},
                        {
                            type: 'selectedGpu',
                            name: nameResponse.data.gpuName,
                            value: parseInt(nameResponse.data.gpuMark)
                        },
                    ];
                    setData(newData);
                }

                if (selectedGpu) {
                    const encodedData = encodeURIComponent(selectedGpu.label);
                    const detailResponse = await axios.post('/find_gpu_detail_name', encodedData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        transformRequest: [(data) => data],
                    });
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
        // cpuInfoDetail.clock, cpuInfoDetail.turbo, cpuInfoDetail.core
        let strClock2 = gpuInfoDetailF.clock;
        let strTurbo2 = gpuInfoDetailF.turbo;
        let strCore = gpuInfoDetailF.core;

        let strClock;
        let strTurbo;

        if (strClock2) {
            strClock = strClock2.split(' ')[0];
        } else {
            strClock = 0;
        }

        if (strTurbo2) {
            strTurbo = strTurbo2.split(' ')[0];
        } else {
            strTurbo = 0;
        }

        if (!strCore) {
            strCore = 0;
        }


        const intClock = parseFloat(strClock);
        const intTurbo = parseFloat(strTurbo);
        const intCore = parseInt(strCore);

        setSelectedCpuInfoDetailClock(intClock);
        setSelectedCpuInfoDetailTurbo(intTurbo);
        setSelectedCpuInfoDetailCore(intCore);
        console.log(intClock);
        console.log(intTurbo);
        console.log(intCore);
    }

    const changeGpuInfoDetailToInt = (gpuInfoDetailF) => {
        // cpuInfoDetail.clock, cpuInfoDetail.turbo, cpuInfoDetail.core
        let strClock2 = gpuInfoDetailF.clock;
        let strTurbo2 = gpuInfoDetailF.turbo;
        let strCore = gpuInfoDetailF.core;

        let strClock;
        let strTurbo;

        if (strClock2) {
            strClock = strClock2.split(' ')[0];
        } else {
            strClock = 0;
        }

        if (strTurbo2) {
            strTurbo = strTurbo2.split(' ')[0];
        } else {
            strTurbo = 0;
        }

        if (!strCore) {
            strCore = 0;
        }

        const intClock = parseFloat(strClock);
        const intTurbo = parseFloat(strTurbo);
        const intCore = parseInt(strCore);

        setCpuInfoDetailClock(intClock);
        setCpuInfoDetailTurbo(intTurbo);
        setCpuInfoDetailCore(intCore);
    }


    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <div className={styles.detailCompareContainer}>
                <div className={styles.infoNameFrame}>
                    <span style={{textAlign : 'center'}}>
                        <div style={{width: '250px', height: '150px', alignItems: 'center', display: 'flex'}}>
                            <img
                                className={`${styles.image} ${styles.animationImgWithLabel1}`}
                                src={gpuInfo.gpuUrl}
                                alt="gpu_image" style={{width: '250px', height: 'auto'}}
                            />
                        </div>
                        <div className={`${styles.infoNameLabel} ${styles.animationImgWithLabel1}`}>
                            {gpuInfo.gpuName}
                        </div>
                    </span>
                    <span style={{textAlign : 'center'}}>
                        <div style={{width: '250px', height: '150px', alignItems: 'center', display: 'flex'}}>
                            <img
                                className={`${styles.image} ${styles.animationImgWithLabel2}`}
                                src={selectedGpuInfo.gpuUrl}
                                alt="gpu_image" style={{width: '250px', height: 'auto'}}
                            />
                        </div>
                        <div className={`${styles.infoNameLabel} ${styles.animationImgWithLabel2}`}>
                            {selectedGpuInfo.gpuName}
                        </div>
                    </span>
                </div>
                <hr className={styles.hrStyleDetail}/>

                <div>
                    <div className={`${styles.infoTitleLabel} ${styles.animationDetail}`}>
                        Detail
                    </div>
                    <div className={`${styles.infoNameFrame} ${styles.animationDetailInfo}`}>
                        <span style={{marginLeft: '6%', width: '40%', marginRight: '-15%'}}>
                            <div className={styles.infoDetailLabel}>
                                Memory Size : {gpuInfo2.memorySize}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Core Clock : {gpuInfo2.coreClock}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Memory Clock : {gpuInfo2.memoryClock}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Category : {gpuInfo2.category}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Tdp : {gpuInfo2.tdp}
                            </div>
                        </span>
                        <span style={{width: '40%'}}>
                            <div className={styles.infoDetailLabel}>
                                Memory Size : {selectedGpuInfoDetail.memorySize}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Core Clock : {selectedGpuInfoDetail.coreClock}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Memory Clock : {selectedGpuInfoDetail.memoryClock}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Category : {selectedGpuInfoDetail.category}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Tdp : {selectedGpuInfoDetail.tdp}
                            </div>
                        </span>
                    </div>
                </div>
                <hr className={styles.hrStyleDetail}/>

                {(gpuInfoPrice > 0 && selectedGpuInfoPrice > 0 && !isNaN(gpuInfoPrice) && !isNaN(selectedGpuInfoPrice)) &&
                    <div className={styles.animationProgressInfo}>
                        <div>
                            <div className={styles.infoTitleLabel}>
                                Price
                            </div>
                            {Gpu1Compare(gpuInfoPrice, selectedGpuInfoPrice)}
                        </div>
                        <hr className={styles.hrStyleDetail}/>
                    </div>

                }

                {(gpuInfoMark > 0 && selectedGpuInfoMark > 0 && !isNaN(gpuInfoMark) && !isNaN(selectedGpuInfoMark)) &&
                    <div className={styles.animationProgressInfo}>
                        <div>
                            <div className={styles.infoTitleLabel}>
                                Gpu Mark Rating
                            </div>
                            {Gpu2Compare(gpuInfoMark, selectedGpuInfoMark)}
                        </div>
                        <hr className={styles.hrStyleDetail}/>
                    </div>
                }


                {(gpuInfoValue > 0 && selectedGpuInfoValue > 0 && !isNaN(gpuInfoValue) && !isNaN(selectedGpuInfoValue)) &&
                    <div className={styles.animationProgressInfo}>
                        <div>
                            <div className={styles.infoTitleLabel}>
                                Gpu Value
                            </div>
                            {Gpu1Compare(gpuInfoValue, selectedGpuInfoValue)}
                        </div>
                        <hr className={styles.hrStyleDetail}/>
                    </div>
                }

            </div>
        </>
    );
}

export default SubmitSelectedGpu;