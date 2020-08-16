import React, { useState, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "static/assets/styles/components/Users/Teachers/TeachersZone/Profile/TeachersClasses.scss";
import TeachersProfileInfo from "src/components/Users/Profile/ProfileInfo";
import ProfileEnterprise from "src/components/Users/Profile/ProfileEnterprise";
import TeachersUserInfo from "src/components/Users/Profile/UserInfo";
import TeachersProfileImage from "src/components/Users/Profile/ProfileImage";
import StripeConnect from "src/components/Payments/Stripe/StripeConnect.jsx";
import { AppContext } from "src/context/AppContext";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link } from "react-router-dom";
const TeacherProfileEdit = (props) => {
  const MySwal = withReactContent(Swal);
  const [key, setKey] = useState(0);
  const appContext = useContext(AppContext);
  const handleActivateTeacher = async () => {
    const result = await appContext.handleActivateTeacher();

    if (result.result) {
      MySwal.fire({
        icon: "success",
        title: result.message,
      });
    } else {
      MySwal.fire({
        icon: "error",
        title: result.message,
      });
    }
  };
  const handleLogout = () => {
    appContext.logout();
  };

  if (new URLSearchParams(props.location.search).get("code") != null) {
    const authCode = new URLSearchParams(props.location.search).get("code");
    appContext.connectStripe(authCode);
  }

  return (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          <div className="container teachers-profile-edit pt-5 text-grey">
            <div className="d-sm-flex justify-content-between">
              <div>
                <span className="h3 d-block mb-0 text-dark">
                  Ajustes y perfil del instructor
                </span>

                <span>Completa tu perfil de instructor</span>
              </div>
              {!appContext.userProfile.user.profile.is_teacher ? (
                <>
                  <div className="d-block my-2 d-sm-none"></div>
                  <div>
                    <button
                      className="btn btn-green rounded-pill text-white py-2 px-4"
                      onClick={handleActivateTeacher}
                    >
                      Activar cuenta de instructor
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
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
                          INFORMACIÓN PRINCIPAL
                        </span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>
                </Col>
              </Row>

              <Row>
                <Col className="pl-3 pr-3">
                  <Tab.Content>
                    <Tab.Pane eventKey={0} className="text-grey">
                      <StripeConnect />
                      <TeachersProfileImage />
                      <TeachersUserInfo />
                      <ProfileEnterprise />
                      <TeachersProfileInfo />

                      <div className="d-flex justify-content-end">
                        <span
                          className="btn-green text-white px-3 py-2 cursor-pointer"
                          onClick={handleLogout}
                        >
                          Cerrar sesión
                        </span>
                      </div>
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </div>
        </>
      )}
    </AppContext.Consumer>
  );
};

export default TeacherProfileEdit;
