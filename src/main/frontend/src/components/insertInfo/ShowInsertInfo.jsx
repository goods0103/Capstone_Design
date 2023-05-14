import React, { useEffect, useState } from "react";
import styles from "./category.module.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";
import MyBottleNeck from "../myInfo/MyBottleNeck";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faBarsStaggered, faCircleInfo, faDesktop} from "@fortawesome/free-solid-svg-icons";

export default function ShowInsertInfo({infoName, infoMark, infoRank, infoValue, infoPrice, infoUrl, infoId}) {

    const [showComponent, setShowComponent] = useState(false);

    function showMyBottleNeck() {
        setShowComponent(true);
    }

    return(
        <div className={`${styles.divChild} ${styles.divChildCpuAnimation}`}>
            {/*<div className={styles.specCss}>*/}
            {/*    <Card >*/}
            {/*        <Card.Img variant="top" src={infoUrl} style={{height: '30rem'}}/>*/}
            {/*        <Card.Body style={{color: "black"}}>*/}
            {/*            <Card.Title>{infoCategory} : {infoName}</Card.Title>*/}
            {/*            /!*<Card.Text>*!/*/}
            {/*            /!*    hello?*!/*/}
            {/*            /!*</Card.Text>*!/*/}
            {/*        </Card.Body>*/}
            {/*        <ListGroup className="list-group-flush">*/}
            {/*            <ListGroup.Item>{infoCategory}_mark: {infoMark}</ListGroup.Item>*/}
            {/*            <ListGroup.Item>{infoCategory}_rank: {infoRank}</ListGroup.Item>*/}
            {/*            <ListGroup.Item>{infoCategory}_value: {infoValue}</ListGroup.Item>*/}
            {/*            <ListGroup.Item>{infoCategory}_price: {infoPrice}</ListGroup.Item>*/}
            {/*        </ListGroup>*/}
            {/*        <Card.Body>*/}
            {/*            <Link to={'/CpuSpec/${infoId}'}><Button variant="primary">상세 정보로 이동</Button></Link>*/}
            {/*        </Card.Body>*/}
            {/*    </Card>*/}
            {/*</div>*/}
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

    );
}