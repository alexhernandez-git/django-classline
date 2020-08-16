import React, { useState, useEffect, useRef, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "static/assets/styles/components/Users/Teachers/TeachersZone/Profile/TeachersClasses.scss";
import "static/assets/styles/components/Users/Teachers/TeachersZone/Classes/TeachersMyClasses.scss";
import StudentProgramCard from "src/components/Instructor/CoursesCardInstructor";
import { Link } from "react-router-dom";
import { AppContext } from "src/context/AppContext";
import { Dropdown } from "react-bootstrap";
import { BsGearFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const StudentsPrograms = () => {
  const [key, setKey] = useState(0);
  const appContext = useContext(AppContext);
  const MySwal = withReactContent(Swal);
  const handleUnsubscribeWarning = (program) => {
    MySwal.fire({
      title:
        "Su suscripción se cancelará y ya no tendrás acceso a esta academia también se te será devuelto el dinero del último pago en los próximos dias. <br>¿Estás seguro de que deseas cancelar la suscripción?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Anular suscripción",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        handleUnsubscribe(program);
        return Swal.fire({
          icon: "success",
          title: "Desactivado",
        });
      }
    });
  };
  const handleResubscribeWarning = (program) => {
    MySwal.fire({
      title:
        "Aún tiene acceso al curso antes de que se cancele su suscripción. Puede retener su suscripción con solo hacer clic en un botón. ¿Quieres retener tu suscripción?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Retener suscripción",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.value) {
        handleResubscribe(program);

        return Swal.fire({
          icon: "success",
          title:
            "Suscripción restaurada con éxito. No se necesita ninguna otra acción",
        });
      }
    });
  };
  const handleResubscribe = (program) => {
    async function fetchData(program) {
      await axios
        .patch(
          `/api/programs/${program.code}/restore_subscription/`,
          {},
          appContext.tokenConfig(appContext.userProfile)
        )
        .then((res) => {
          console.log(res.data);
          appContext.loadUser();
          appContext.handleResubscribe(program);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    // User Loading
    fetchData(program);
  };
  const handleUnsubscribe = (program) => {
    async function fetchData(program) {
      await axios
        .delete(
          `/api/programs/${program.code}/remove_student/`,
          appContext.tokenConfig(appContext.userProfile)
        )
        .then((res) => {
          console.log(res.data);
          appContext.loadUser();
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
    // User Loading
    fetchData(program);
  };

  const getSubscribeOptions = (program) => {
    const subs = appContext.userProfile.user.subscriptions;
    if (!subs) return { to_be_cancelled: false };
    let current_sub = null;
    subs.forEach((sub) => {
      if (sub.program == program.code) {
        current_sub = sub;
      }
    });
    return current_sub;
  };
  return (
    <AppContext.Consumer>
      {(appContext) => (
        <div className="container teachers-profile-edit pt-5 text-grey">
          <div className="d-sm-flex justify-content-start">
            <div>
              <span className="h3 d-block mb-0 text-dark">Tus academias</span>
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
                      <span className="font-weight-bold">TUS ACADEMIAS</span>{" "}
                      <span className="badge badge-pill badge-secondary align-text-bottom">
                        {appContext.userProfile.user.programs.length}
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
                      {appContext.userProfile.user.programs.length > 0 ? (
                        <>
                          {appContext.userProfile.user.programs.map(
                            (program) => (
                              <div className="col-sm-6 col-lg-4 mt-3 position-relative">
                                <Link
                                  to={`/academy/${program.code}`}
                                  target="_blank"
                                  className="text-grey"
                                  key={program.id}
                                >
                                  <StudentProgramCard
                                    student_zone={true}
                                    program={program}
                                    user={{
                                      first_name: program.instructor.first_name,
                                      last_name: program.instructor.last_name,
                                      profile: program.instructor.profile,
                                    }}
                                  />
                                </Link>
                                <div
                                  style={{
                                    position: "absolute",
                                    top: "0",
                                    right: "15px",
                                  }}
                                >
                                  <Dropdown>
                                    <Dropdown.Toggle
                                      variant="info"
                                      id="dropdown-basic"
                                    ></Dropdown.Toggle>
                                  {console.log(getSubscribeOptions(program))}
                                    <Dropdown.Menu>
                                      {getSubscribeOptions(program) != null &&
                                        !getSubscribeOptions(program)
                                          .to_be_cancelled && (
                                          <Dropdown.Item
                                            onClick={() =>
                                              handleUnsubscribeWarning(program)
                                            }
                                          >
                                            Darse de baja
                                          </Dropdown.Item>
                                        )}
                                      {getSubscribeOptions(program) != null &&
                                        getSubscribeOptions(program)
                                          .to_be_cancelled && (
                                          <>
                                            <Dropdown.Item disabled>
                                              <small>
                                                La suscripción finaliza el{" "}
                                                {new Date(
                                                  getSubscribeOptions(program)
                                                    .current_period_end * 1000
                                                ).toLocaleDateString()}
                                              </small>
                                            </Dropdown.Item>
                                            <Dropdown.Item
                                              onClick={() =>
                                                handleResubscribeWarning(
                                                  program
                                                )
                                              }
                                            >
                                              Retener suscripción
                                            </Dropdown.Item>
                                          </>
                                        )}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </div>
                              </div>
                            )
                          )}
                        </>
                      ) : (
                        <div className="col-12">
                          <span>No tienes academias</span>
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

export default StudentsPrograms;