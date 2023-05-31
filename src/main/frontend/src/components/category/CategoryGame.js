import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {
    faCircleChevronLeft, faCircleChevronRight,
    faList,
    faMagnifyingGlass,
    faSquareCaretLeft,
    faSquareCaretRight
} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";

function CategoryGame() {
    const [selectedGame, setSelectedGame] = useState({
        value : "PUBG_BATTLEGROUNDS",
        label : "PUBG_BATTLEGROUNDS"
    });
    const [gameList, setGameList] = useState([]);
    const [gameOption, setGameOption] = useState([]); // cpu 에 대한 배열



    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [flag, setFlag] = useState(true);
    // 필터 선택여부를 위한 useState
    const [selectedFilter, setSelectedFilter] = useState("none");
    //검색을 위한 useState
    const [searchValue, setSearchValue] = useState("");


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/game2');
                setGameList(response.data); // 게임 이름과 이미지 출력하기 위해
                const cpus = response.data.map(cpus => ({
                    value: cpus.gameName,
                    label: cpus.gameName
                }));
                setGameOption(cpus);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const slicedData = gameList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    function handleGameChange(selectedGame) {
        setSelectedGame(selectedGame);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchGame = (game) => {
        setFlag(false);
    }
    const showTotalList = () => {
        setFlag(true);
        setSearchValue("");
    }

    const filteredProducts = gameOption.filter((product) =>
        product.value.toLowerCase().includes(searchValue.toLowerCase())
    );
    return (
        <>
            {/*<CategoryBar></CategoryBar>*/}
            <div className={styles.bigFrame}>
                <form onSubmit={handleSubmit} className={styles.formTag}>
                    <p onClick={() => searchGame(selectedGame)} className={styles.buttonSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} size="2xl" style={{color: "#ffffff",backgroundColor:"#151515"}} /></p> &emsp;
                    <input
                        className={styles.input}
                        type="text"
                        placeholder="원하는 GAME을 입력해주세요."
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                searchGame(selectedGame);
                            }
                        }}
                    />
                    {/*<button className={styles.buttonTotalList} onClick={() => showTotalList()}>검색 초기화</button>*/}
                </form>
                {flag ? (
                        <div className={styles.cssTableGame}>
                            {slicedData.map((game) => {
                                return (
                                    <div className={styles.cssTableCell}>
                                        <Link to={`/GameSpec/${game.gameName}`}><img src={game.gameImg} alt="game_image" /></Link>
                                        <div className={styles.cssTableCaption}>
                                            {game.gameName}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ) : (
                    <div className={styles.cssTableGame}>
                        {gameList.map((game) => (
                            filteredProducts.map((product) => (
                                game.gameName === product.value && (
                                    <div className={styles.cssTableCell}>
                                        <Link to={`/GameSpec/${game.gameName}`}><img src={game.gameImg} className={styles.gameImage} alt="game_image" /></Link>
                                        <div className={styles.cssTableCaption}>
                                            {game.gameName}
                                        </div>
                                    </div>
                                )
                            ))
                        ))}
                    </div>
                    )}
            <div className={styles.page}>
                {flag &&
                    <ReactPaginate
                        previousLabel={<span className={styles.paginationIconLeft}>
                                    <FontAwesomeIcon icon={faCircleChevronLeft} shake size="2xl" style={{color: "#1f71ff",}} />
                                </span>}
                        nextLabel={<span className={styles.paginationIconRight}>
                                    <FontAwesomeIcon icon={faCircleChevronRight} shake size="2xl" style={{color: "#1f71ff",}} />
                            </span>}
                        pageCount={Math.ceil(gameList.length / itemsPerPage)}
                        onPageChange={handlePageClick}
                        containerClassName={"pagination"}
                        activeClassName={"active"}
                        pageClassName={"page-item"}
                        pageLinkClassName={"page-link spaced"}
                    />
                }
            </div>
            </div>
        </>
    );
}

export default CategoryGame;