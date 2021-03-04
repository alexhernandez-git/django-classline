import React, { useContext, useState, useEffect } from "react";
import { AppContext } from "src/context/AppContext";
import { Link } from "react-router-dom";
import { Nav, Tab } from "react-bootstrap";
import "static/assets/styles/containers/Instructor.scss";
import CoursesCard from "src/components/Instructor/CoursesCardInstructor";
import axios from "axios";
const Instructor = (props) => {
  const [key, setKey] = useState(0);
  const { match } = props;
  let { id } = match.params;
  const [userState, setUserState] = useState(false);
  useEffect(() => {
    async function fetchData() {
      await axios
        .get(`/api/users/${id}/`)
        .then((res) => {
          setUserState(res.data);
        })
        .catch((err) => {});
    }
    // User Loading
    fetchData();
  }, []);

  return !userState ? (
    "Cargando..."
  ) : (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          <div className="mt-5 text-grey container instructor">
            <div className="row">
              <div className="offset-lg-2 col-sm-6">
                <img
                  src={userState.profile.picture}
                  alt=""
                  style={{
                    width: "100px",
                    height: "100px",
                  }}
                  className="mr-2 rounded-circle d-block d-sm-none mb-3"
                />

                <div className="h5 m-0">Instructor</div>
                {userState.profile.is_enterprise ? (
                  <div className="h1 m-0 text-dark">
                    {userState.profile.company_name}
                  </div>
                ) : (
                  <div className="h1 m-0 text-dark">
                    {userState.first_name} {userState.last_name}
                  </div>
                )}
                {/* <div className="h6 m-0 text-dark">Cursos de desarrollo web</div> */}
                {/* <div className="d-sm-flex justify-content-start mt-4">
                                    <div>
                                        <span className="d-block h6 font-weight-bolder">Total de estudiantes</span>
                                        <span className="h4 text-dark  font-weight-bolder">36</span>
                                    </div>
                                    <div className="d-none d-sm-block m-2"></div>
                                    <div>
                                        <span className="d-block h6 font-weight-bolder">Reseñas</span>
                                        <span className="h4 text-dark  font-weight-bolder">363</span>
                                    </div>
                                </div> */}
                {/* <div>
                                    <div className="h4 mb-0 mt-4 text-dark">Sobre mí</div>
                                    <span>
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ea doloremque nobis a porro quia officiis, voluptatem accusantium vel placeat! Reprehenderit aut, unde ullam atque voluptate saepe! Ea mollitia nisi ipsam?
                                    </span>
                                </div> */}
                <div className="my-4">
                  <Tab.Container
                    id="left-tabs-example"
                    activeKey={key}
                    onSelect={(k) => setKey(k)}
                    defaultActiveKey="first"
                    className="p-3"
                  >
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
                      {/* <Nav.Item>
                                                <Nav.Link eventKey={0} className="text-grey">
                                                    <span className="font-weight-bold">Cursos</span>

                                                </Nav.Link>
                                            </Nav.Item> */}
                      <Nav.Item>
                        <Nav.Link eventKey={0} className="text-grey">
                          <span className="font-weight-bold">Programas</span>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>

                    <Tab.Content>
                      <Tab.Pane eventKey={0} className="text-grey">
                        <div className="row">
                          {userState.teacher.programs.length > 0 ? (
                            <>
                              {userState.teacher.programs.map((program) => (
                                <div className="col-lg-6 mt-3">
                                  <Link to={`/program/${program.code}`}>
                                    <CoursesCard
                                      student_zone={false}
                                      program={program}
                                      user={{
                                        first_name: userState.first_name,
                                        last_name: userState.last_name,
                                        profile: userState.profile,
                                      }}
                                    />
                                  </Link>
                                </div>
                              ))}
                            </>
                          ) : (
                            "El instructor no tiene programas"
                          )}
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
              <div className="offset-sm-2 col-sm-4 offset-lg-0 col-lg-2 d-none d-sm-block">
                <img
                  src={
                    userState.profile.picture
                      ? userState.profile.picture
                      : "../../static/assets/img/avatar.png"
                  }
                  alt=""
                  className="mr-2 rounded-circle w-100 d-block"
                />
                {/* <Link to="/teacher/1" className="btn-green py-2 px-3 text-white btn-block mt-3 text-center">Clases</Link> */}
              </div>
            </div>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};

export default Instructor;
