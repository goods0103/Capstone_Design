import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {
    faCircleChevronLeft, faCircleChevronRight,
    faList,
    faMagnifyingGlass,
    faSquareCaretLeft,
    faSquareCaretRight
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";


function CategoryRam() {
    // axios를 통해 받아오는 RAM 정보를 담는 useState
    const [ramList, setRamList] = useState([]);
    const [ramOriginList, setRamOriginList] = useState([]);
    // 검색을 위한 RAM 이름을 위한 useState
    const [ramOption, setRamOption] = useState([]);
    // 페이지 나눔을 위한 useState
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(200);
    const [selectedRam, setSelectedRam] = useState({
        value : "",
        label : ""
    });
    //검색 시 뜨는 화면 구분을 위한 useState
    const [flag, setFlag] = useState(true);
    // 필터 선택여부를 위한 useState
    const [selectedFilter, setSelectedFilter] = useState("none");
    //검색을 위한 useState
    const [searchValue, setSearchValue] = useState("");

    // RAM 정보
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/ram1');
                setRamList(response.data);
                setRamOriginList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // ram 이름 정보
    useEffect(() => {
        axios.get('/category/ram_name')
            .then(response => {
                const rams = response.data.map(rams => ({
                    value: rams,
                    label: rams
                }));
                setRamOption(rams);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const slicedData = ramList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const sortProduct = (type) => {
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
        } else if (type === "readHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ramRead - b.ramRead);
            setRamList(newProduct);
        } else if (type === "readLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ramRead - a.ramRead);
            setRamList(newProduct);
        } else if (type === "writeHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => a.ramWrite - b.ramWrite);
            setRamList(newProduct);
        } else if (type === "writeLow") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => b.ramWrite - a.ramWrite);
            setRamList(newProduct);
        } else if (type === "nameHigh") {
            const newProduct = [...ramList];
            newProduct.sort((a, b) => {
                if (a.ramName < b.ramName) return -1;
                if (a.ramName > b.ramName) return 1;
                return 0;
            });
            setRamList(newProduct);
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchRam = (ram) => {
        setFlag(false);
    }
    const showTotalList = () => {
        setFlag(true);
        setSearchValue("");
        setRamList(ramOriginList);
        setSelectedFilter("");
    }

    const filteredProducts = ramOption.filter((product) =>
        product.value.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <div className={styles.bigFrame}>
            <form onSubmit={handleSubmit} className={styles.formTag}>
                <p onClick={() => searchRam(searchValue)} className={styles.buttonSearch}>
                    <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#ffffff",backgroundColor:"#151515"}} /></p> &emsp;
                <input
                    className={styles.input}
                    type="text"
                    placeholder="원하는 RAM를 입력해주세요."
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                            searchRam(searchValue);
                        }
                    }}
                />
            </form>
                <div className={styles.filter}>
                    <button
                        className={
                            selectedFilter === "nameHigh"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("nameHigh");
                            sortProduct("nameHigh");
                        }}
                    >
                        이름
                    </button>
                    <button
                        className={
                            selectedFilter === "sizeHigh"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("sizeHigh");
                            sortProduct("sizeHigh");
                        }}
                    >
                        사이즈
                    </button>
                    <button
                        className={
                            selectedFilter === "latencyLow"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("latencyLow");
                            sortProduct("latencyLow");
                        }}
                    >
                        지연도
                    </button>
                    <button
                        className={
                            selectedFilter === "readLow"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("readLow");
                            sortProduct("readLow");
                        }}
                    >
                        읽기속도
                    </button>
                    <button
                        className={
                            selectedFilter === "writeLow"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("writeLow");
                            sortProduct("writeLow");
                        }}
                    >
                        쓰기속도
                    </button>
                    <button className={styles.buttonTotalList} onClick={() => showTotalList()}>초기화</button>
                </div>
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
                            {ramList.map((ram) =>(
                                filteredProducts.map((product) => (
                                    ram.ramName=== product.value &&(
                                <tr>
                                    <td>{ram.ramName}</td>
                                    <td>{ram.ramSize}</td>
                                    <td>{ram.ramLatency}</td>
                                    <td>{ram.ramRead}</td>
                                    <td>{ram.ramWrite}</td>
                                </tr>
                                    )))))}
                            </tbody>
                        </Table>
                    </div>
                }
            </div>
            <br/>
            <div className={styles.page}>
                {flag &&
                    <ReactPaginate
                        previousLabel={<span className={styles.paginationIconLeft}>
                                    <FontAwesomeIcon icon={faCircleChevronLeft} shake size="2xl" style={{color: "#1f71ff",}} />
                                </span>}
                        nextLabel={<span className={styles.paginationIconRight}>
                                    <FontAwesomeIcon icon={faCircleChevronRight} shake size="2xl" style={{color: "#1f71ff",}} />
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