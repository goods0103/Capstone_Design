import styles from "../main/main.module.css";
import { useEffect } from "react";
import { Product } from "../products/product";
import { getProducts } from "../../service/fetcher";
import { useParams } from "react-router-dom";
import CategoryBar from "./categoryBar";

export const CategoryMove = ({ convertPrice, products, setProducts }) => {
    let params = useParams();
    let category = params.n;
    const sortProduct = (type) => {
        if (type === "recent") {
          const newProduct = [...products];
          newProduct.sort((a, b) => a.id - b.id);
          setProducts(newProduct);
        } else if (type === "row") {
          const newProduct = [...products];
          newProduct.sort((a, b) => a.price - b.price);
          setProducts(newProduct);
        } else if (type === "high") {
          const newProduct = [...products];
          newProduct.sort((a, b) => b.price - a.price);
          setProducts(newProduct);
        }
      };
    
      useEffect(() => {
        getProducts().then((data) => {
          setProducts(data.data.products);
        });
      }, [setProducts]);
      return (
        <>
        <CategoryBar></CategoryBar>
          <p></p>
          <div className={styles.filter}>
            <p onClick={() => sortProduct("recent")}>최신순</p>
            <p onClick={() => sortProduct("row")}>낮은 가격</p>
            <p onClick={() => sortProduct("high")}>높은 가격</p>
          </div>
          <main className={styles.flex_wrap}>
            {products.map((product) => {
                if(product.category === category)
                return (
                    <Product
                    key={`key-${product.id}`}
                    product={product}
                    convertPrice={convertPrice}
                    />
              );
            })}
          </main>
        </>
      );
};