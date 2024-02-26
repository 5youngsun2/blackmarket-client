import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";

function MainPage() {
  const [products, setProducts] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(
        "https://13a5a45a-cb75-4932-8302-ceb1153a79f9.mock.pstmn.io/products"
      )
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생 : {error}");
      });
  }, []);

  return (
    <div>
      <div id="banner">
        <span>#오포차 #오자카야 #오마카세 #주인이술더먹음 #꽐라제조업소</span>
      </div>

      <h2>판매되는 상품들</h2>

      <div id="product-list">
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              <Link className="product-link" to={"/product/" + product.id}>
                <div>
                  <img
                    className="product-img"
                    src={product.imageUrl}
                    alt="상품 이미지"
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">{product.price}원</span>
                  <div className="product-seller">
                    <img
                      className="product-avatar"
                      src="images/icons/cooker.png"
                      alt="판매자 아이콘"
                    />
                    <span>{product.seller}</span>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MainPage;
