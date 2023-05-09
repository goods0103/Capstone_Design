import Carousel from 'react-bootstrap/Carousel';
import styles from "./eventBanner.module.css";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import {useStateValue} from "../reducer/StateProvider";


export const EventBanner = () => {
  const [{count}, dispatch]= useStateValue();
  useEffect(() => {
    localStorage.setItem("state", JSON.stringify(count));
  }, []);

  const specButtonClicked = () => {
    alert("show my computer spec");
  }

  return (
    <div>
      <div className={styles.title}>
        <p className={styles.main}>Computer Spec Compare</p>
        <p className={styles.sub}>컴퓨터 스펙 비교</p>
        <p className={styles.trd}>당신의 컴퓨터를 비교하고 업그레이드를 선택하세요!</p>
      </div>
         
    {/*<Carousel fade>*/}
    {/*  <Carousel.Item>*/}

      <img
          className={styles.banner}
          src="images/banner10.jpg"
          alt="First slide"
      />
    {/*    <div className={styles.right}>*/}
    {/*    <img src="images/icon-swiper-2.svg" alt="right" />*/}
    {/*  </div>*/}
    {/*  <div className={styles.left}>*/}
    {/*    <img src="images/icon-swiper-1.svg" alt="left" />*/}
    {/*  </div>*/}
    {/*  </Carousel.Item>*/}
    {/*  <Carousel.Item>*/}
    {/*    <img*/}
    {/*      className={styles.banner}*/}
    {/*      src="images/banner02.png"*/}
    {/*      alt="Second slide"*/}
    {/*    />*/}
    {/*    <div className={styles.right}>*/}
    {/*    <img src="images/icon-swiper-2.svg" alt="right" />*/}
    {/*  </div>*/}
    {/*  <div className={styles.left}>*/}
    {/*    <img src="images/icon-swiper-1.svg" alt="left" />*/}
    {/*  </div>*/}
    {/*  </Carousel.Item>*/}
    {/*  <Carousel.Item>*/}
    {/*    <img*/}
    {/*      className={styles.banner}*/}
    {/*      src="images/banner03.png"*/}
    {/*      alt="Third slide"*/}
    {/*    />*/}
    {/*    <div className={styles.right}>*/}
    {/*    <img src="images/icon-swiper-2.svg" alt="right" />*/}
    {/*  </div>*/}
    {/*  <div className={styles.left}>*/}
    {/*    <img src="images/icon-swiper-1.svg" alt="left" />*/}
    {/*  </div>*/}
    {/*  </Carousel.Item>*/}
    {/*  <Carousel.Item>*/}
    {/*    <img*/}
    {/*      className={styles.banner}*/}
    {/*      src="images/banner04.png"*/}
    {/*      alt="Forth slide"*/}
    {/*    />*/}
    {/*    <div className={styles.right}>*/}
    {/*    <img src="images/icon-swiper-2.svg" alt="right" />*/}
    {/*  </div>*/}
    {/*  <div className={styles.left}>*/}
    {/*    <img src="images/icon-swiper-1.svg" alt="left" />*/}
    {/*  </div>*/}
    {/*  </Carousel.Item>*/}
    {/*  <Carousel.Item>*/}
    {/*    <img*/}
    {/*      className={styles.banner}*/}
    {/*      src="images/banner05.png"*/}
    {/*      alt="Fifth slide"*/}
    {/*    />*/}
    {/*    <div className={styles.right}>*/}
    {/*    <img src="images/icon-swiper-2.svg" alt="right" />*/}
    {/*  </div>*/}
    {/*  <div className={styles.left}>*/}
    {/*    <img src="images/icon-swiper-1.svg" alt="left" />*/}
    {/*  </div>*/}
    {/*  </Carousel.Item>*/}
    {/*  <Carousel.Item>*/}
    {/*    <img*/}
    {/*      className={styles.banner}*/}
    {/*      src="images/banner06.png"*/}
    {/*      alt="Sixth slide"*/}
    {/*    />*/}
    {/*    <div className={styles.right}>*/}
    {/*    <img src="images/icon-swiper-2.svg" alt="right" />*/}
    {/*  </div>*/}
    {/*  <div className={styles.left}>*/}
    {/*    <img src="images/icon-swiper-1.svg" alt="left" />*/}
    {/*  </div>*/}
    {/*  </Carousel.Item>*/}
    {/*</Carousel>*/}
    <div className={styles.frame}>
      <Link to={"/showMySpec"}>
        <button className={styles.buttonSpec}>
          Get My Spec
        </button>
      </Link>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <Link to={"/insertSpec"}>
        <button className={styles.buttonInsert}>
        Insert Spec
        </button>
      </Link>
    </div>
    </div>
  );
};