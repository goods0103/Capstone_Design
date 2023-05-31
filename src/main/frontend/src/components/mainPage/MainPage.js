import Carousel from 'react-bootstrap/Carousel';
import styles from "./eventBanner.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useStateValue} from "../reducer/StateProvider";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faFileArrowDown} from "@fortawesome/free-solid-svg-icons";


export const MainPage = () => {
  const [{count}, dispatch]= useStateValue();
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(count));
  }, []);

  const specButtonClicked = () => {
    alert("show my computer spec");
  }
  return (
    <div className={styles.total}>
      <div className={styles.left2}>
        
          <div className={styles.title}>
            <p className={styles.main}>Computer Spec Compare</p>
            <p className={styles.sub}>컴퓨터 스펙 비교</p>
            <p className={styles.trd}>당신의 컴퓨터를 비교하고 업그레이드를 선택하세요!</p>
          </div>

        <div className={styles.bottom2}>
          <Link to={"/showMySpec"}>
          <button className={styles.btnHover}>
            <FontAwesomeIcon icon={faFileArrowDown} bounce size="xl" />&emsp;Get My Spec
          </button>
          </Link>
           
          <Link to={"/insertSpec"}>
          <button className={styles.btnInsertHover}>
             Insert Spec
          </button>
          </Link>
        </div>
      </div>
      <div className={styles.right2}>
        <img
          className={styles.banner}
          src="images/banner10.jpg"
          alt="First slide"
        />
      </div>
    </div>
  );
};