import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "src/containers/Home";
import Programs from "src/containers/Programs";
import Program from "src/containers/Program";
import Instructor from "src/containers/Instructor";
import Layout from "src/components/Layout/Layout";
import "static/assets/styles/styles.scss";
import ScrollToTop from "src/utils/ScrollToTop";
import StudentsZone from "src/containers/StudentsZone";
import TeachersZone from "src/containers/TeachersZone";
import Teaches from "src/containers/Teaches";
import Payments from "src/containers/Payments";
const App = () => {
  return (
    <Layout>
      <ScrollToTop />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/token/:token?" component={Home} />
        {/* <Route exact path="/courses" component={Courses} />
                    <Route path="/courses/:id" component={Courses} />
                    <Route path="/course/:id" component={Course} />
                    <Route exact path="/teachers" component={Teachers} />
                    <Route path="/teachers/:id" component={Teachers} />
                    <Route path="/teacher/:id" component={TeachersProfile} /> */}
        <Route exact path="/programs" component={Programs} />
        <Route path="/programs/:id" component={Programs} />
        <Route path="/program/:id" component={Program} />
        <Route path="/instructor/:id" component={Instructor} />

        <Route path="/teaches" component={Teaches} />
        <Route path="/cart/checkout/:id" component={Payments} />

        <Route path="/myzone/student" component={StudentsZone} />
        <Route path="/myzone/student/**" component={StudentsZone} />

        <Route path="/myzone/instructor" component={TeachersZone} />
        <Route path="/myzone/instructor/**" component={TeachersZone} />

        <Route path="/**" component={() => <h1>404 not found</h1>} />
      </Switch>
    </Layout>
  );
};
export default App;
