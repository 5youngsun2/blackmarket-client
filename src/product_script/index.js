import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./index.css";
import { API_URL } from "../config/constants.js";
import dayjs from "dayjs";
import { Button, message } from "antd";

function ProductPage() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const getProduct = () => {
    axios
      .get(`${API_URL}/product/${id}`)
      .then(function (result) {
        setProduct(result.data.product);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  useEffect(function () {
    getProduct();
  }, []);

  if (product == null) {
    return <h1>상품 정보를 수신 중입니다.</h1>;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("구매가 완료되었습니다.");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <div>
      <div id="image-box">
        <img src={`${API_URL}/${product.imageUrl}`} alt="상품 이미지" />
      </div>
      <div id="profile-box">
        <img src="/images/icons/cooker.png" alt="판매자 아바타" />
        <span>{product.seller}</span>
      </div>
      <div id="contents-box">
        <div id="name">{product.name}</div>
        <div id="price">{product.price.toLocaleString()}원</div>
        <div id="createAt">
          {dayjs(product.createdAt).format("YYYY년 MM월 DD일")}
        </div>
        <Button
          id="purchase-button"
          size="large"
          type="primary"
          danger="true"
          onClick={onClickPurchase}
          disabled={product.soldout === 1 ? true : false}
        >
          {product.soldout === 1 ? "판매완료" : "구매하기"}
        </Button>
        <pre id="description">{product.description}</pre>
      </div>
      <div id="control-menu">
        <button>수정</button>
        <button>삭제</button>
      </div>
    </div>
  );
}

export default ProductPage;
