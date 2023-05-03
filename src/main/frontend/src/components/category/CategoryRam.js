import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";


function CategoryRam() {
    const [ramList, setRamList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(200);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const slicedData = ramList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/ram1');
                setRamList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const sortProduct = (type) => {
        // if (type === "name") {
        //     const newProduct = [...cpuList];
        //     newProduct.sort((a, b) => a.cpu_name - b.cpu_name);
        //     setCpuList(newProduct);
        // }
        if (type === "sizeLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => {
                if (a.ramSize === 1 && b.ramSize === 1) {
                    return 0; // 두 객체 모두 cpu_price가 0인 경우에는 순서를 유지
                } else if (a.ramSize === 1) {
                    return 1; // a.cpu_price가 0이고 b.cpu_price가 0이 아닌 경우 b를 먼저 위치시킴
                } else if (b.ramSize === 1) {
                    return -1; // a.cpu_price가 0이 아니고 b.cpu_price가 0인 경우 a를 먼저 위치시킴
                } else {
                    return a.ramSize - b.ramSize; // 두 객체 모두 cpu_price가 0이 아닌 경우 cpu_price 기준으로 정렬
                }
            });
            setRamList(newProduct);
        } else if (type === "sizeHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ramSize - a.ramSize);
            setRamList(newProduct);
        } else if (type === "latencyLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ramLatency - b.ramLatency);
            setRamList(newProduct);
        } else if (type === "latencyHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ramLatency - a.ramLatency);
            setRamList(newProduct);
        } else if (type === "readLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ramRead - b.ramRead);
            setRamList(newProduct);
        } else if (type === "readHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ramRead - a.ramRead);
            setRamList(newProduct);
        } else if (type === "writeLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ramWrite - b.ramWrite);
            setRamList(newProduct);
        } else if (type === "writeHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ramWrite - a.ramWrite);
            setRamList(newProduct);
        }
    };
    return (
        <>
            <CategoryBar></CategoryBar>
            <div>
                <div className={styles.filter}>
                    {/*<p onClick={() => sortProduct("name")}>이름순</p>*/}
                    <p onClick={() => sortProduct("sizeHigh")}>크기순</p>
                    <p onClick={() => sortProduct("latencyLow")}>지연도순</p>
                    <p onClick={() => sortProduct("readLow")}>읽기 속도순</p>
                    <p onClick={() => sortProduct("writeLow")}>쓰기 속도순</p>
                </div>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>image</th>
                        <th className={styles.cssTh}>name</th>
                        <th className={styles.cssTh}>size</th>
                        <th className={styles.cssTh}>latency</th>
                        <th className={styles.cssTh}>read</th>
                        <th className={styles.cssTh}>write</th>
                    </tr>
                    {slicedData.map((ram) => (
                        <tr>
                            <td className={styles.cssTd}><img src="" alt="ram_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}>{ram.ramName}</td>
                            <td className={styles.cssTd}>{ram.ramSize}</td>
                            <td className={styles.cssTd}>{ram.ramLatency}</td>
                            <td className={styles.cssTd}>{ram.ramRead}</td>
                            <td className={styles.cssTd}>{ram.ramWrite}</td>
                        </tr>
                    ))}
                </table>
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    pageCount={Math.ceil(ramList.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </>
    );
}

export default CategoryRam;