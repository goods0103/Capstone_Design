import styles from "./topNavigationBar.module.css";
import { Link } from "react-router-dom";

export const TopNavigationBar = ({ cart }) => {
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/">
          <h1 className={styles.logo}>
            <img src="/images/logo.png" alt="logo" />
          </h1>
        </Link>
        <div className={styles.input_wrap}>
          <input type="text" placeholder="상품을 검색해보세요!" />
          <img src="/images/icon-search.svg" alt="search" />
        </div>
      </div>

      <div className={styles.menu}>
        <Link to="/cart">
          <div className={styles.shopping_cart}>
            <img src="/images/icon-shopping-cart.svg" alt="cart" />
            <span>MySpec</span>
            {cart.length >= 1 ? (
              <div className={styles.new_shopping_cart}>
                <p>{cart.length}</p>
              </div>
            ) : (
              ""
            )}
          </div>
        </Link>
        <Link to="">
          <div className={styles.mypage}>
            <img src="/images/icon-user.svg" alt="user" />
            <span>InsertSpec</span>
          </div>
        </Link>
        <Link to="">
          <div className={styles.mypage}>
            <img src="/images/icon-user.svg" alt="user" />
            <span>HowToViewSpec</span>
          </div>
        </Link>
      </div>
    </header>
  );
};
