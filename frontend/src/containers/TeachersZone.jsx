import React, { useContext } from "react";
import "static/assets/styles/containers/TeachersZone.scss";
import TeachersMenu from "src/components/Users/Teachers/TeachersZone/TeachersMenu";
import { Route, Redirect } from "react-router-dom";
import ScrollToTop from "src/utils/ScrollToTop";
import "static/assets/styles/components/Layout/ZoneSidebar.scss";
import TeachersProfileEdit from "src/components/Users/Teachers/TeachersZone/TeachersProfileEdit/TeachersProfileEdit";
import TeachersPrograms from "src/components/Users/Teachers/TeachersZone/TeachersPrograms/TeachersPrograms";
// import ProgramsData from "src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsData/ProgramsData"
import ProgramsCreate from "src/components/Users/Teachers/TeachersZone/TeachersPrograms/ProgramsCreate";

import { AppContext } from "src/context/AppContext";
import TeachersPricing from "../components/Users/Teachers/TeachersZone/TeachersPricing";
export default function TeachersZone() {
  const appContext = useContext(AppContext);
  return (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          <div className="min-vh-100 bg-light pb-5">
            <TeachersMenu />

            <div className="content-zone">
              <div>
                <div className="bg-gradient-green h3 mb-0 border-0 text-white text-center cursor-no-ponter py-2 px-4 w-100">
                  Instructor
                </div>
              </div>
              {appContext.userProfile.is_authenticated &&
              !appContext.userProfile.user.profile.is_teacher ? (
                <>
                  <div>
                    <div className="bg-danger border-0 text-white text-center cursor-no-ponter py-2 px-4 w-100">
                      Activa la cuenta de instructor para crear tus academias
                    </div>
                  </div>
                </>
              ) : (
                ""
              )}
              {/* <ScrollToTop /> */}
              <Route
                exact
                path="/myzone/instructor"
                component={
                  !appContext.userProfile.is_authenticated ? (
                    <Redirect to="/" />
                  ) : (
                    TeachersProfileEdit
                  )
                }
              />
              <Route
                exact
                path="/myzone/instructor/pricing"
                component={TeachersPricing}
              />
              <Route
                exact
                path="/myzone/instructor/programs"
                component={
                  !appContext.userProfile.is_authenticated ? (
                    <Redirect to="/" />
                  ) : appContext.userProfile.user.profile.is_teacher ? (
                    TeachersPrograms
                  ) : (
                    () => <Redirect to="/myzone/instructor" />
                  )
                }
              />
              <Route
                exact
                path="/myzone/instructor/new/program/"
                component={
                  !appContext.userProfile.is_authenticated ? (
                    <Redirect to="/" />
                  ) : appContext.userProfile.user.profile.is_teacher ? (
                    ProgramsCreate
                  ) : (
                    () => <Redirect to="/myzone/instructor" />
                  )
                }
              />
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
}
