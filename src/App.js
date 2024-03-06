import "./App.css";
//import "antd/dist/antd.css";
import MainPage from "./main_script/index.js";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import UploadPage from "./upload_script/index.js";
import ProductPage from "./product_script/index.js";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

function App() {
  const history = useHistory();

  return (
    <div>
      <div id="header">
        <div id="header-area">
          <Link to="/">
            <img src="/images/icons/header_logo.png" alt="로고" />
          </Link>
          <span>오영선</span>
          <Button
            size="large"
            onClick={function () {
              history.push("/upload");
            }}
            icon={<DownloadOutlined />}
          >
            상품 업로드
          </Button>
        </div>
      </div>
      <div id="body">
        <Switch>
          <Route exact={true} path={"/"}>
            <MainPage />
          </Route>
          <Route exact={true} path={"/product/:id"}>
            <ProductPage />
          </Route>
          <Route exact={true} path={"/upload"}>
            <UploadPage />
          </Route>
        </Switch>
      </div>
      <div id="footer"></div>
    </div>
  );
}

export default App;
