import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import Select from "react-select";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

function CategoryGame() {
    const [selectedGame, setSelectedGame] = useState({
        value : "PUBG_BATTLEGROUNDS",
        label : "PUBG_BATTLEGROUNDS"
    });
    const [gameList, setGameList] = useState([]);
    const [gameOption, setGameOption] = useState([]); // cpu 에 대한 배열
    const [minimumList, setMinimumList] = useState([]);
    const [recommendedList, setRecommendedList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(100);
    const [flag, setFlag] = useState(true);
    const [game, setGame] = useState({});
    const handlePageClick = ({ selected }) => {
        setCurrentPage(selected);
    };

    const slicedData = gameList.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/game2');
                const cpus = response.data.map(cpus => ({
                    value: cpus.gameName,
                    label: cpus.gameName
                }));
                setGameOption(cpus);
                // setGameList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchMinimumList = async () => {
            try {
                const response = await axios.get('/compare');
                // setMinimumList(response.data);
                setGameList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMinimumList();
    }, []);

    // useEffect(() => {
    //     axios.get('/compare2')
    //         .then(response => {
    //             setRecommendedList(response.data);
    //         })
    //         .catch(error => {
    //             console.log(error);
    //         });
    // }, []);


    function handleGameChange(selectedGame) {
        setSelectedGame(selectedGame);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const searchGame = (game) => {
        setFlag(false);
        {gameList.map((list) => {
            if(list.gameName === game.value){
                setGame(list);
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
                <form onSubmit={handleSubmit} className={styles.formTag}>
                    <label>원하는 Game을 입력하세요 : </label>
                    <Select
                        value={selectedGame}
                        onChange={handleGameChange}
                        options={gameOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
                    />
                    <label htmlFor="gameSelect">Selected Game : &nbsp;</label>
                    <input name = "gameSelect" className={styles.selectTagShow} value={selectedGame ? selectedGame.label : ''} />
                    <button onClick={() => searchGame(selectedGame)}>게임 검색</button>  &emsp;
                    <button onClick={() => showTotalList()}>전체 리스트 보기</button>
                    <br/>
                </form>
                {flag ?  (
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>game_image</th>
                        <th className={styles.cssTh}>game_name</th>
                        <th className={styles.cssTh}>game_min</th>
                        <th className={styles.cssTh}>game_rec</th>
                    </tr>
                    {slicedData.map((game) => {
                        return (
                            <tr data-game-name={game.gameName}>
                                <td className={styles.cssTd}><img src={game.gameImg} alt="game_image" className={styles.tableImg}/></td>
                                <td className={styles.cssTd}><Link to={`/GameSpec/${game.gameName}`}>{game.gameName}</Link></td>
                                <td className={styles.cssTd}>{game.minimumGameRam}</td>
                                <td className={styles.cssTd}>{game.recommendedGameRam}</td>

                            </tr>
                        );
                    })}
                </table>
                    ) :
                    <table className={styles.cssTable}>
                        <tr>
                            <th className={styles.cssTh}>game_image</th>
                            <th className={styles.cssTh}>game_name</th>
                            <th className={styles.cssTh}>game</th>
                        </tr>
                        <tr>
                            <td className={styles.cssTd}><img src={game.gameImg} alt="game_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}><Link to={`/GameSpec/${game.gameId}`}>{game.gameName}</Link></td>
                        </tr>
                    </table>
                }
            </div>
            <div className={styles.page}>
                {flag &&
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    pageCount={Math.ceil(gameList.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
                }
            </div>
        </>
    );
}

export default CategoryGame;