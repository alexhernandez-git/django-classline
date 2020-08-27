import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";

import MainPage from "../containers/dashboard/MainPage";
import Layout from "../components/Dashboard/Layout/Layout";
import SalesDashboard from "../containers/dashboard/SalesDashboard";
const Dashboard = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/dashboard" component={MainPage} />
        <Layout>
          <Route exact path="/dashboard/menu" component={SalesDashboard} />
        </Layout>
      </Switch>
    </>
  );
};
export default Dashboard;
