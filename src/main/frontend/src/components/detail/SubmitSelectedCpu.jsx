import React, {useEffect, useState} from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import styles from "./detail.module.css";


function SubmitSelectedCpu({selectedCpu, cpuInfo, cpuInfo2}) {
    const [data, setData] = useState([]);

    const [selectedCpuInfo, setSelectedCpuInfo] = useState([]);
    const [selectedCpuInfoDetail, setSelectedCpuInfoDetail] = useState([]);

    // selectedCpuInfo
    const [selectedCpuInfoPrice, setSelectedCpuInfoPrice] = useState(0);
    const [selectedCpuInfoValue, setSelectedCpuInfoValue] = useState(0);
    const [selectedCpuInfoMark, setSelectedCpuInfoMark] = useState(0);

    // cpuInfo
    const [cpuInfoPrice, setCpuInfoPrice] = useState(0);
    const [cpuInfoValue, setCpuInfoValue] = useState(0);
    const [cpuInfoMark, setCpuInfoMark] = useState(0);

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

    const Cpu1Compare = (info1, info2) => {
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
                            {cpuInfo.cpuName}
                        </div>
                            :
                            <div className={styles.infoProgressBarLabel}>
                                {cpuInfo.cpuName}
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

                        {flag === 2 ?
                            <div style={{fontWeight:"bold",color:"lightgreen"}} className={styles.infoProgressBarLabel}>
                                {selectedCpuInfo.cpuName}
                            </div>
                            :
                            <div className={styles.infoProgressBarLabel}>
                                {selectedCpuInfo.cpuName}
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

    const Cpu2Compare = (info1, info2) => {
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
                                {cpuInfo.cpuName}
                            </div>
                            :
                            <div className={styles.infoProgressBarLabel}>
                                {cpuInfo.cpuName}
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
                                  {selectedCpuInfo.cpuName}
                              </div>
                              :
                              <div className={styles.infoProgressBarLabel}>
                                  {selectedCpuInfo.cpuName}
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
        const percentage = (infoA / (infoA + infoB) * 100).toFixed(2);
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
                if (selectedCpu) {
                    const encodedData = encodeURIComponent(selectedCpu.label);
                    const nameResponse = await axios.post('/find_cpu_name', encodedData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        transformRequest: [(data) => data],
                    });
                    setSelectedCpuInfo(nameResponse.data);
                    if (selectedCpuInfo) {
                        changeSelectedCpuInfoToInt(nameResponse.data);
                    }
                    changeCpuInfoToInt(cpuInfo);
                    console.log(nameResponse.data);

                    const newData = [
                        {type: 'cpu', name: cpuInfo.cpuName, value: parseInt(cpuInfo.cpuMark)},
                        {
                            type: 'selectedCpu',
                            name: nameResponse.data.cpuName,
                            value: parseInt(nameResponse.data.cpuMark)
                        },
                    ];
                    setData(newData);
                }

                if (selectedCpu) {
                    const encodedData = encodeURIComponent(selectedCpu.label);
                    const detailResponse = await axios.post('/find_cpu_detail_name', encodedData, {
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded',
                        },
                        transformRequest: [(data) => data],
                    });
                    setSelectedCpuInfoDetail(detailResponse.data);
                    if (selectedCpuInfoDetail) {
                        changeSelectedCpuInfoDetailToInt(detailResponse.data);
                    }
                    changeCpuInfoDetailToInt(cpuInfo2);
                    console.log(detailResponse.data);
                }

                setLoading(false);
            } catch (error) {
                console.log(error); // ????
            }
        };

        fetchData();
    }, [selectedCpu]);

    const changeSelectedCpuInfoToInt = (cpuInfoF) => {
        // cpuInfo.cpuPrice, cpuInfo.cpuValue
        const strPrice = cpuInfoF.cpuPrice;
        const strValue = cpuInfoF.cpuValue;
        const strMark = cpuInfoF.cpuMark;

        const intPrice = parseInt(strPrice);
        const intValue = parseInt(strValue);
        const intMark = parseInt(strMark);

        setSelectedCpuInfoPrice(intPrice);
        setSelectedCpuInfoValue(intValue);
        setSelectedCpuInfoMark(intMark);
    }

    const changeCpuInfoToInt = (cpuInfoF) => {
        // cpuInfo.cpuPrice, cpuInfo.cpuValue
        const strPrice = cpuInfoF.cpuPrice;
        const strValue = cpuInfoF.cpuValue;
        const strMark = cpuInfoF.cpuMark;

        const intPrice = parseInt(strPrice);
        const intValue = parseInt(strValue);
        const intMark = parseInt(strMark);

        setCpuInfoPrice(intPrice);
        setCpuInfoValue(intValue);
        setCpuInfoMark(intMark);
    }

    const changeSelectedCpuInfoDetailToInt = (cpuInfoDetailF) => {
        // cpuInfoDetail.clock, cpuInfoDetail.turbo, cpuInfoDetail.core
        let strClock2 = cpuInfoDetailF.clock;
        let strTurbo2 = cpuInfoDetailF.turbo;
        let strCore = cpuInfoDetailF.core;

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

    const changeCpuInfoDetailToInt = (cpuInfoDetailF) => {
        // cpuInfoDetail.clock, cpuInfoDetail.turbo, cpuInfoDetail.core
        let strClock2 = cpuInfoDetailF.clock;
        let strTurbo2 = cpuInfoDetailF.turbo;
        let strCore = cpuInfoDetailF.core;

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
                    <span>
                        <div style={{textAlign : 'center'}}>
                            <img
                                className={`${styles.image} ${styles.animationImgWithLabel1}`}
                                src={cpuInfo.cpuUrl}
                                alt="cpu_image"
                            />
                        </div>
                        <div className={`${styles.infoNameLabel} ${styles.animationImgWithLabel1}`}>
                            {cpuInfo.cpuName}
                        </div>
                    </span>
                    <span>
                        <div style={{textAlign : 'center'}}>
                            <img
                                className={`${styles.image} ${styles.animationImgWithLabel2}`}
                                src={selectedCpuInfo.cpuUrl}
                                alt="cpu_image"
                            />
                        </div>
                        <div className={`${styles.infoNameLabel} ${styles.animationImgWithLabel2}`}>
                            {selectedCpuInfo.cpuName}
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
                                Class type : {cpuInfo2.classType}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Socket : {cpuInfo2.socket}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Clock : {cpuInfo2.clock}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Turbo : {cpuInfo2.turbo}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Core : {cpuInfo2.core}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Tdp : {cpuInfo2.tdp}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Cache : {cpuInfo2.cache}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Single Thread Rating : {cpuInfo2.str}
                            </div>
                        </span>
                        <span style={{width: '40%'}}>
                            <div className={styles.infoDetailLabel}>
                                Class type : {selectedCpuInfoDetail.classType}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Socket : {selectedCpuInfoDetail.socket}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Clock : {selectedCpuInfoDetail.clock}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Turbo : {selectedCpuInfoDetail.turbo}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Core : {selectedCpuInfoDetail.core}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Tdp : {selectedCpuInfoDetail.tdp}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Cache : {selectedCpuInfoDetail.cache}
                            </div>
                            <div className={styles.infoDetailLabel}>
                                Single Thread Rating : {selectedCpuInfoDetail.str}
                            </div>
                        </span>
                    </div>
                </div>
                <hr className={styles.hrStyleDetail}/>

                {(cpuInfoPrice > 0 && selectedCpuInfoPrice > 0 && !isNaN(cpuInfoPrice) && !isNaN(selectedCpuInfoPrice)) &&
                    <div className={styles.animationProgressInfo}>
                        <div>
                            <div className={styles.infoTitleLabel}>
                                Price
                            </div>
                            {Cpu1Compare(cpuInfoPrice, selectedCpuInfoPrice)}
                        </div>
                        <hr className={styles.hrStyleDetail}/>
                    </div>

                }

                {(cpuInfoMark > 0 && selectedCpuInfoMark > 0 && !isNaN(cpuInfoMark) && !isNaN(selectedCpuInfoMark)) &&
                    <div className={styles.animationProgressInfo}>
                        <div>
                            <div className={styles.infoTitleLabel}>
                                Cpu Mark Rating
                            </div>
                            {Cpu2Compare(cpuInfoMark, selectedCpuInfoMark)}

                        </div>
                        <hr className={styles.hrStyleDetail}/>
                    </div>
                }


                {(cpuInfoValue > 0 && selectedCpuInfoValue > 0 && !isNaN(cpuInfoValue) && !isNaN(selectedCpuInfoValue)) &&
                    <div className={styles.animationProgressInfo}>
                        <div>
                            <div className={styles.infoTitleLabel}>
                                Cpu Value
                            </div>
                            {Cpu1Compare(cpuInfoValue, selectedCpuInfoValue)}
                        </div>
                        <hr className={styles.hrStyleDetail}/>
                    </div>
                }


                <div className={styles.animationProgressInfo}>
                    <div className={styles.infoTitleLabel}>
                        Single Thread Rating
                    </div>
                    {Cpu2Compare(cpuInfo2.str, selectedCpuInfoDetail.str)}
                    <hr className={styles.hrStyleDetail}/>
                </div>

            </div>
        </>
    );
}

export default SubmitSelectedCpu;