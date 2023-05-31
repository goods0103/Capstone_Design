import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {Link} from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronLeft,
    faChevronRight, faCircleChevronLeft,
    faCircleChevronRight,
    faList,
    faMagnifyingGlass
} from '@fortawesome/free-solid-svg-icons'
import Table from 'react-bootstrap/Table';

function CategoryCpu() {
    // axios를 통해 받아오는 CPU 정보를 담는 useState
  const [cpuList, setCpuList] = useState([]);
  const [cpuOriginList, setCpuOriginList] = useState([]);
  // 검색을 위한 cpu 이름을 위한 useState
  const [cpuOption, setCpuOption] = useState([]);
  // 페이지 나눔을 위한 useState
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);
    //검색 시 뜨는 화면 구분을 위한 useState
  const [flag, setFlag] = useState(true);
  // 필터 선택여부를 위한 useState
  const [selectedFilter, setSelectedFilter] = useState("none");
  //검색을 위한 useState
  const [searchValue, setSearchValue] = useState("");
    // CPU 정보
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/category/cpu1');
        setCpuList(response.data);
        setCpuOriginList(response.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

    // CPU 이름 정보
    useEffect(() => {
        axios.get('/category/cpu_name')
            .then(response => {
                const cpus = response.data.map(cpus => ({
                    value: cpus,
                    label: cpus
                }));
                setCpuOption(cpus);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    //페이지 이동
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };
    //페이지 분배
    const slicedData = cpuList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );
    //돈 단위 바꾸기
  const convertPrice = (price) => {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  const sortProduct = (type) => {
      if (type === "low") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => {
              if (a.cpuPrice === 0 && b.cpuPrice === 0) {
                  return 0; // 두 객체 모두 cpu_price가 0인 경우에는 순서를 유지
              } else if (a.cpuPrice === 0) {
                  return 1; // a.cpu_price가 0이고 b.cpu_price가 0이 아닌 경우 b를 먼저 위치시킴
              } else if (b.cpuPrice === 0) {
                  return -1; // a.cpu_price가 0이 아니고 b.cpu_price가 0인 경우 a를 먼저 위치시킴
              } else {
                  return a.cpuPrice - b.cpuPrice; // 두 객체 모두 cpu_price가 0이 아닌 경우 cpu_price 기준으로 정렬
              }
          });
          setCpuList(newProduct);
      } else if (type === "high") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => b.cpuPrice - a.cpuPrice);
          setCpuList(newProduct);
      } else if (type === "rankLow") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => b.cpuRank - a.cpuRank);
          setCpuList(newProduct);
      } else if (type === "rankHigh") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => a.cpuRank - b.cpuRank);
          setCpuList(newProduct);
      } else if (type === "cpuValue") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => b.cpuValue - a.cpuValue);
          setCpuList(newProduct);
      } else if (type === "nameHigh") {
          const newProduct = [...cpuList];
          newProduct.sort((a, b) => {
              if (a.cpuName < b.cpuName) return -1;
              if (a.cpuName > b.cpuName) return 1;
              return 0;
          });
          setCpuList(newProduct);
      }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchCpu = (cpu) => {
        if(cpu===""){
            setFlag(true);
        }
        else{
            setFlag(false);
        }
    }

    const showTotalList = () => {
        setFlag(true);
        setSearchValue("");
        setCpuList(cpuOriginList);
        setSelectedFilter("");
    }

    const filteredProducts = cpuOption.filter((product) =>
        product.value.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <>
      <div className={styles.bigFrame}>
          <form onSubmit={handleSubmit} className={styles.formTag}>
              <p onClick={() => searchCpu(searchValue)} className={styles.buttonSearch}>
                  <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#ffffff",backgroundColor:"#151515"}} /></p> &emsp;
              <input
                  className={styles.input}
                  type="text"
                  placeholder="원하는 CPU를 입력해주세요."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                          searchCpu(searchValue);
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
                      selectedFilter === "low"
                          ? `${styles.filterButton} ${styles.filterButtonSelected}`
                          : styles.filterButton
                  }
                  onClick={() => {
                      setSelectedFilter("low");
                      sortProduct("low");
                  }}
              >
                  가격 ▽
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
                  가격 △
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
                  성능
              </button>
              <button
                  className={
                      selectedFilter === "cpuValue"
                          ? `${styles.filterButton} ${styles.filterButtonSelected}`
                          : styles.filterButton
                  }
                  onClick={() => {
                      setSelectedFilter("cpuValue");
                      sortProduct("cpuValue");
                  }}
              >
                  가성비
              </button>
              <button className={styles.buttonTotalList} onClick={() => showTotalList()}>초기화</button>
          </div>
          {flag ? (
              <div className={styles.cssTable}>
                  <Table striped bordered hover variant="dark">
                      <thead>
                          <tr>
                              <th className={styles.cssTh}>Image</th>
                              <th className={styles.cssTh}>Name</th>
                              <th className={styles.cssTh}>Mark</th>
                              <th className={styles.cssTh}>Rank</th>
                              <th className={styles.cssTh}>Value</th>
                              <th className={styles.cssTh}>Price</th>
                          </tr>
                      </thead>
                      <tbody>
                          {slicedData.map((cpu) => (
                              <tr>
                                  <td><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                                  <td><Link to={`/CpuSpec/${cpu.cpuId}`} className={styles.link}>{cpu.cpuName}</Link></td>
                                  <td>{cpu.cpuMark}</td>
                                  <td>{cpu.cpuRank}</td>
                                  <td>{cpu.cpuValue}</td>
                                  <td>{convertPrice(Math.round(cpu.cpuPrice / 100) * 100)}원</td>
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
                              <th className={styles.cssTh}></th>
                              <th className={styles.cssTh}>Name</th>
                              <th className={styles.cssTh}>Mark</th>
                              <th className={styles.cssTh}>Rank</th>
                              <th className={styles.cssTh}>Value</th>
                              <th className={styles.cssTh}>Price</th>
                          </tr>
                      </thead>
                      <tbody>
                      {cpuList.map((cpu) =>(
                          filteredProducts.map((product) => (
                              cpu.cpuName=== product.value &&(
                          <tr>
                              <td><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                              <td><Link to={`/CpuSpec/${cpu.cpuId}`} className={styles.link}>{cpu.cpuName}</Link></td>
                              <td>{cpu.cpuMark}</td>
                              <td>{cpu.cpuRank}</td>
                              <td>{cpu.cpuValue}</td>
                              <td>{convertPrice(Math.round(cpu.cpuPrice / 100) * 100)}원</td>
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
                                    {/*<FontAwesomeIcon icon={faSquareCaretRight} beat size="2xl" />*/}
                                    <FontAwesomeIcon icon={faCircleChevronRight} shake size="2xl" style={{color: "#1f71ff",}} />
                            </span>}
                  pageCount={Math.ceil(cpuList.length / itemsPerPage)}
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
export default CategoryCpu;
