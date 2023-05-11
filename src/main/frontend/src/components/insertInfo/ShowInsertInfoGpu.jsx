import React, { useEffect, useState } from "react";
import styles from "./category.module.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

export default function ShowInsertInfoGpu({infoName, infoMark, infoRank, infoValue, infoPrice, infoUrl, infoId}) {
    return(
        <div className={styles.divChild}>
            <div className={styles.infoSpecTitle}>GPU</div>
            <img
                className={styles.image}
                src={infoUrl}
                alt="gpu_image"
            /><br/><br/>
            <div className={styles.infoSpecTitle}>{infoName}</div>
                <div className={styles.urlLabel}><Link to={`/GpuSpec/${infoId}`} className={styles.linkUrl}>더 알아보기 ></Link></div>
            <hr className={styles.hrStyle}/>
            <div className={styles.infoSpecSubTitle}>Mark Rating</div>
            <div className={styles.infoSpecSub}>{infoMark}</div>
            <div className={styles.infoSpecSubTitle}>Rank</div>
            <div className={styles.infoSpecSub}>{infoRank}</div>
            <div className={styles.infoSpecSubTitle}>Value</div>
            <div className={styles.infoSpecSub}>{infoValue}</div>
            <div className={styles.infoSpecSubTitle}>Price</div>
            <div className={styles.infoSpecSub}>{infoPrice}</div>
            <hr className={styles.hrStyle}/>
        </div>

    );
}