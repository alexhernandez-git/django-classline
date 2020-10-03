import React, { useState, useEffect, useRef, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "static/assets/styles/components/Users/Teachers/TeachersZone/Profile/TeachersClasses.scss";
import "static/assets/styles/components/Users/Teachers/TeachersZone/Classes/TeachersMyClasses.scss";
import EventsCard from "src/components/ui/EventsCard";
import { Link } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { Dropdown } from "react-bootstrap";
import { BsGearFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const StudentsEvents = () => {
  const [key, setKey] = useState(0);
  const appContext = useContext(AppContext);
  const MySwal = withReactContent(Swal);
  const handleUnsubscribeWarning = () => {
    MySwal.fire({
      title:
        "Su suscripción se cancelará y ya no tendrás acceso a esta academia",
      text: "¿Estás seguro de que deseas cancelar la suscripción?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Cancelar suscripción",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
      }
    });
  };
  // const handleResubscribeWarning = (program) => {
  //   MySwal.fire({
  //     title:
  //       "Aún tiene acceso al curso antes de que se cancele su suscripción. Puede retener su suscripción con solo hacer clic en un botón. ¿Quieres retener tu suscripción?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Retener suscripción",
  //     cancelButtonText: "No",
  //   }).then((result) => {
  //     if (result.value) {
  //       handleResubscribe(program);

  //       return Swal.fire({
  //         icon: "success",
  //         title:
  //           "Suscripción restaurada con éxito. No se necesita ninguna otra acción",
  //       });
  //     }
  //   });
  // };
  // const handleResubscribe = (program) => {
  //   async function fetchData(program) {
  //     await axios
  //       .patch(
  //         `/api/programs/${program.code}/restore_subscription/`,
  //         {},
  //         appContext.tokenConfig(appContext.userProfile)
  //       )
  //       .then((res) => {
  //         console.log(res.data);
  //         appContext.loadUser();
  //         appContext.handleResubscribe(program);
  //       })
  //       .catch((err) => {
  //         console.log(err.response);
  //       });
  //   }
  //   // User Loading
  //   fetchData(program);
  // };
  // const handleUnsubscribe = (program) => {
  //   async function fetchData(program) {
  //     await axios
  //       .delete(
  //         `/api/programs/${program.code}/remove_student/`,
  //         appContext.tokenConfig(appContext.userProfile)
  //       )
  //       .then((res) => {
  //         Swal.fire({
  //           icon: "success",
  //           title: "Desactivado",
  //         });
  //         appContext.loadUser();
  //       })
  //       .catch((err) => {
  //         Swal.fire({
  //           icon: "error",
  //           title: err.response.data.message,
  //         });
  //       });
  //   }
  //   // User Loading
  //   fetchData(program);
  // };

  // const getSubscribeOptions = (program) => {
  //   const subs = appContext.userProfile.user.subscriptions;
  //   if (!subs) return { to_be_cancelled: false };
  //   let current_sub = null;
  //   subs.forEach((sub) => {
  //     if (sub.program == program.code) {
  //       current_sub = sub;
  //     }
  //   });
  //   return current_sub;
  // };
  return (
    <AppContext.Consumer>
      {(appContext) => (
        <div className="container teachers-profile-edit pt-5 text-grey">
          <div className="d-sm-flex justify-content-start">
            <div>
              <span className="h3 d-block mb-0 text-dark">
                Tus clases online
              </span>
              {/* <span>Gestiona las clases de tus alumnos</span> */}
            </div>
          </div>
          <Tab.Container
            id="left-tabs-example"
            activeKey={key}
            onSelect={(k) => setKey(k)}
            defaultActiveKey="first"
            className="p-3"
          >
            <Row className="mb-3 mt-4">
              <Col sm={12}>
                <Nav
                  style={{
                    whiteSpace: "nowrap",
                    position: "relative",
                    overflowX: "auto",
                    overflowY: "hidden",
                    width: "100%",
                    flexWrap: "nowrap",
                  }}
                >
                  <Nav.Item>
                    <Nav.Link eventKey={0} className="text-grey">
                      <span className="font-weight-bold">
                        TUS CLASES ONLINE
                      </span>{" "}
                      <span className="badge badge-pill badge-secondary align-text-bottom">
                        {2}
                      </span>
                    </Nav.Link>
                  </Nav.Item>

                  {/* <Nav.Item>
                                            <Nav.Link eventKey={1} className="text-grey">
                                                <span className="font-weight-bold">LISTA DE DESEOS</span>{' '}
                                                <span className="badge badge-pill badge-secondary">
                                                    2
                                                </span>
                                            </Nav.Link>
                                        </Nav.Item> */}
                </Nav>
              </Col>
            </Row>

            <Row>
              <Col className="pl-3 pr-3">
                <Tab.Content>
                  <Tab.Pane eventKey={0} className="text-grey">
                    <div className="row">
                      <div className="col-12 mt-3 position-relative">
                        <EventsCard />
                      </div>
                      <div className="col-12 mt-3 position-relative">
                        <EventsCard />
                      </div>
                      {appContext.userProfile.user.programs.length > 0 ? (
                        <>
                          {appContext.userProfile.user.programs.map(
                            (program) => (
                              <div className="col-12 mt-3 position-relative">
                                <EventsCard />
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <div className="col-12">
                          {/* <span>No tienes clases online</span> */}
                        </div>
                      )}
                    </div>
                  </Tab.Pane>
                  {/* <Tab.Pane eventKey={1} className="text-grey">
                                            <div className="row">
                                                <div className="col-sm-6 col-lg-4 mt-3">
                                                    <Link to="/program/WOTQiudEQk">
                                                        <StudentProgramCard />
                                                    </Link>
                                                </div>
                                                <div className="col-sm-6 col-lg-4 mt-3">
                                                    <Link to="/program/WOTQiudEQk">
                                                        <StudentProgramCard />
                                                    </Link>
                                                </div>

                                            </div>
                                        </Tab.Pane> */}
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default StudentsEvents;
