import React from "react";
import {
  FaChalkboardTeacher,
  FaChalkboard,
  FaUserGraduate,
  FaUserEdit,
} from "react-icons/fa";
import { MdMessage } from "react-icons/md";
import { IconContext } from "react-icons";
import { Link } from "react-router-dom";
import "static/assets/styles/components/Users/Students/StudentsZone/StudentsMenu.scss";
export default function StudentsMenu() {
  return (
    <div className="student-menu zone-sidebar shadow bg-light">
      <Link to="/myzone/student">
        <div className="m-2 d-none d-md-block"></div>

        <div className="seccion">
          <div
            className={
              /^\/myzone\/student(\/)?$/.test(location.pathname)
                ? "div-icon-rol bg-gradient-green rounded-circle bg-white"
                : "div-icon bg-gradient-green rounded-circle bg-white"
            }
          >
            <IconContext.Provider
              value={{
                className: "global-class-name text-white",
                size: "20px",
              }}
            >
              <FaUserEdit />
            </IconContext.Provider>
          </div>

          <small>Perfil</small>
        </div>
      </Link>
      <Link to="/myzone/student/programs">
        <div className="seccion">
          <div
            className={
              /^\/myzone\/student\/programs\/?$/.test(location.pathname)
                ? "div-icon-rol bg-gradient-green rounded-circle bg-white"
                : "div-icon bg-gradient-green rounded-circle bg-white"
            }
          >
            <IconContext.Provider
              value={{
                className: "global-class-name text-white",
                size: "20px",
              }}
            >
              <FaChalkboardTeacher />
            </IconContext.Provider>
          </div>

          <small>Academias</small>
        </div>
      </Link>
      {/* <Link to="/myzone/student/events">
        <div className="seccion">
          <div
            className={
              /^\/myzone\/student\/events\/?$/.test(location.pathname)
                ? "div-icon-rol bg-gradient-green rounded-circle bg-white"
                : "div-icon bg-gradient-green rounded-circle bg-white"
            }
          >
            <IconContext.Provider
              value={{
                className: "global-class-name text-white",
                size: "20px",
              }}
            >
              <FaChalkboardTeacher />
            </IconContext.Provider>
          </div>

          <small>Clases online</small>
        </div>
      </Link> */}
      {/* <Link to="/myzone/student/classes">
                <div className="seccion">
                    <div className={/^\/myzone\/student\/classes\/?$/.test(location.pathname) ?
                        "div-icon-rol bg-gradient-green rounded-circle bg-white"
                        :
                        "div-icon bg-gradient-green rounded-circle bg-white"}
                    >

                        <IconContext.Provider
                            value={{
                                className: "global-class-name text-white",
                                size: '20px'
                            }}>
                            <FaChalkboard />
                        </IconContext.Provider>
                    </div>

                    <small>
                        Mis clases
                    </small>
                </div>
            </Link> */}
      {/* <Link to="/myzone/student/messages">
                <div className="seccion">
                    <div className={/^\/myzone\/student\/messages\/?$/.test(location.pathname) ?
                        "div-icon-rol bg-gradient-green rounded-circle bg-white"
                        :
                        "div-icon bg-gradient-green rounded-circle bg-white"}

                    >


                        <IconContext.Provider
                            value={{
                                className: "global-class-name text-white",
                                size: '20px'
                            }}>
                            <MdMessage />
                        </IconContext.Provider>
                    </div>

                    <small>
                        Mensajes
                    </small>
                </div>
            </Link> */}
      <Link to="/myzone/instructor">
        <div className="seccion">
          <div className="div-icon bg-gradient-green rounded-circle bg-white">
            <IconContext.Provider
              value={{
                className: "global-class-name text-white",
                size: "20px",
              }}
            >
              <FaChalkboardTeacher />
            </IconContext.Provider>
          </div>
          <small className="">Instructor</small>
        </div>
      </Link>
    </div>
  );
}
