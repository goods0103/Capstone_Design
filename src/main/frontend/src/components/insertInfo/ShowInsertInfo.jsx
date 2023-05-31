import React, { useEffect, useState } from "react";
import styles from "./category.module.css"
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faCircleInfo, faDesktop, faFile, faFileCircleXmark} from "@fortawesome/free-solid-svg-icons";

export default function ShowInsertInfo({infoName, infoMark, infoRank, infoValue, infoPrice, infoUrl, infoId}) {

    const [showComponent, setShowComponent] = useState(false);

    function showMyBottleNeck() {
        setShowComponent(true);
    }

    return(
        <div className={`${styles.divChild} ${styles.divChildCpuAnimation}`}>
            {infoName ? (
                <div>
                    <div className={styles.infoSpecTitle}>CPU</div>
                    <img
                        className={styles.image}
                        src={infoUrl}
                        alt="cpu_image"
                    /><br/><br/>
                    <div className={styles.infoSpecTitle}>{infoName}</div>
                    <div className={styles.urlLabel}><Link to={`/CpuSpec/${infoId}`} className={styles.linkUrl}><FontAwesomeIcon icon={faBarsStaggered} bounce /> Learn more</Link></div>
                    <hr className={styles.hrStyle}/>
                    <div className={styles.infoSpecSubTitle}>Mark Rating</div>
                    <div className={styles.infoSpecSub}>{infoMark}</div>
                    <div className={styles.infoSpecSubTitle}>Rank</div>
                    <div className={styles.infoSpecSub}>{infoRank}</div>
                    <div className={styles.infoSpecSubTitle}>Value</div>
                    <div className={styles.infoSpecSub}>{infoValue}</div>
                    <div className={styles.infoSpecSubTitle}>Price</div>
                    <div className={styles.infoSpecSub}>₩{infoPrice}</div>
                    <hr className={styles.hrStyle}/>
                </div>
            ):(
                <div>
                    <p className={styles.nullInfo}><FontAwesomeIcon icon={faFileCircleXmark} size="xl" />&emsp;서버에 없는 정보입니다.</p>
                </div>
                )}
        </div>

    );
}