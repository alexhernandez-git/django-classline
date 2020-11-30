import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import Academy from "./routes/Academy";
import Pack from "./routes/Pack";
import { AppProvider } from "src/context/AppContext";
// import "../../static/assets/styles/styles.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "src/redux/store";
import { Provider } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet";
import Dashboard from "./routes/Dashboard";

const stripePromise = loadStripe(
  "pk_live_51HCsUHIgGIa3w9Cpq4qrchGYGZkc6W7SNIz6016DUM7NQ3QQeyVZBObydxCjbhiQPTZDkY3jz0s8vk3hvXDlbvrf00rHuKQduT"
);
//prod
// "pk_live_51HCsUHIgGIa3w9Cpq4qrchGYGZkc6W7SNIz6016DUM7NQ3QQeyVZBObydxCjbhiQPTZDkY3jz0s8vk3hvXDlbvrf00rHuKQduT"
//dev
// "pk_test_51HCsUHIgGIa3w9CpcKf0B6mwtGasJjOMo2DIu6oZ3Yawa7LdnAroU8USCk23lya8Q7CLpOwTsTjfKzlnflcbAPUG00ZQPMEjrE"
// document.addEventListener("contextmenu", function (e) {
//   e.preventDefault();
// });
ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <Elements stripe={stripePromise} options={{ locale: "es" }}>
        <BrowserRouter>
          <Switch>
            <Route path="/pack/:program/:pack" component={Pack} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/academy/:program" component={Academy} />
            <Route path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </Elements>
    </AppProvider>
  </Provider>,
  document.getElementById("react")
);
