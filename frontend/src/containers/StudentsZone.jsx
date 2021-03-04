import React, { useContext } from "react";
import "static/assets/styles/containers/StudentsZone.scss";
import { Route, Redirect } from "react-router-dom";
import ScrollToTop from "src/utils/ScrollToTop";

import StudentsMenu from "src/components/Users/Students/StudentsZone/StudentsMenu";
import StudentsProfileEdit from "src/components/Users/Students/StudentsZone/StudentsProfileEdit/StudentsProfileEdit";
import StudentsEvents from "src/components/Users/Students/StudentsZone/StudentsEvents/StudentsEvents";
import StudentsPrograms from "src/components/Users/Students/StudentsZone/StudentsPrograms/StudentsPrograms";
import { AppContext } from "src/context/AppContext";
const StudentsZone = () => {
  const appContext = useContext(AppContext);
  return appContext.userProfile.loading ? (
    "Cargando..."
  ) : !appContext.userProfile.is_authenticated ? (
    <Redirect to="/" />
  ) : (
    <div className="min-vh-100 bg-light">
      <StudentsMenu />
      <div className="content-zone text-grey">
        <div>
          <div className="bg-gradient-green h3 border-0 text-white text-center cursor-no-ponter mb-0 py-2 w-100">
            Alumno
          </div>
        </div>
        <Route exact path="/myzone/student" component={StudentsProfileEdit} />
        <Route
          exact
          path="/myzone/student/programs"
          component={StudentsPrograms}
        />
        <Route exact path="/myzone/student/events" component={StudentsEvents} />
        {/* <Route exact path="/myzone/student/messages" component={() => `Proximamente, demomento si quieres contactar con tus profesores en tus clases tienes sus correos. Disculpe las molestias. `} /> */}
      </div>
    </div>
  );
};

export default StudentsZone;
