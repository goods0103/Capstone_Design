import "./App.css";
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useState } from "react";
import { TopNavigationBar } from "./components/header/topNavigationBar";
import Home from "./pages/home";
import Product from "./pages/product";
import Basket from "./pages/basket";
import TopButton from "./components/topButton/topButton";
import CategoryBar from "./components/category/categoryBar";
import { OrderComplete } from "./components/cart/orderComplete";
import { CategoryMove } from "./components/category/categoryMove";
import ShowMySpec from "./components/eventBanner/ShowMySpec";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const a=10;
  const convertPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <BrowserRouter>
      <TopNavigationBar cart={cart} />
      {/* <CategoryBar></CategoryBar> */}
      <TopButton></TopButton>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              convertPrice={convertPrice}
              products={products}
              setProducts={setProducts}
            />
          }
        />
        <Route
          path="/product/:id"
          element={
            <Product
              convertPrice={convertPrice}
              cart={cart}
              setCart={setCart}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Basket cart={cart} setCart={setCart} convertPrice={convertPrice} />
          }
        />
        <Route
          path="/cart/orderComplete"
          element={
            <OrderComplete />
          }
        />
        <Route
          path="/category/:n"
          element={
            <CategoryMove
              convertPrice={convertPrice}
              products={products}
              setProducts={setProducts}
            />

          }
        />
          <Route
              path="/showMySpec"
              element={
                  <ShowMySpec />
              }
          />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
