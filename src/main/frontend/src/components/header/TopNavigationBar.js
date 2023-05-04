import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import CategoryBar from "../category/CategoryBar";

export const TopNavigationBar = ({ cart }) => {
  const [localData, setLocalData] = useState("");
  useEffect(() => {
    setLocalData(localStorage.getItem('cpuData'));
  }, []);
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/">
          <h1 className={styles.logo}>
            <img src="/images/scoop.png" alt="logo" />
          </h1>
        </Link>
        <CategoryBar className={styles.categoryBarCSS}></CategoryBar>
        {/*<div className={styles.input_wrap}>*/}
        {/*  <input type="text" placeholder="상품을 검색해보세요!" />*/}
        {/*  <img src="/images/icon-search.svg" alt="search" />*/}
        {/*</div>*/}
      </div>

      <div className={styles.menu}>
        <Link to={localData ? "/mySpec" : "/showMySpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage1}>
            <span>MySpec</span>
          </div>
        </Link>
        &emsp;
        <Link to={"/insertSpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage2} >
            <span>InsertSpec</span>
          </div>
        </Link>
        &emsp;
        <Link to={"/HowToViewSpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage3} >
            <span>HowToView</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
