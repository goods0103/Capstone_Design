import { Cart } from "../components/cart/cart";

const Basket = ({ cart, setCart, convertPrice }) => {
  return <Cart cart={cart} setCart={setCart} convertPrice={convertPrice} />;
};

export default Basket;
