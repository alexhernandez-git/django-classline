import React from "react";
import ReactDOM from "react-dom";
import App from "./routes/App";
import Academy from "./routes/Academy";
import DemoAcademy from "./routes/DemoAcademy";
import { AppProvider } from "src/context/AppContext";
// import "../../static/assets/styles/styles.scss";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import store from "src/redux/store";
import { Provider } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { Helmet } from "react-helmet";

const stripePromise = loadStripe(
  "pk_test_51HCsUHIgGIa3w9CpcKf0B6mwtGasJjOMo2DIu6oZ3Yawa7LdnAroU8USCk23lya8Q7CLpOwTsTjfKzlnflcbAPUG00ZQPMEjrE"
);

ReactDOM.render(
  <Provider store={store}>
    <AppProvider>
      <Elements stripe={stripePromise} options={{ locale: "es" }}>
        <BrowserRouter>
          <Switch>
            <Route path="/academy/:program" component={Academy} />
            <Route path="/demo/academy/:program" component={DemoAcademy} />
            <Route path="/" component={App} />
          </Switch>
        </BrowserRouter>
      </Elements>
    </AppProvider>
  </Provider>,
  document.getElementById("react")
);
