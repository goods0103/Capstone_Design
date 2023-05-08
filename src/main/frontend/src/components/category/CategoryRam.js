import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {faList, faMagnifyingGlass, faSquareCaretLeft, faSquareCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";


function CategoryRam() {
    const [ramList, setRamList] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(200);
    const [selectedRam, setSelectedRam] = useState({
        value : "",
        label : ""
    });

    const [RamOption, setRamOption] = useState([]); // cpu 에 대한 배열

    const [flag, setFlag] = useState(true);
    const [ram, setRam] = useState({});

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
                const rams = response.data.map(rams => ({
                    value: rams.ramName,
                    label: rams.ramName
                }));
                setRamOption(rams);
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
    function handleRamChange(selectedGame) {
        setSelectedRam(selectedGame);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchRam = (ram) => {
        setFlag(false);
        {ramList.map((list) => {
            if(list.ramName === ram.value){
                setRam(list);
            }
        })
        }
    }
    const showTotalList = () => {
        setFlag(true);
    }
    return (
        <>
            {/*<CategoryBar></CategoryBar>*/}
            <div className={styles.filter}>
                {/*<p onClick={() => sortProduct("name")}>이름순</p>*/}
                <p onClick={() => sortProduct("sizeHigh")}>크기순</p>
                <p onClick={() => sortProduct("latencyLow")}>지연도순</p>
                <p onClick={() => sortProduct("readLow")}>읽기 속도순</p>
                <p onClick={() => sortProduct("writeLow")}>쓰기 속도순</p>
            </div>
            <form onSubmit={handleSubmit} className={styles.formTag}>
                <label>원하는 Ram을 입력하세요 : </label> <br/>
                <Select
                    value={selectedRam}
                    onChange={handleRamChange}
                    options={RamOption}
                    placeholder="Choose an option"
                    isSearchable={true}
                    className={styles.selectTag}
                />
                {/*<label htmlFor="ramSelect">Selected Ram : &nbsp;</label>*/}
                {/*<input name = "ramSelect" className={styles.selectTagShow} value={selectedRam ? selectedRam.label : ''} />*/}
                <button onClick={() => searchRam(selectedRam)} className={styles.buttonSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} beat size="2xl" style={{color: "#ffffff",}} /></button>  &emsp;
                <button onClick={() => showTotalList()} className={styles.buttonTotalList}><FontAwesomeIcon icon={faList} size="2xl" style={{color: "#ffffff",}} /></button>
                <br/><br/><br/>
            </form>
            <div>
                {flag ? (
                    <div className={styles.cssTable}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className={styles.cssTh}>name</th>
                                    <th className={styles.cssTh}>size</th>
                                    <th className={styles.cssTh}>latency</th>
                                    <th className={styles.cssTh}>read</th>
                                    <th className={styles.cssTh}>write</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slicedData.map((ram) => (
                                    <tr>
                                        <td>{ram.ramName}</td>
                                        <td>{ram.ramSize}</td>
                                        <td>{ram.ramLatency}</td>
                                        <td>{ram.ramRead}</td>
                                        <td>{ram.ramWrite}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>
                    ) :
                    <div className={styles.cssTable}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className={styles.cssTh}>name</th>
                                    <th className={styles.cssTh}>size</th>
                                    <th className={styles.cssTh}>latency</th>
                                    <th className={styles.cssTh}>read</th>
                                    <th className={styles.cssTh}>write</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>{ram.ramName}</td>
                                    <td>{ram.ramSize}</td>
                                    <td>{ram.ramLatency}</td>
                                    <td>{ram.ramRead}</td>
                                    <td>{ram.ramWrite}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
            <div className={styles.page}>
                {flag &&
                    <ReactPaginate
                        previousLabel={<span className={styles.paginationIconLeft}>
                                    <FontAwesomeIcon icon={faSquareCaretLeft} beat size="2xl" />
                                </span>}
                        nextLabel={<span className={styles.paginationIconRight}>
                                    <FontAwesomeIcon icon={faSquareCaretRight} beat size="2xl" />
                            </span>}
                        pageCount={Math.ceil(ramList.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link spaced"}
                    />
                }
            </div>
        </>
    );
}

export default CategoryRam;