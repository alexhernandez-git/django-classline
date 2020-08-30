import React from "react";
import {
  FaChalkboardTeacher,
  FaUserEdit,
  FaChalkboard,
  FaUserGraduate,
} from "react-icons/fa";
import { MdMessage, MdSchool } from "react-icons/md";
import { IoMdPricetag } from "react-icons/io";
import { GiTeacher } from "react-icons/gi";

import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
export default function TeachersMenu() {
  return (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          <div className="teachers-menu zone-sidebar shadow bg-gradient-green">
            {appContext.userProfile.is_authenticated && (
              <Link to="/myzone/instructor">
                <div className="m-2 d-none d-md-block"></div>
                <div className="seccion">
                  <div
                    className={
                      /^\/myzone\/instructor\/?$/.test(location.pathname)
                        ? "div-icon-rol bg-white rounded-circle"
                        : "div-icon bg-white rounded-circle"
                    }
                  >
                    <IconContext.Provider
                      value={{
                        className: "global-class-name text-primary",
                        size: "20px",
                      }}
                    >
                      <FaUserEdit />
                    </IconContext.Provider>
                  </div>

                  <small className="text-white">Perfil</small>
                </div>
              </Link>
            )}
            <Link to="/myzone/instructor/pricing">
              <div className="m-2 d-none d-md-block"></div>
              <div className="seccion">
                <div
                  className={
                    /^\/myzone\/instructor\/pricing\/?$/.test(location.pathname)
                      ? "div-icon-rol bg-white rounded-circle"
                      : "div-icon bg-white rounded-circle"
                  }
                >
                  <IconContext.Provider
                    value={{
                      className: "global-class-name text-primary",
                      size: "20px",
                    }}
                  >
                    <IoMdPricetag />
                  </IconContext.Provider>
                </div>

                <small className="text-white">Precios</small>
              </div>
            </Link>
            {/* {
              // appContext.userProfile.user.profile.is_teacher ?
              appContext.userProfile.is_authenticated &&
              appContext.userProfile.user.profile.is_teacher ? (
                <> */}
            <Link to="/myzone/instructor/programs">
              <div className="seccion">
                <div
                  className={
                    /^\/myzone\/instructor\/program*/.test(location.pathname)
                      ? "div-icon-rol bg-white rounded-circle"
                      : "div-icon bg-white rounded-circle"
                  }
                >
                  <IconContext.Provider
                    value={{
                      className: "global-class-name text-primary",
                      size: "20px",
                    }}
                  >
                    <FaChalkboardTeacher />
                  </IconContext.Provider>
                </div>

                <small className="text-white">Academias</small>
              </div>
            </Link>
            {/* </>
              ) : (
                ""
              )
            } */}
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
}
