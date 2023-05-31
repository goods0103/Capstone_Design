import React, { useEffect, useState } from "react";
import styles from "./category.module.css"
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faFile, faFileCircleXmark} from "@fortawesome/free-solid-svg-icons";

export default function ShowInsertInfoRam({infoName, infoType, infoSize, infoLatency, infoRead, infoWrite, infoUrl, infoId}) {
    return(
        <div className={`${styles.divChild} ${styles.divChildRamAnimation}`}>
            {infoName ? (
                <div>
                    <div className={styles.infoSpecTitle}>RAM</div>
                    <img
                        className={styles.image}
                        src={infoUrl}
                        alt="gpu_image"
                    /> <br/><br/>
                    <div className={styles.infoSpecTitle}>{infoName}</div>
                    <div className={styles.urlLabel}><Link to={`/InsertCategoryRam`} className={styles.linkUrl}><FontAwesomeIcon icon={faBarsStaggered} bounce /> Learn more</Link></div>
                    <hr className={styles.hrStyle}/>
                    <div className={styles.infoSpecSubTitle}>Type & Size</div>
                    <div className={styles.infoSpecSub}>{infoType}&nbsp;{infoSize}</div>
                    <div className={styles.infoSpecSubTitle}>Latency (ns)</div>
                    <div className={styles.infoSpecSub}>{infoLatency}</div>
                    <div className={styles.infoSpecSubTitle}>읽기 속도</div>
                    <div className={styles.infoSpecSub}>{infoRead} (GB/s)</div>
                    <div className={styles.infoSpecSubTitle}>쓰기 속도</div>
                    <div className={styles.infoSpecSub}>{infoWrite} (GB/s)</div>
                    <hr className={styles.hrStyle}/>
                </div>
            ) : (
                <div>
                    <p className={styles.nullInfo}><FontAwesomeIcon icon={faFileCircleXmark} size="xl" />&emsp;서버에 없는 정보입니다.</p>
                </div>
                )}
        </div>
    );
}