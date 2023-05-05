import React, { useEffect, useState } from "react";
import styles from "./category.module.css"
import Card from "react-bootstrap/Card";
import {ListGroup} from "react-bootstrap";
import {Link} from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function ShowInsertInfoRam({infoName, infoType, infoSize, infoLatency, infoRead, infoWrite, infoUrl, infoId}) {
    return(
        // <div className={styles.specCss}>
        //     <img
        //         className={styles.image}
        //         src={infoUrl}
        //         alt="ram_image"
        //     />
        //     <div className={styles.specInfoCss}>
        //         <p>ram_name: {infoName}</p>
        //         <p>ram_type: {infoType}</p>
        //         <p>ram_size: {infoSize}</p>
        //         <p>ram_latency: {infoLatency}</p>
        //         <p>ram_read: {infoRead}</p>
        //         <p>ram_write: {infoWrite}</p>
        //     </div>
        // </div>
        <div className={styles.specCss}>
            <Card >
                <Card.Img variant="top" src={infoUrl} style={{height: '30rem'}}/>
                <Card.Body style={{color: "black"}}>
                    <Card.Title>ram : {infoName}</Card.Title>
                    {/*<Card.Text>*/}
                    {/*    hello?*/}
                    {/*</Card.Text>*/}
                </Card.Body>
                <ListGroup className="list-group-flush">
                    <ListGroup.Item>ram_type: {infoType}</ListGroup.Item>
                    <ListGroup.Item>ram_size: {infoSize}</ListGroup.Item>
                    <ListGroup.Item>ram_latency: {infoLatency}</ListGroup.Item>
                    <ListGroup.Item>ram_read: {infoRead}</ListGroup.Item>
                    <ListGroup.Item>ram_write: {infoWrite}</ListGroup.Item>
                </ListGroup>
                <Card.Body>
                    {/*<Link to={`/RamSpec/${infoId}`}><Button variant="primary">상세 정보로 이동</Button></Link>*/}
                </Card.Body>
            </Card>
        </div>

    );
}