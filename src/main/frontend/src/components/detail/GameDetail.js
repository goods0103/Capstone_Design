import React, {useEffect, useState} from "react";
import axios from "axios";
import {Link, useNavigate} from "react-router-dom";
import styles from "./detail.module.css";
import {Tab, Tabs} from "react-bootstrap";


function GameDetail() {
    const [gameOriginInfo, setGameOriginInfo] = useState([]);
    const [compareList, setCompareList] = useState([]);
    const [topList, setTopList] = useState([]);
    const [countList, setCountList] = useState([]);
    const [flag, setFlag] = useState(0);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];

    const navigate = useNavigate();

    const handlePageNavigation2 = (path) => {
        navigate(path);
        window.location.reload();
    };

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
        axios.post('/compare', {lastPart})
            .then(response => {
                setCompareList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get("/gameTopList")
            .then(response => {
                setTopList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        axios.get("/gameCountList")
            .then(response => {
                setCountList(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    useEffect(() => {
        document.body.style.backgroundColor = '#F0F6F8';
        document.body.style.color = "black";
        return () => {
            document.body.style.backgroundColor = '#151515';
            document.body.style.color = "white";
        };
    }, []);
    return (
        <>
            <div className={styles.pageTitle}>
                <div className={styles.Title}><span>{gameOriginInfo.gameName}</span></div>
            </div>
            <div className={styles.gameFrame}>
                <div className={styles.gameInfo}>
                    <span>{gameOriginInfo.gameName}</span>
                    <hr style={{color: 'black'}}/>
                    <div className={styles.gameImgInfo}>
                        <img src={gameOriginInfo.img} alt="game_image" className={styles.gameImg}/>
                        {compareList.minState === 0 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>모두 부족</p>
                            </div>
                        }
                        {compareList.minState === 1 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.checkImg}
                                    src="images/check.png"
                                    alt="check"
                                />
                                <p>모두 만족</p>
                            </div>

                        }
                        {compareList.minState === 3 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>CPU 성능 부족</p>
                            </div>
                        }
                        {compareList.minState === 4 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>GPU 성능 부족</p>
                            </div>
                        }
                        {compareList.minState === 5 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>RAM 성능 부족</p>
                            </div>
                        }
                        {compareList.minState === 6 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>CPU, GPU 성능 부족</p>
                            </div>
                        }
                        {compareList.minState === 7 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>CPU, RAM 성능 부족</p>
                            </div>
                        }
                        {compareList.minState === 8 &&
                            <div style={{textAlign:"center"}}>
                                <p>최소사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>GPU, RAM 성능 부족</p>
                            </div>
                        }

                        {compareList.recState === 0 &&
                            <div style={{textAlign:"center"}}>
                                <p>권장사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>모두 부족</p>
                            </div>
                        }

                        {compareList.recState === 1 &&
                            <div style={{textAlign:"center"}}>
                            <p>권장사양</p>
                            <img
                                className={styles.checkImg}
                                src="images/check.png"
                                alt="check"
                            />
                                <p>모두 만족</p>
                            </div>
                        }
                        {compareList.recState === 3 &&
                            <div style={{textAlign:"center"}}>
                                <p>권장사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>CPU 성능 부족</p>
                            </div>
                        }
                        {compareList.recState === 4 &&
                            <div style={{textAlign:"center"}}>
                                <p>권장사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>GPU 성능 부족</p>
                            </div>
                        }
                        {compareList.recState === 5 &&
                            <div style={{textAlign:"center"}}>
                                <p>권장사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>RAM 성능 부족</p>
                            </div>
                        }
                        {compareList.recState === 6 &&
                            <div style={{textAlign:"center"}}>
                                <p>권장사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>CPU, GPU 성능 부족</p>
                            </div>
                        }
                        {compareList.recState === 7 &&
                            <div style={{textAlign:"center"}}>
                                <p>권장사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>CPU, RAM 성능 부족</p>
                            </div>
                        }
                        {compareList.recState === 8 &&
                            <div style={{textAlign:"center"}}>
                                <p>권장사양</p>
                                <img
                                    className={styles.xImg}
                                    src="images/x.png"
                                    alt="x"
                                />
                                <p>GPU, RAM 성능 부족</p>
                            </div>
                        }

                    </div>
                    <span>기본 정보</span>
                    <ul className={styles.ul}>
                        <li>제작 {gameOriginInfo.developer}</li>
                        <li>배급 {gameOriginInfo.publisher}</li>
                        <li>출시 {gameOriginInfo.releaseDate}</li>
                        <li>
                            <Tabs activeKey={flag} onSelect={(key) => setFlag(key)}>
                                <Tab eventKey={1} title="최소사양">
                                    <div>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>CPU</td>
                                                <td style={{textAlign: 'left'}}>{gameOriginInfo.minimumGameCpu}</td>
                                            </tr>
                                            <tr>
                                                <td>그래픽</td>
                                                <td style={{textAlign: 'left'}}>{gameOriginInfo.minimumGameGpu}</td>
                                            </tr>
                                            <tr>
                                                <td>램</td>
                                                <td style={{textAlign: 'left'}}>{gameOriginInfo.minimumGameRam}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>
                                <Tab eventKey={2} title="권장사양">
                                    <div>
                                        <table>
                                            <tbody>
                                            <tr>
                                                <td>CPU</td>
                                                <td style={{textAlign: 'left'}}>{gameOriginInfo.recommendedGameCpu}</td>
                                            </tr>
                                            <tr>
                                                <td>그래픽</td>
                                                <td style={{textAlign: 'left'}}>{gameOriginInfo.recommendedGameGpu}</td>
                                            </tr>
                                            <tr>
                                                <td>램</td>
                                                <td style={{textAlign: 'left'}}>{gameOriginInfo.recommendedGameRam}</td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </Tab>
                            </Tabs>
                        </li>
                    </ul>
                </div>
                <div className={styles.gameDetailList}>
                    <div className={styles.topGame}>
                        <span>Top Games</span>
                        <hr style={{color: 'black'}}/>
                        {topList.map((top) => (
                            <p className={styles.pDetail}
                               onClick={() => handlePageNavigation2(`/GameSpec/${top.gameName}`)}
                               style={{cursor: 'pointer'}}>{top.gameName}</p>
                        ))}
                    </div>
                    <div className={styles.testGame}>
                        <span>Most Tested Games</span>
                        <hr style={{color: 'black'}}/>
                        {countList.map((count) => (
                            <p className={styles.pDetail}
                               onClick={() => handlePageNavigation2(`/GameSpec/${count.gameName}`)}
                               style={{cursor: 'pointer'}}>{count.gameName}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}


export default GameDetail;