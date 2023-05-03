import React, { useEffect, useState } from "react";
import axios from "axios";
import {Link} from "react-router-dom";
import styles from "./detail.module.css";


function GameDetail() {

    const [gameInfo, setGameInfo] = useState([]);
    const path = window.location.href;
    const parts = path.split('/');
    const lastPart = parts[parts.length - 1];


    useEffect(() => {
        axios.post("/category/game1/detail",  lastPart )
            .then(response => {
                setGameInfo(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);


    const convertPrice = (price) => {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return(
        <>
            <div>
                <table>
                    <tr>
                        <td>game name : {gameInfo.gameName}</td>
                        <br />
                    </tr>
                    <tr>
                        <td>시스템 권장사항</td>
                        <br />
                    </tr>
                    <tr>
                        <td>
                            최소 :
                            <br/>
                            {gameInfo.minimumGameCpu}
                            <br />
                            {gameInfo.minimumGameGpu}
                            <br />
                            {gameInfo.minimumGameRam}
                        </td>
                        <td>
                            권장 :
                            <br />
                            &emsp; {gameInfo.recommendedGameCpu}
                            <br />
                            &emsp; {gameInfo.recommendedGameGpu}
                            <br />
                            &emsp; {gameInfo.recommendedGameRam}
                        </td>
                    </tr>
                </table>
            </div>
        </>
    );
}


export default GameDetail;