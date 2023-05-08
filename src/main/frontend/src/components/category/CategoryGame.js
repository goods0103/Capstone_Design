import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import Select from "react-select";
import {Link} from "react-router-dom";
import ReactPaginate from "react-paginate";
import {faList, faMagnifyingGlass, faSquareCaretLeft, faSquareCaretRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Table from "react-bootstrap/Table";

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
            {/*<CategoryBar></CategoryBar>*/}
            <div>
                <form onSubmit={handleSubmit} className={styles.formTag}>
                    <label>원하는 Game을 입력하세요 : </label> <br/>
                    <Select
                        value={selectedGame}
                        onChange={handleGameChange}
                        options={gameOption}
                        placeholder="Choose an option"
                        isSearchable={true}
                        className={styles.selectTag}
                    />
                    {/*<label htmlFor="gameSelect">Selected Game : &nbsp;</label>*/}
                    {/*<input name = "gameSelect" className={styles.selectTagShow} value={selectedGame ? selectedGame.label : ''} />*/}
                    <button onClick={() => searchGame(selectedGame)} className={styles.buttonSearch}>
                        <FontAwesomeIcon icon={faMagnifyingGlass} beat size="2xl" style={{color: "#ffffff",}} /></button>  &emsp;
                    <button onClick={() => showTotalList()} className={styles.buttonTotalList}><FontAwesomeIcon icon={faList} size="2xl" style={{color: "#ffffff",}} /></button>
                    <br/><br/><br/>
                </form>
                {flag ? (
                    <div className={styles.cssTable}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className={styles.cssTh}>game_image</th>
                                    <th className={styles.cssTh}>game_name</th>
                                    <th className={styles.cssTh}>game_min</th>
                                    <th className={styles.cssTh}>game_rec</th>
                                </tr>
                            </thead>
                            <tbody>
                                {slicedData.map((game) => {
                                    return (
                                        <tr data-game-name={game.gameName}>
                                            <td><img src={game.gameImg} alt="game_image" className={styles.tableImg}/></td>
                                            <td><Link to={`/GameSpec/${game.gameName}`}>{game.gameName}</Link></td>
                                            <td>{game.minState}</td>
                                            <td>{game.recState}</td>

                                        </tr>
                                    );
                                })}
                            </tbody>
                        </Table>
                    </div>
                    ) :
                    <div className={styles.cssTable}>
                        <Table striped bordered hover variant="dark">
                            <thead>
                                <tr>
                                    <th className={styles.cssTh}>game_image</th>
                                    <th className={styles.cssTh}>game_name</th>
                                    <th className={styles.cssTh}>game</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><img src={game.gameImg} alt="game_image" className={styles.tableImg}/></td>
                                    <td><Link to={`/GameSpec/${game.gameId}`}>{game.gameName}</Link></td>
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
                        pageCount={Math.ceil(gameList.length / itemsPerPage)}
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

export default CategoryGame;