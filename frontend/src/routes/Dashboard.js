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
import { connectStripe } from "../redux/actions/authCommercials";

const Dashboard = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (new URLSearchParams(props.location.search).get("code") != null) {
      const authCode = new URLSearchParams(props.location.search).get("code");
      dispatch(connectStripe(authCode));
    }
  }, []);
  const authCommercialsReducer = useSelector(
    (state) => state.authCommercialsReducer
  );

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
        {!authCommercialsReducer.isAuthenticated ? (
          <>
            <Route exact path="/dashboard" component={Login} />
            <Route exact path="/dashboard/**" component={Login} />
          </>
        ) : (
          <Layout>
            <Route exact path="/dashboard" component={CostumersList} />
            <Route
              exact
              path="/dashboard/profile"
              component={ProfileDashboard}
            />
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
        )}
      </Switch>
    </>
  );
};
export default Dashboard;
