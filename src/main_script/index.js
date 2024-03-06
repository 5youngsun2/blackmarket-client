import "./index.css";
import axios from "axios";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { API_URL } from "../config/constants.js";
import { Carousel } from "antd";

dayjs.extend(relativeTime);

function MainPage() {
  const [products, setProducts] = React.useState([]);
  const [banners, setBanners] = React.useState([]);
  React.useEffect(function () {
    axios
      .get(`${API_URL}/products`)
      .then(function (result) {
        const products = result.data.products;
        setProducts(products);
      })
      .catch(function (error) {
        console.error("에러 발생 : {error}");
      });

    axios
      .get(`${API_URL}/banners`)
      .then((result) => {
        const banners = result.data.banners;
        setBanners(banners);
      })
      .catch((error) => {
        console.error("에러발생 : ", error);
      });
  }, []);

  return (
    <div>
      <div id="banner">
        <span>#오포차 #오자카야 #오마카세 #주인이술더먹음 #꽐라제조업소</span>
      </div>

      <Carousel autoplay="ture" autoplaySpeed={3000}>
        {banners.map((banner, index) => {
          return (
            <Link to={banner.href}>
              <div id="slide">
                <img src={`${API_URL}/${banner.imageUrl}`} />
              </div>
            </Link>
          );
        })}
      </Carousel>

      <h2>판매되는 상품들</h2>

      <div id="product-list">
        {products.map(function (product, index) {
          return (
            <div className="product-card">
              {product.soldout === 1 && <div className="product-blur" />}
              <Link className="product-link" to={"/product/" + product.id}>
                <div>
                  <img
                    className="product-img"
                    src={`${API_URL}/${product.imageUrl}`}
                    alt="상품 이미지"
                  />
                </div>
                <div className="product-contents">
                  <span className="product-name">{product.name}</span>
                  <span className="product-price">
                    {product.price.toLocaleString()}원
                  </span>
                  <div className="product-footer">
                    <div className="product-seller">
                      <img
                        className="product-avatar"
                        src="images/icons/cooker.png"
                        alt="판매자 아이콘"
                      />
                      <span>{product.seller}</span>
                    </div>
                    <span className="product-date">
                      {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
                    </span>
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
