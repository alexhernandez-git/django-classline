import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";

import Login from "../containers/dashboard/Login";
import Layout from "../components/Dashboard/Layout/Layout";
import CostumersList from "../containers/dashboard/CostumersList";
import ProfileDashboard from "../components/Dashboard/ui/ProfileDashboard";
import CostumersPayments from "../containers/dashboard/CostumersPayments";
import CommercialList from "../containers/dashboard/CommercialsList";
import { useSelector, useDispatch } from "react-redux";
import { loadCommercial } from "../redux/actions/authCommercials";
import { useHistory } from "react-router-dom";

const Dashboard = () => {
  const dispatch = useDispatch();
  const authCommercialsReducer = useSelector(
    (state) => state.authCommercialsReducer
  );
  const history = useHistory();
  useEffect(() => {
    if (authCommercialsReducer.isAuthenticated) history.push(`/dashboard`);
  }, [authCommercialsReducer.isAuthenticated]);
  useEffect(() => {
    console.log(authCommercialsReducer);
  }, [authCommercialsReducer]);
  useEffect(() => {
    dispatch(loadCommercial());
  }, []);
  return authCommercialsReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <ScrollToTop />
      <Switch>
        <Route exact path="/dashboard/login" component={Login} />

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
