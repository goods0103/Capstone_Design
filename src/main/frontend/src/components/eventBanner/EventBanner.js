import Carousel from 'react-bootstrap/Carousel';
import styles from "./eventBanner.module.css";
import { Link } from "react-router-dom";

export const EventBanner = () => {

  const specButtonClicked = () => {
    alert("show my computer spec");
  }

  return (
    <div>
    <Carousel fade>
      <Carousel.Item>
        <img
          className={styles.banner}
          src="images/banner01.png"
          alt="First slide"
        />
        <div className={styles.right}>
        <img src="images/icon-swiper-2.svg" alt="right" />
      </div>
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.banner}
          src="images/banner02.png"
          alt="Second slide"
        />
        <div className={styles.right}>
        <img src="images/icon-swiper-2.svg" alt="right" />
      </div>
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.banner}
          src="images/banner03.png"
          alt="Third slide"
        />
        <div className={styles.right}>
        <img src="images/icon-swiper-2.svg" alt="right" />
      </div>
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.banner}
          src="images/banner04.png"
          alt="Forth slide"
        />
        <div className={styles.right}>
        <img src="images/icon-swiper-2.svg" alt="right" />
      </div>
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.banner}
          src="images/banner05.png"
          alt="Fifth slide"
        />
        <div className={styles.right}>
        <img src="images/icon-swiper-2.svg" alt="right" />
      </div>
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className={styles.banner}
          src="images/banner06.png"
          alt="Sixth slide"
        />
        <div className={styles.right}>
        <img src="images/icon-swiper-2.svg" alt="right" />
      </div>
      <div className={styles.left}>
        <img src="images/icon-swiper-1.svg" alt="left" />
      </div>
      </Carousel.Item>
    </Carousel>
    <div className={styles.frame}>
      <Link to={"/showMySpec"}>
        <button className={styles.button}>
          내 컴퓨터 스펙 불러오기
        </button>
      </Link>
      &emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;
      <Link to={"/insertSpec"}>
        <button className={styles.button}>
        컴퓨터 스펙 입력하기
        </button>
      </Link>
    </div>
    </div>
  );
};