import React, { useState, useEffect } from 'react';
import styles from "./category.module.css"
import axios from 'axios';
import CategoryBar from "./CategoryBar";

function CategoryGame() {

    const [gameList, setGameList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('/category/game1');
                setGameList(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    const sortProduct = (type) => {
        if (type === "low") {
            const newProduct = [...gameList];
            newProduct.sort((a, b) => {
                if (a.game_price === 0 && b.game_price === 0) {
                    return 0;
                } else if (a.game_price === 0) {
                    return 1;
                } else if (b.game_price === 0) {
                    return -1;
                } else {
                    return a.game_price - b.game_price;
                }
            });
            setGameList(newProduct);
        } else if (type === "high") {
            const newProduct = [...gameList];
            newProduct.sort((a, b) => b.game_price - a.game_price);
            setGameList(newProduct);
        } else if (type === "rankLow") {
            const newProduct = [...gameList];
            newProduct.sort((a, b) => b.game_rank - a.game_rank);
            setGameList(newProduct);
        } else if (type === "rankHigh") {
            const newProduct = [...gameList];
            newProduct.sort((a, b) => a.game_rank - b.game_rank);
            setGameList(newProduct);
        }
    };

    return (
        <>
            <CategoryBar></CategoryBar>
            <div>
                <div className={styles.filter}>
                    <p>sorting bar</p>
                    {/*<p onClick={() => sortProduct("low")}>낮은 가격</p>*/}
                    {/*<p onClick={() => sortProduct("high")}>높은 가격</p>*/}
                    {/*<p onClick={() => sortProduct("rankHigh")}>game 순위 ⬆️</p>*/}
                    {/*<p onClick={() => sortProduct("rankLow")}>game 순위 ⬇️</p>*/}
                </div>
                <table className={styles.cssTable}>
                    <tr>
                        <th className={styles.cssTh}>game_image</th>
                        <th className={styles.cssTh}>game_name</th>
                        <th className={styles.cssTh}>game_cpuMin</th>
                        <th className={styles.cssTh}>game_cpuRec</th>
                        <th className={styles.cssTh}>game_gpuMin</th>
                        <th className={styles.cssTh}>game_gpuRec</th>
                        <th className={styles.cssTh}>game_ramMin</th>
                        <th className={styles.cssTh}>game_ramRec</th>

                    </tr>
                    {gameList.map((game) => (
                        <tr>
                            <td className={styles.cssTd}><img src="" alt="game_image" className={styles.tableImg}/></td>
                            <td className={styles.cssTd}>{game.gameName}</td>
                            <td className={styles.cssTd}>{game.minimumGameCpu}</td>
                            <td className={styles.cssTd}>{game.recommendedGameCpu}</td>
                            <td className={styles.cssTd}>{game.minimumGameGpu}</td>
                            <td className={styles.cssTd}>{game.recommendedGameGpu}</td>
                            <td className={styles.cssTd}>{game.minimumGameRam}</td>
                            <td className={styles.cssTd}>{game.recommendedGameRam}</td>
                            {/*<td className={styles.cssTd}>{convertPrice(cpu.cpu_price)}원</td>*/}
                        </tr>
                    ))}
                </table>
            </div>
        </>
    );
}

export default CategoryGame;