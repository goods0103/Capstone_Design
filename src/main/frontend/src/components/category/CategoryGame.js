import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import Select from "react-select";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";

function CategoryGame() {

    const [gameList, setGameList] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");
    const [gameOption, setGameOption] = useState([]); // cpu 에 대한 배열
    const [minimumList, setMinimumList] = useState([]);
    const [recommendedList, setRecommendedList] = useState([]);

    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(100);

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
                setGameList(response.data);
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
                setMinimumList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMinimumList();
    }, []);

    useEffect(() => {
        axios.get('/compare2')
            .then(response => {
                setRecommendedList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    function handleGameChange(selectedGame) {
        setSelectedGame(selectedGame);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const scrollToMySpec = (gameName) => {
        const targetRow = document.querySelector(`tr[data-game-name="${gameName}"]`);
        if (targetRow) {
            const yOffset = -50; // optional offset to adjust scroll position
            const y = targetRow.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };
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
                    <button onClick={() => scrollToMySpec(selectedGame.label)}>선택한 게임 위치로 이동</button>
                    <br/>
                </form>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>game_image</th>
                        <th className={styles.cssTh}>game_name</th>
                        <th className={styles.cssTh}>game</th>
                    </tr>
                    {slicedData.map((game) => {
                        const minimumGame = minimumList.find((item) => item.gameName === game.gameName);
                        const recommendGame = recommendedList.find((item) => item.gameName === game.gameName);
                        const minstate = minimumGame ? minimumGame.state : null;
                        const recstate = recommendGame ? recommendGame.state : null;
                        return (
                            <tr data-game-name={game.gameName}>
                                <td className={styles.cssTd}><img src={game.gameImg} alt="game_image" className={styles.tableImg}/></td>
                                <td className={styles.cssTd}><Link to={`/GameSpec/${game.gameId}`}>{game.gameName}</Link></td>
                                <td className={styles.cssTd}>{minstate+recstate}</td>
                            </tr>
                        );
                    })}
                </table>
                <ReactPaginate
                    previousLabel={"이전"}
                    nextLabel={"다음"}
                    pageCount={Math.ceil(gameList.length / itemsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                />
            </div>
        </>
    );
}

export default CategoryGame;