import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";
import {useEffect, useState} from "react";
import CategoryBar from "../category/CategoryBar";
import CategoryBar2 from "../myInfo/CategoryBar2";
import CategoryBar3 from "../insertInfo/CategoryBar3";
import { useStateValue } from '../reducer/StateProvider';

export const TopNavigationBar = ({ cart }) => {
  const [localData, setLocalData] = useState("");
  const [{ count }, dispatch] = useStateValue();

  useEffect(() => {
    setLocalData(localStorage.getItem('cpuData'));
  }, []);

  const handleLogoClick = () => {
    dispatch({
      type:'1',
    });
  };
  const handleMySpecClick = () => {
    dispatch({
      type:'2',
    });
  };




  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/">
          <h1 className={styles.logo} onClick={handleLogoClick}>
            <img src="/images/scoop.png" alt="logo" />
          </h1>
        </Link>
        {count === 1 && <CategoryBar className={styles.categoryBarCSS}></CategoryBar>}
        {count === 2 && <CategoryBar2 className={styles.categoryBarCSS}></CategoryBar2>}
        {count === 3 && <CategoryBar3 className={styles.categoryBarCSS}></CategoryBar3>}
        {/*<div className={styles.input_wrap}>*/}
        {/*  <input type="text" placeholder="상품을 검색해보세요!" />*/}
        {/*  <img src="/images/icon-search.svg" alt="search" />*/}
        {/*</div>*/}
      </div>

      {count===1 && <div className={styles.menu}>
        <Link to={localData ? "/mySpec" : "/showMySpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage1} onClick={handleMySpecClick}>
            <span>MySpec</span>
          </div>
        </Link>
        &emsp;&emsp;
        <Link to={"/insertSpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage2} >
            <span>InsertSpec</span>
          </div>
        </Link>
        &emsp;&emsp;
        <Link to={"/HowToViewSpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage3} >
            <span>HowToView</span>
          </div>
        </Link>
      </div>
      }

      {count===2 && <div className={styles.menu}>
        &emsp;&emsp;
        <Link to={localData ? "/mySpec" : "/showMySpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage1}>
            <span>Spec</span>
          </div>
        </Link>
        &emsp;&emsp;
        <Link to={"/HowToViewSpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage3} >
            <span>HowToView</span>
          </div>
        </Link>
      </div>
      }
      {count===3 && <div className={styles.menu}>
        &emsp;&emsp;
        <Link to={"/insertSpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage1}>
            <span>Spec</span>
          </div>
        </Link>
        &emsp;&emsp;
        <Link to={"/HowToViewSpec"} style={{ textDecoration: 'none' }}>
          <div className={styles.mypage3} >
            <span>HowToView</span>
          </div>
        </Link>
      </div>
      }
    </header>
  );
};
