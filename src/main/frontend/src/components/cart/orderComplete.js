import styles from "./cart.module.css";
import { Link } from "react-router-dom";

export const OrderComplete = () => {
    const date = new Date();
    const week = new Array('일', '월', '화', '수', '목', '금', '토');
    return(
        <div className={styles.orderComplete}>
            <h1 className={styles.orderCompleteH1}>주문이 완료되었습니다!</h1>
            <p className={styles.orderCompleteP}>
                주문시간 : {date.toLocaleString()} [{week[date.getDay()]}요일]<br/>
                배송기간 1~2일 소요 <b className={styles.orderCompleteB}>[{week[date.getDay() + 2]}요일] 도착 보장</b>
            </p>
            <p className={styles.orderCompleteP}>
            <Link to="/">
                <button className={styles.btn_submit}>
                    계속쇼핑하기
                </button>
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/cart">
                <button className={styles.btn_submit}>
                    주문취소하기
                </button>
            </Link>
            </p>
        </div>
    )
}