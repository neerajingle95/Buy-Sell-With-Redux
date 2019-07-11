import React from "react";
import { Route, IndexRoute } from "react-router";
import App from "./components/App";
import LoginPage from "./components/login/LoginPage";
import BuyerPage from "./components/buyer/BuyerPage";
import ManageBuyerPage from "./components/buyer/ManageBuyerPage"; //eslint-disable-line import/no-named-as-default
import BuyProductPage from "./components/buyer/BuyProductPage";
import SellerPage from "./components/seller/SellerPage";
import Authenticate from "./components/common/Authenticate";

export default (
  <Route path="/" component={App}>
    <IndexRoute component={LoginPage} />
    <Route path="buyers" component={Authenticate(BuyerPage)} />
    <Route path="seller" component={Authenticate(ManageBuyerPage)} />
    <Route path="buyProduct/:id" component={Authenticate(BuyProductPage)} />
    <Route path="sellers" component={Authenticate(SellerPage)} />
    <Route path="seller/:id" component={Authenticate(ManageBuyerPage)} />
  </Route>
);
