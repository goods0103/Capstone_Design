import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import ReactPaginate from "react-paginate";
import Select from "react-select";
import {Link} from "react-router-dom";

function CategoryCpu() {
  const [cpuList, setCpuList] = useState([]);
  const [data2, setData2] = useState("AMD Ryzen 5 5600X");
  const [cpuOption, setCpuOption] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(100);

  const [selectedCpu, setSelectedCpu] = useState({
      value : localStorage.getItem('cpuData'),
      label : localStorage.getItem('cpuData')
  });
  const [flag, setFlag] = useState(true);
  const [cpu, setCpu] = useState({});

  const handlePageClick = ({ selected }) => {
      setCurrentPage(selected);
  };

  const slicedData = cpuList.slice(
      currentPage * itemsPerPage,
      (currentPage + 1) * itemsPerPage
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/category/cpu1');
        setCpuList(response.data);
        setData2(localStorage.getItem('cpuData'));
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

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

      }
    };

    function handleGpuChange(selectedGpu) {
        setSelectedCpu(selectedGpu);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchCpu = (cpu) => {
        setFlag(false);
        {cpuList.map((list) => {
            if(list.cpuName === cpu.value){
                setCpu(list);
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
              <p onClick={() => sortProduct("rankHigh")}>cpu 순위 ⬆️</p>
              <p onClick={() => sortProduct("rankLow")}>cpu 순위 ⬇️</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.formTag}>
              <label>원하는 Cpu를 입력하세요 : </label>
              <Select
                  value={selectedCpu}
                  onChange={handleGpuChange}
                  options={cpuOption}
                  placeholder="Choose an option"
                  isSearchable={true}
                  className={styles.selectTag}
              />
              <label htmlFor="cpuSelect">Selected Cpu : &nbsp;</label>
              <input name = "cpuSelect" className={styles.selectTagShow} value={selectedCpu ? selectedCpu.label : ''} />
              <button onClick={() => searchCpu(selectedCpu)}>Cpu 검색</button> &emsp;
              <button onClick={() => showTotalList()}>전체 리스트 보기</button>
              <br/>
          </form>
          {flag ? (
              <table className={styles.cssTable}>
                  <tr>
                      <th className={styles.cssTh}>image</th>
                      <th className={styles.cssTh}>name</th>
                      <th className={styles.cssTh}>rank</th>
                      <th className={styles.cssTh}>value</th>
                      <th className={styles.cssTh}>price</th>
                  </tr>
                  {slicedData.map((cpu) => (
                      <tr>
                          <td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                          <td className={styles.cssTd}><Link to={`/CpuSpec/${cpu.cpuId}`}>{cpu.cpuName}</Link></td>
                          <td className={styles.cssTd}>{cpu.cpuRank}</td>
                          <td className={styles.cssTd}>{cpu.cpuValue}</td>
                          <td className={styles.cssTd}>{convertPrice(cpu.cpuPrice)}원</td>
                      </tr>
                  ))}
              </table>) :
              <table className={styles.cssTable}>
                  <tr>
                      <th className={styles.cssTh}>image</th>
                      <th className={styles.cssTh}>name</th>
                      <th className={styles.cssTh}>rank</th>
                      <th className={styles.cssTh}>value</th>
                      <th className={styles.cssTh}>price</th>
                  </tr>
                  <tr>
                      <td className={styles.cssTd}><img src={cpu.cpuUrl} alt="cpu_image" className={styles.tableImg}/></td>
                      <td className={styles.cssTd}><Link to={`/CpuSpec/${cpu.cpuId}`}>{cpu.cpuName}</Link></td>
                      <td className={styles.cssTd}>{cpu.cpuRank}</td>
                      <td className={styles.cssTd}>{cpu.cpuValue}</td>
                      <td className={styles.cssTd}>{convertPrice(cpu.cpuPrice)}원</td>
                  </tr>
              </table>
          }
      </div>
        <div className={styles.page}>
          {flag &&
              <ReactPaginate
                  previousLabel={"이전"}
                  nextLabel={"다음"}
                  pageCount={Math.ceil(cpuList.length / itemsPerPage)}
                  onPageChange={handlePageClick}
                  containerClassName={"pagination"}
                  activeClassName={"active"}
              />
          }
      </div>
    </>
  );
}

export default CategoryCpu;