import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {Link} from "react-router-dom";

// [Mod] for check
function CategoryGpu() {
    const [gpuList, setGpuList] = useState([]);
    const [data2, setData2] = useState("GeForce RTX 3070");
    const [gpuOption, setGpuOption] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(100);

    const [selectedGpu, setSelectedGpu] = useState({
        value : localStorage.getItem('gpuData'),
        label : localStorage.getItem('gpuData')
    });
    const [flag, setFlag] = useState(true);
    const [gpu, setGpu] = useState({});

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const slicedData = gpuList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/gpu1');
                setGpuList(response.data);
                setData2(localStorage.getItem('gpuData'));
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

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

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const sortProduct = (type) => {
        // 이름순 수정
        // if (type === "name") {
        //     const newProduct = [...cpuList];
        //     newProduct.sort((a, b) => a.cpu_name - b.cpu_name);
        //     setCpuList(newProduct);
        // }
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

    function handleGpuChange(selectedGpu) {
        setSelectedGpu(selectedGpu);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchGpu = (gpu) => {
        setFlag(false);
        {gpuList.map((list) => {
            if(list.gpuName === gpu.value){
                setGpu(list);
            }
        })
        }
    }

    const showTotalList = () => {
        setFlag(true);
    }

    return (
        <>
            <CategoryBar></CategoryBar>
            <div>
                <div className={styles.filter}>
                    {/*<p onClick={() => sortProduct("name")}>이름순</p>*/}
                    <p onClick={() => sortProduct("low")}>낮은 가격</p>
                    <p onClick={() => sortProduct("high")}>높은 가격</p>
                    <p onClick={() => sortProduct("rankHigh")}>gpu 순위 ⬆️</p>
                    <p onClick={() => sortProduct("rankLow")}>gpu 순위 ⬇️</p>
                    <p onClick={() => sortProduct("gpuValue")}>가성비순</p>

                </div>
                <form onSubmit={handleSubmit} className={styles.formTag}>
                    <label>원하는 Gpu를 입력하세요 : </label>
                    <Select
                        value={selectedGpu}
                        onChange={handleGpuChange}
                        options={gpuOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
                    />
                    <label htmlFor="gpuSelect">Selected Gpu : &nbsp;</label>
                    <input name = "gpuSelect" className={styles.selectTagShow} value={selectedGpu ? selectedGpu.label : ''} />
                    <button onClick={() => searchGpu(selectedGpu)}>Gpu 검색</button> &emsp;
                    <button onClick={() => showTotalList()}>전체 리스트 보기</button>
                    <br/>
                </form>
                {flag ? (
                    <table className={styles.cssTable}>
                        <tr>
                            <th className={styles.cssTh}>image</th>
                            <th className={styles.cssTh}>name</th>
                            <th className={styles.cssTh}>mark</th>
                            <th className={styles.cssTh}>rank</th>
                            <th className={styles.cssTh}>value</th>
                            <th className={styles.cssTh}>price</th>
                        </tr>
                        {slicedData.map((gpu) => (
                            <tr>
                                <td className={styles.cssTd}><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImg}/></td>
                                <td className={styles.cssTd}><Link to={`/GpuSpec/${gpu.gpuId}`}>{gpu.gpuName}</Link></td>
                                <td className={styles.cssTd}>{gpu.gpuMark}</td>
                                <td className={styles.cssTd}>{gpu.gpuRank}</td>
                                <td className={styles.cssTd}>{gpu.gpuValue}</td>
                                <td className={styles.cssTd}>{convertPrice(gpu.gpuPrice)}원</td>
                            </tr>
                        ))}
                    </table> ) :
                    <table className={styles.cssTable}>
                        <tr>
                            <th className={styles.cssTh}>image</th>
                            <th className={styles.cssTh}>name</th>
                            <th className={styles.cssTh}>mark</th>
                            <th className={styles.cssTh}>rank</th>
                            <th className={styles.cssTh}>value</th>
                            <th className={styles.cssTh}>price</th>
                        </tr>
                        <tr>
                            <td className={styles.cssTd}><img src={gpu.gpuUrl} alt="gpu_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}><Link to={`/GpuSpec/${gpu.gpuId}`}>{gpu.gpuName}</Link></td>
                            <td className={styles.cssTd}>{gpu.gpuMark}</td>
                            <td className={styles.cssTd}>{gpu.gpuRank}</td>
                            <td className={styles.cssTd}>{gpu.gpuValue}</td>
                            <td className={styles.cssTd}>{convertPrice(gpu.gpuPrice)}원</td>
                        </tr>
                    </table>
                }
            </div>
            <div className={styles.page}>
                {flag &&
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    pageCount={Math.ceil(gpuList.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    pageClassName={"page-item"}
                    pageLinkClassName={"page-link spaced"}
                /> }
            </div>
        </>
    );
}

export default CategoryGpu;