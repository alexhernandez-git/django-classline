import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";

import MainPage from "../containers/dashboard/MainPage";
import Layout from "../components/Dashboard/Layout/Layout";
import CostumersList from "../containers/dashboard/CostumersList";
import ProfileDashboard from "../components/Dashboard/ui/ProfileDashboard";
import CostumersPayments from "../containers/dashboard/CostumersPayments";
import CommercialList from "../containers/dashboard/CommercialsList";
const Dashboard = () => {
  return (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/dashboard/login" component={MainPage} />
        <Layout>
          <Route exact path="/dashboard" component={CostumersList} />
          <Route exact path="/dashboard/profile" component={ProfileDashboard} />
          <Route
            exact
            path="/dashboard/payments"
            component={CostumersPayments}
          />
          <Route
            exact
            path="/dashboard/commercials"
            component={CommercialList}
          />
        </Layout>
      </Switch>
    </>
  );
};
export default Dashboard;
