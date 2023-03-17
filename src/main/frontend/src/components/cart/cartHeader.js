import styles from "./cart.module.css";

export const CartHeader = ({ isAllChecked, handleCheckAll }) => {
  return (
    <>
      <header className={styles.header}>
        <h1>내 컴퓨터 정보</h1>
      </header>
      <div className={styles.cart_title_wrap}>
        <div className={styles.tab_title}>
          <input
            type="checkbox"
            checked={isAllChecked}
            onChange={(e) => handleCheckAll(e.target.checked)}
          />
          <span>CPU</span>
          <span>GPU</span>
          <span>RAM</span>

          <p>전체선택</p>
        </div>
      </div>
    </>
  );
};
