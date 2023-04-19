import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";
import Select from "react-select";
import {Link} from "react-router-dom";

function CategoryGame() {

    const [gameList, setGameList] = useState([]);
    const [selectedGame, setSelectedGame] = useState("");
    const [gameOption, setGameOption] = useState([]); // cpu 에 대한 배열
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
                    </tr>
                    {gameList.map((game) => (
                        <tr  data-game-name={game.gameName}>
                            <td className={styles.cssTd}><img src={game.gameImg} alt="game_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}><Link to={`/GameSpec/${game.gameId}`}>{game.gameName}</Link></td>
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default CategoryGame;