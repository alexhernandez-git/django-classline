import React, { useState, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "static/assets/styles/components/Users/Teachers/TeachersZone/Profile/TeachersClasses.scss";
import TeachersUserInfo from "src/components/Users/Profile/UserInfo";
import TeachersProfileInfo from "src/components/Users/Profile/ProfileInfo";
import TeachersProfileImage from "src/components/Users/Profile/ProfileImage";
import { AppContext } from "src/context/AppContext";
import ChangePassword from "src/components/Users/Profile/ChangePassword";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
const TeacherProfileEdit = () => {
  const appContext = useContext(AppContext);
  const [key, setKey] = useState(0);
  const handleLogout = () => {
    appContext.logout();
  };

  const MySwal = withReactContent(Swal);
  const handleRemovePaymentMethodWarning = (paymentMethod) => {
    MySwal.fire({
      title: "¿Quieres eliminar este método de pago?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        handleRemovePaymentMethod(paymentMethod);

        return Swal.fire({
          icon: "success",
          title: "Se ha eliminado la tarjeta.",
        });
      }
    });
  };

  const handleRemovePaymentMethod = (paymentMethod) => {
    async function fetchData(paymentMethod) {
      await axios
        .patch(
          `/api/users/remove_card/`,
          { payment_method: paymentMethod },
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
    fetchData(paymentMethod);
  };

  const getCardBrand = (paymentMethod) => {
    const brand = paymentMethod.card.brand;
    return brand.charAt(0).toUpperCase() + brand.slice(1);
  };
  return (
    <>
      <div className="container teachers-profile-edit pt-5 text-grey">
        <div className="d-sm-flex justify-content-start">
          <div>
            <span className="h3 d-block mb-0 text-dark">Ajustes y perfil</span>
            <span>Perfil de usuario</span>
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
                      INFORMACIÓN PRINCIPAL
                    </span>
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey={1} className="text-grey">
                    <span className="font-weight-bold">MÉTODOS DE PAGO</span>
                  </Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
          </Row>

          <Row>
            <Col className="pl-3 pr-3 pb-5">
              <Tab.Content>
                <Tab.Pane eventKey={0} className="text-grey">
                  <TeachersProfileImage />
                  <TeachersUserInfo />
                  <ChangePassword />
                  {/* <TeachersProfileInfo /> */}
                  <div className="d-flex justify-content-end">
                    <Link
                      className="btn-green text-white px-3 py-2"
                      onClick={handleLogout}
                    >
                      Cerrar sesión
                    </Link>
                  </div>
                </Tab.Pane>
                <Tab.Pane eventKey={1} className="text-grey">
                  {appContext.userProfile.user.profile.payment_methods !=
                  null ? (
                    <>
                      {appContext.userProfile.user.profile.payment_methods.map(
                        (payment_method) => (
                          <>
                            <div className="courses-card-instructor text-grey bg-white py-2 px-3 shadown payment_method_card">
                              <div>
                                <span className="h4 d-block">{getCardBrand(payment_method)}</span>
                                <span>
                                  xxxx-xxxx-xxxx-{payment_method.card.last4}
                                </span>
                              </div>
                              <div className="button_container">
                                <button
                                  className="btn-green d-block text-white px-3 py-2 w-100 mt-1"
                                  type="button"
                                  onClick={() =>
                                    handleRemovePaymentMethodWarning(
                                      payment_method
                                    )
                                  }
                                >
                                  Eliminar
                                </button>
                              </div>
                            </div>
                          </>
                        )
                      )}
                    </>
                  ) : (
                    "No hay metodos de pago"
                  )}
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </div>
    </>
  );
};

export default TeacherProfileEdit;
