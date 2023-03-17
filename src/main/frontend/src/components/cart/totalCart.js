import styles from "./cart.module.css";
import { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Link } from "react-router-dom";
import Alert from 'react-bootstrap/Alert';
import Toast from 'react-bootstrap/Toast';

export const basicAlert = () => {
  return (
    <Alert key={'warning'} variant={'warning'}>
          20000원 이상 구매시 쿠폰을 사용할 수 있습니다.
    </Alert>
  );
}

export const TotalCart = ({ total, setTotal, cart, convertPrice, found }) => {
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
    } else {
      setTotal(0);
    }
    if(total >= 30000) {
      setOrder(0);
      console.log(order);
    }
    else {
      console.log(order);
      setOrder(3000);
    }
    if(total < 20000){
      setDiscount(0);
      dis.current.innerText = "쿠폰적용"
      dis.current.style="color:white"
    }

  }, [cart, total, found, setTotal]);

  const dis = useRef();

  const couponClick = () => {
    if(total >= 20000) {
      if(dis.current.innerText == "쿠폰적용") {
        dis.current.innerText = "쿠폰적용취소"
        dis.current.style = "color:red"
        setDiscount(5000);
      }
      else if(dis.current.innerText == "쿠폰적용취소") {
        dis.current.innerText = "쿠폰적용"
        dis.current.style="color:white"
        setDiscount(0);
      }
    }
    else {
      alert("20000원 이상 구매한 경우 쿠폰을 사용할 수 있습니다.");
      basicAlert();
    }
    
  }

  const orderProduct = () => {
    if(total == 0) {
      alert("상품을 선택해 주세요.")
    }
  }

  const [discount, setDiscount] = useState(0);
  const [order, setOrder] = useState(3000);
  return (
    <>
    <div className={styles.total}>
      <div className={styles.total_price}>
        <p className={styles.cart_product_total_price}>총 상품금액</p>
        <p className={styles.cart_product_price}>{convertPrice(total)}</p>
      </div>
      <div className={styles.pay_minus}>
        <img src="/images/icon-minus-line.svg" alt="minus" />
      </div>
      <div className={styles.sale}>
        <p className={styles.cart_product_sale}>상품 할인</p>
        <p className={styles.cart_product_sale_price}>{discount}원</p>
      </div>
      <div className={styles.pay_plus}>
        <img src="/images/icon-plus-line.svg" alt="plus" />
      </div>
      <div className={styles.delivery}>
        <p className={styles.cart_product_delivery}>배송비</p>
        <p className={styles.cart_product_delivery_price}>{order}원</p>
      </div>

      <div className={styles.payment}>
        <p className={styles.cart_prouct_payment}>결제 예정 금액</p>
        <p className={styles.cart_prouct_payment_price}>
          {convertPrice(total - discount + order)}
        </p>
      </div>
      <div className={styles.cart_product_price}>
        <button ref={dis} className={styles.btn_submit} onClick = {() => couponClick()}>
          쿠폰적용
        </button>
        <p></p>
        <Link to={total > 0 ? "/cart/orderComplete" : "/cart"}>
          <button className={styles.btn_submit} onClick={() => orderProduct()}>
            선택상품주문하기
          </button>
        </Link>
    </div>
    </div>
    
    </>
  );
};

