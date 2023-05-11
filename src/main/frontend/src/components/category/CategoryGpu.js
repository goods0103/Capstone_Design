import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {Link} from "react-router-dom";
import Table from "react-bootstrap/Table";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faList, faMagnifyingGlass, faSquareCaretLeft, faSquareCaretRight} from "@fortawesome/free-solid-svg-icons";

// [Mod] for check
function CategoryGpu() {
    // axios를 통해 받아오는 GPU 정보를 담는 useState
    const [gpuList, setGpuList] = useState([]);
    const [gpuOriginList, setGpuOriginList] = useState([]);
    // 검색을 위한 gpu 이름을 위한 useState
    const [gpuOption, setGpuOption] = useState([]);
    // 페이지 나눔을 위한 useState
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [selectedGpu, setSelectedGpu] = useState({
        value : localStorage.getItem('gpuData'),
        label : localStorage.getItem('gpuData')
    });
    //검색 시 뜨는 화면 구분을 위한 useState
    const [flag, setFlag] = useState(true);

    // 필터 선택여부를 위한 useState
    const [selectedFilter, setSelectedFilter] = useState("none");
    //검색을 위한 useState
    const [searchValue, setSearchValue] = useState("");

    // GPU 정보
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/gpu1');
                setGpuList(response.data);
                setGpuOriginList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    // GPU 이름 정보
    useEffect(() => { // Select 에서 사용할 gpu label, value 값들
        axios.get('/category/gpu_name')
            .then(response => {
                const gpus = response.data.map(gpus => ({
                    value: gpus,
                    label: gpus
                }));
                setGpuOption(gpus);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);
//실험
    //페이지 이동
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    //페이지 분배
    const slicedData = gpuList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    //돈 단위 바꾸기
    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const sortProduct = (type) => {
        if (type === "low") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => {
                if (a.gpuPrice === 0 && b.gpuPrice === 0) {
                    return 0; // 두 객체 모두 cpu_price가 0인 경우에는 순서를 유지
                } else if (a.gpuPrice === 0) {
                    return 1; // a.cpu_price가 0이고 b.cpu_price가 0이 아닌 경우 b를 먼저 위치시킴
                } else if (b.gpuPrice === 0) {
                    return -1; // a.cpu_price가 0이 아니고 b.cpu_price가 0인 경우 a를 먼저 위치시킴
                } else {
                    return a.gpuPrice - b.gpuPrice; // 두 객체 모두 cpu_price가 0이 아닌 경우 cpu_price 기준으로 정렬
                }
            });
            setGpuList(newProduct);
        } else if (type === "high") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => b.gpuPrice - a.gpuPrice);
            setGpuList(newProduct);
        } else if (type === "rankLow") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => b.gpuRank - a.gpuRank);
            setGpuList(newProduct);
        } else if (type === "rankHigh") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => a.gpuRank - b.gpuRank);
            setGpuList(newProduct);
        } else if (type === "gpuValue") {
            const newProduct = [...gpuList];
            newProduct.sort((a, b) => b.gpuValue - a.gpuValue);
            setGpuList(newProduct);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchGpu = (gpu) => {
        setFlag(false);
    }

    const showTotalList = () => {
        setFlag(true);
        setSearchValue("");
        setGpuList(gpuOriginList);
        setSelectedFilter("");
    }

    const filteredProducts = gpuOption.filter((product) =>
        product.value.toLowerCase().includes(searchValue.toLowerCase())
    );

    return (
        <>
            <div>
                <form onSubmit={handleSubmit} className={styles.formTag}>
                    <p onClick={() => searchGpu(searchValue)} className={styles.buttonSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#ffffff",backgroundColor:"#151515"}} /></p> &emsp;
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="원하는 GPU를 입력해주세요."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchGpu(searchValue);
                            }
                        }}
                    />
                </form>
                <div className={styles.filter}>
                    <button
                        className={
                            selectedFilter === "low"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("low");
                            sortProduct("low");
                        }}
                    >
                        낮은 가격
                    </button>
                    <button
                        className={
                            selectedFilter === "high"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("high");
                            sortProduct("high");
                        }}
                    >
                        높은 가격
                    </button>
                    <button
                        className={
                            selectedFilter === "rankHigh"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("rankHigh");
                            sortProduct("rankHigh");
                        }}
                    >
                        gpu 높은 순️
                    </button>
                    <button
                        className={
                            selectedFilter === "rankLow"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("rankLow");
                            sortProduct("rankLow");
                        }}
                    >
                        gpu 낮은 순️
                    </button>
                    <button
                        className={
                            selectedFilter === "gpuValue"
                                ? `${styles.filterButton} ${styles.filterButtonSelected}`
                                : styles.filterButton
                        }
                        onClick={() => {
                            setSelectedFilter("gpuValue");
                            sortProduct("gpuValue");
                        }}
                    >
                        가성비 순️
                    </button>
                    <button className={styles.buttonTotalList} onClick={() => showTotalList()}>초기화</button>
                </div>
                {flag ? (
                    <div className={styles.cssTable}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className={styles.cssTh}>image</th>
                                    <th className={styles.cssTh}>name</th>
                                    <th className={styles.cssTh}>mark</th>
                                    <th className={styles.cssTh}>rank</th>
                                    <th className={styles.cssTh}>value</th>
                                    <th className={styles.cssTh}>price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slicedData.map((gpu) => (
                                    <tr>
                                        <td><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImg}/></td>
                                        <td><Link to={`/GpuSpec/${gpu.gpuId}`} className={styles.link}>{gpu.gpuName}</Link></td>
                                        <td>{gpu.gpuMark}</td>
                                        <td>{gpu.gpuRank}</td>
                                        <td>{gpu.gpuValue}</td>
                                        <td>{convertPrice(gpu.gpuPrice)}원</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </div>)
                    :
                    <div className={styles.cssTable}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className={styles.cssTh}>image</th>
                                    <th className={styles.cssTh}>name</th>
                                    <th className={styles.cssTh}>mark</th>
                                    <th className={styles.cssTh}>rank</th>
                                    <th className={styles.cssTh}>value</th>
                                    <th className={styles.cssTh}>price</th>
                                </tr>
                            </thead>
                            <tbody>
                            {gpuList.map((gpu) =>(
                                filteredProducts.map((product) => (
                                    gpu.gpuName=== product.value &&(
                                <tr>
                                    <td><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImg}/></td>
                                    <td><Link to={`/GpuSpec/${gpu.gpuId}`} className={styles.link}>{gpu.gpuName}</Link></td>
                                    <td>{gpu.gpuMark}</td>
                                    <td>{gpu.gpuRank}</td>
                                    <td>{gpu.gpuValue}</td>
                                    <td>{convertPrice(gpu.gpuPrice)}원</td>
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
                                    <FontAwesomeIcon icon={faSquareCaretLeft} beat size="2xl" />
                                </span>}
                        nextLabel={<span className={styles.paginationIconRight}>
                                    <FontAwesomeIcon icon={faSquareCaretRight} beat size="2xl" />
                            </span>}
                        pageCount={Math.ceil(gpuList.length / itemsPerPage)}
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

export default CategoryGpu;