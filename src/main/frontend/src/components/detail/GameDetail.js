import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "./detail.module.css";


function GameDetail() {
    const [gameOriginInfo, setGameOriginInfo] = useState([]);
    const [gameInfo, setGameInfo] = useState([]);
    const [flag, setFlag] = useState(0);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];


    useEffect(() => {
        axios.post("/category/game1/detail", lastPart)
            .then(response => {
                setGameOriginInfo(response.data);

            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.post("/category/game1/detail2", lastPart)
            .then(response => {
                setGameInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    function minimum(count) {
        if(count===1){
            setFlag(0);
        }
        else{
            setFlag(1);
        }
    }
    function recommend(count) {
        if(count===2){
            setFlag(0);
        }
        else{
            setFlag(2);
        }
    }
    return (
        <>
            <div className={styles.pageTitle}>
                <div className={styles.Title}><span>{gameOriginInfo.gameName}</span></div>
            </div>
            <div className={styles.gameInfo}>
                <span>{gameOriginInfo.gameName}</span>
                <hr style={{ color: 'black' }} />
                <div className={styles.gameImgInfo}>
                    <img src={gameOriginInfo.img} alt="game_image" className={styles.gameImg}/>
                    <img
                        className={styles.checkImg}
                        src="images/check.png"
                        alt="check"
                    />
                    <img
                        className={styles.checkImg}
                        src="images/check.png"
                        alt="check"
                    />
                </div>
                <span>기본 정보</span>
                <table>
                    <tr>
                        <td>제작</td>
                        <td>{gameOriginInfo.developer}</td>
                    </tr>
                    <tr>
                        <td>배급</td>
                        <td>{gameOriginInfo.publisher}</td>
                    </tr>
                    <tr>
                        <td>출시</td>
                        <td>{gameOriginInfo.releaseDate}</td>
                    </tr>
                    <tr>
                        <td>시스템</td>
                        <td><span onClick={() => minimum(flag)}>최소사양</span></td>
                        <td><span onClick={() => recommend(flag)}>권장사양</span></td>
                    </tr>
                </table>
                {flag===1 && (<div>
                        <table>
                            <tr>
                                <td>CPU</td>
                                <td style={{ textAlign: 'left' }}>{gameOriginInfo.minimumGameCpu}</td>
                            </tr>
                            <tr>
                                <td>그래픽</td>
                                <td style={{ textAlign: 'left' }}>{gameOriginInfo.minimumGameGpu}</td>
                            </tr>
                            <tr>
                                <td>램</td>
                                <td style={{ textAlign: 'left' }}>{gameOriginInfo.minimumGameRam}</td>
                            </tr>
                        </table>
                    </div>
                    )}
                {flag===2 && (<div>
                        <table className={styles.leftAlign}>
                            <tr>
                                <td>CPU</td>
                                <td style={{ textAlign: 'left' }}>{gameOriginInfo.recommendedGameCpu}</td>
                            </tr>
                            <tr>
                                <td>그래픽</td>
                                <td style={{ textAlign: 'left' }}>{gameOriginInfo.recommendedGameGpu}</td>
                            </tr>
                            <tr>
                                <td>램</td>
                                <td style={{ textAlign: 'left' }}>{gameOriginInfo.recommendedGameRam}</td>
                            </tr>
                        </table>
                    </div>
                )}
            </div>
            <div className={styles.topGame}>
                <span>Top Games</span>
                <hr style={{ color: 'black' }} />
                <p>Battle Ground</p>
                <p>Football_Manager_2023</p>
                <p>ELDEN_RING</p>
                <p>GrandChase</p>
                <p>EA_SPORTS_FIFA_23</p>
                <p>Eternal_Return</p>
                <p>NBA_2K23</p>
                <p>Monster_Hunter_World</p>
                <p>MONSTER_HUNTER_RISE</p>
                <p>Left_4_Dead_2</p>
            </div>
            <div className={styles.testGame}>
                <span>Most Tested Games</span>
                <hr style={{ color: 'black' }} />
                <p>Battle Ground</p>
                <p>Football_Manager_2023</p>
                <p>ELDEN_RING</p>
                <p>GrandChase</p>
                <p>EA_SPORTS_FIFA_23</p>
                <p>Eternal_Return</p>
                <p>NBA_2K23</p>
                <p>Monster_Hunter_World</p>
                <p>MONSTER_HUNTER_RISE</p>
                <p>Left_4_Dead_2</p>
            </div>
        </>
    );
}


export default GameDetail;