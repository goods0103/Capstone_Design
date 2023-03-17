import { useEffect, useState } from "react";
import ProgressBar from 'react-bootstrap/ProgressBar';
import styles from "./cart.module.css";

const WithLabelExample = (totalPrice) => {
    var now = totalPrice*100 / 30000
    now = parseInt(now);
    //console.log(now);
    //const now = 50
    return <ProgressBar className={styles.progressBar} now={now} label={`${now}%`} animated = {true} striped variant="success"/>;
}

export default WithLabelExample;

export const CartProgress = ({ total, setTotal,cart, convertPrice, found }) => {
    //const [totalP, setTotalP] = useState(0);
    useEffect(() => {
        if (found) {
            const temp = found.filter((item) => item.length !== 0);
            const sum = temp.map((item) => item[0].price * item[0].quantity);
            const reducer = (acc, cur) => acc + cur;
            if (sum.length === 0) {
                setTotal(0);
                return;
            }
            const itemTotal = sum.reduce(reducer);
            setTotal(itemTotal);
            //setTotalP(itemTotal)
        } else {
            setTotal(0);
        }
        
    }, [cart, total, found, setTotal]);

    return(
        <div className={styles.progress}>
            <p></p>
            <div>
                {WithLabelExample(total)}
            </div>
            <p>{total >= 30000 ? <p className={styles.freeOrder}>무료배송</p> : 
            <p className={styles.order}>{convertPrice(30000 - total)}원 이상 주문시 무료배송</p>}</p>
        </div>
    )
};