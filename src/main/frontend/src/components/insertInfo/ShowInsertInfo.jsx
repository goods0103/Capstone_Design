import React, { useEffect, useState } from "react";
import styles from "./category.module.css"
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import {Link} from "react-router-dom";
import {ListGroup} from "react-bootstrap";

export default function ShowInsertInfo({infoName, infoMark, infoRank, infoValue, infoPrice, infoUrl, infoCategory, infoId}) {
    return(
        // <div className={styles.specCss}>
        //     <img
        //         className={styles.image}
        //         src={infoUrl}
        //         alt="cpu_image"
        //     />
        //     <div className={styles.specInfoCss}>
        //         <p>{infoCategory}_name: {infoName}</p>
        //         <p>{infoCategory}_mark: {infoMark}</p>
        //         <p>{infoCategory}_rank: {infoRank}</p>
        //         <p>{infoCategory}_value: {infoValue}</p>
        //         <p>{infoCategory}_price: {infoPrice}</p>
        //     </div>
        // </div>

        // style={{width: '30rem', border: '3px solid #30D5C8'}}
        <div className={styles.specCss}>
            <Card >
                <Card.Img variant="top" src={infoUrl} style={{height: '30rem'}}/>
                <Card.Body style={{color: "black"}}>
                    <Card.Title>{infoCategory} : {infoName}</Card.Title>
                    {/*<Card.Text>*/}
                    {/*    hello?*/}
                    {/*</Card.Text>*/}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>{infoCategory}_mark: {infoMark}</ListGroup.Item>
                    <ListGroup.Item>{infoCategory}_rank: {infoRank}</ListGroup.Item>
                    <ListGroup.Item>{infoCategory}_value: {infoValue}</ListGroup.Item>
                    <ListGroup.Item>{infoCategory}_price: {infoPrice}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    <Link to={infoCategory === "cpu" ? `/CpuSpec/${infoId}` : `/GpuSpec/${infoId}`}><Button variant="primary">상세 정보로 이동</Button></Link>
                </Card.Body>
            </Card>
        </div>

    );
}