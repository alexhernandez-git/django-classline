import React, { useState, useContext, useEffect, useRef } from "react";
import { Navbar, Nav, Form, FormControl, Modal, Button } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { FaChalkboardTeacher } from "react-icons/fa";
import { IoMdPricetag } from "react-icons/io";

import { IconContext } from "react-icons";
import { Link, Redirect, useLocation } from "react-router-dom";
import "static/assets/styles/components/Layout/Header.scss";
import { AppContext } from "src/context/AppContext";
import Logo from "../../../static/assets/img/logo.PNG";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
export default function Header() {
  const MySwal = withReactContent(Swal);
  const appContext = useContext(AppContext);
  const [showLogin, setShowLogin] = useState(false);
  const [search, setSearch] = useState("");
  useEffect(() => {
    if (appContext.search != undefined) {
      setSearch(appContext.search);
    }
  }, [appContext.search]);
  let location = useLocation();
  // useEffect(() => {
  //   let result = /\/programs/.test(location.pathname);
  //   if (!result) {
  //     appContext.setSearch("");
  //   }
  // });
  const navbar = useRef();
  const navbarButton = useRef();
  const [navExpanded, setNavExpanded] = useState(false);
  useEffect(() => {
    setNavExpanded(false);
  }, [location.pathname]);
  const [send, setSend] = useState(false);
  const handleCloseLogin = () => setShowLogin(false);
  const handleShowLogin = () => setShowLogin(true);
  const [showRegister, setShowRegister] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    password_confirmation: "",
    first_name: "",
    last_name: "",
  });
  const handleCloseRegister = () => setShowRegister(false);
  const handleShowRegister = () => setShowRegister(true);
  const handleChangeToRegister = () => {
    setShowLogin(false);
    setShowRegister(true);
  };
  const handleChangeToLogin = () => {
    setShowRegister(false);
    setShowLogin(true);
  };
  const [loginErrors, setLoginErrors] = useState({
    email: null,
    password: null,
    non_field_errors: null,
  });
  const handleSubmitLogin = async (e) => {
    e.preventDefault();
    const result = await appContext.login(loginForm);
    if (result.status == 200 || result.status == 201) {
      setUserData({
        email: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
      });

      handleCloseLogin();
    } else {
      setLoginErrors(result.data);
    }
  };
  const [signupErrors, setSignupErrors] = useState({
    email: null,
    first_name: null,
    last_name: null,
    password: null,
    password_confirmaiton: null,
  });

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    const result = await appContext.register(userData);

    if (result.status == 200 || result.status == 201) {
      // appContext.login({
      //   email: userData.email,
      //   password: userData.password,
      // });
      setUserData({
        email: "",
        password: "",
        password_confirmation: "",
        first_name: "",
        last_name: "",
      });
      Swal.fire({
        title: "Te hemos enviado un correo para que verifiques tu cuenta",
        text: "Registrado satisfactoriamente",
        icon: "success",
        confirmButtonText: "Ok",
      });

      handleCloseRegister();
    } else {
      setSignupErrors(result.data);
    }
  };
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    setSend(true);
    setTimeout(() => {
      setSend(false);
    }, "500");
    appContext.setSearch(search);
  };

  return (
    <AppContext.Consumer>
      {(appContext) => (
        <>
          <Navbar
            bg="white"
            expand="md"
            className="header border-bottom p-0 shadow"
            sticky="top"
            onToggle={setNavExpanded}
            expanded={navExpanded}
          >
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <div className="ml-3">
              <Link to="/">
                <Navbar.Brand>
                  <img
                    alt=""
                    src={"../../../static/assets/img/logo7.PNG"}
                    height="30"
                    className="d-inline-block align-top"
                  />
                  {/* <span className="d-none d-md-inline">ClassLine</span> */}
                </Navbar.Brand>
              </Link>
            </div>
            {/* <Nav className="ml-auto mr-3 d-none d-md-block">
                            <Nav.Link className="align-self-center text-center text-grey">Categories</Nav.Link>
                        </Nav> */}
            <Form
              inline
              id="form-search"
              className="position-relative form-search-parent border-left"
              onSubmit={handleSubmitSearch}
            >
              <FormControl
                border="none"
                type="text"
                placeholder="Buscar"
                className="border-0 w-100 align-middle form-search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div
                className="search-icon"
                onClick={(e) => handleSubmitSearch(e)}
              >
                <IconContext.Provider
                  value={{
                    className: "cursor-pointer",
                  }}
                >
                  <FaSearch />
                </IconContext.Provider>
              </div>
            </Form>
            {send > 0 && (
              <>
                {/* {/\/teachers/.test(location.pathname) ?
                                    < Redirect to={{
                                        pathname: '/teachers/' + search,
                                    }} />
                                    : */}

                <Redirect
                  to={{
                    pathname: "/programs/" + search,
                  }}
                />
                {/* 
                                } */}
              </>
            )}
            <Navbar.Collapse id="basic-navbar-nav" ref={navbar}>
              <Nav className="ml-auto mr-3">
                <Link
                  to="/myzone/instructor/pricing"
                  className="d-flex align-self-center text-grey text-center header-btn font-weight-light p-2"
                >
                  <IconContext.Provider
                    value={{
                      className: "global-class-name mr-2",
                      size: "20px",
                    }}
                  >
                    <IoMdPricetag />
                  </IconContext.Provider>
                  Precios
                </Link>

                {appContext.userProfile.is_authenticated ? (
                  <Link
                    to="/myzone/instructor"
                    className="d-flex align-self-center text-grey text-center header-btn font-weight-light p-2"
                  >
                    <IconContext.Provider
                      value={{
                        className: "global-class-name mr-2",
                        size: "20px",
                      }}
                    >
                      <FaChalkboardTeacher />
                    </IconContext.Provider>
                    Instructor
                  </Link>
                ) : (
                  <span
                    className="d-flex cursor-pointer align-self-center text-grey text-center header-btn font-weight-light p-2"
                    onClick={handleShowRegister}
                  >
                    <IconContext.Provider
                      value={{
                        className: "global-class-name mr-2",
                        size: "20px",
                      }}
                    >
                      <FaChalkboardTeacher />
                    </IconContext.Provider>
                    Instructor
                  </span>
                )}
                {appContext.userProfile.is_authenticated ? (
                  <>
                    <div className="ml-3 d-none d-md-block"></div>
                    <Link to="/myzone/student">
                      <div className="d-flex justify-content-center align-items-center">
                        <img
                          src={
                            appContext.userProfile.user.profile.picture
                              ? appContext.userProfile.user.profile.picture
                              : "../../../static/assets/img/avatar.png"
                          }
                          alt=""
                          className="mr-2 rounded-circle"
                          style={{
                            height: "44px",
                            width: "44px",
                          }}
                        />
                        <span className="text-grey">Mi zona</span>
                      </div>
                      <div className="d-block d-md-none m-2"></div>
                    </Link>
                  </>
                ) : (
                  <>
                    <Nav.Link
                      className="btn ml-3 btn-sm btn-outline-green header-btn"
                      onClick={handleShowLogin}
                    >
                      Iniciar sesión
                    </Nav.Link>
                    <Nav.Link
                      className="btn ml-3 btn-sm btn-green text-white header-btn"
                      onClick={handleShowRegister}
                    >
                      Registrate
                    </Nav.Link>
                  </>
                )}
              </Nav>
            </Navbar.Collapse>
          </Navbar>
          <Modal
            show={showLogin}
            onHide={handleCloseLogin}
            animation={true}
            size="sm"
            className="text-grey"
          >
            <Modal.Header closeButton>
              <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-white rounded-bottom">
              {loginErrors.non_field_errors &&
                loginErrors.non_field_errors.map((error) => (
                  <small className="d-block text-red text-center mb-3">
                    {error}
                  </small>
                ))}
              {loginErrors.detail && (
                <small className="d-block text-red text-center mb-3">
                  El correo no existe
                </small>
              )}
              <Form onSubmit={handleSubmitLogin}>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="text"
                    placeholder="Email"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                  />
                  {loginErrors.email &&
                    loginErrors.email.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                  />
                  {loginErrors.password &&
                    loginErrors.password.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>
                {/* {loginErrors.map((error) => (
                  <small className="d-block text-red text-center mb-2">
                    {error}
                  </small>
                ))} */}
                <button
                  type="submit"
                  className="btn btn-sm btn-green text-white header-btn w-100 mb-3"
                >
                  Iniciar sesión
                </button>

                <div className="d-flex justify-content-end">
                  <span
                    onClick={handleChangeToRegister}
                    className="cursor-pointer"
                  >
                    O registrate
                  </span>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
          <Modal
            show={showRegister}
            onHide={handleCloseRegister}
            animation={true}
            size="sm"
            className="text-grey"
          >
            <Modal.Header closeButton>
              <Modal.Title>Registro</Modal.Title>
            </Modal.Header>
            <Modal.Body className="bg-white rounded-bottom">
              <Form onSubmit={handleSubmitRegister}>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Nombre"
                    value={userData.first_name}
                    onChange={(e) =>
                      setUserData({ ...userData, first_name: e.target.value })
                    }
                  />
                  {signupErrors.first_name &&
                    signupErrors.first_name.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Apellidos"
                    value={userData.last_name}
                    onChange={(e) =>
                      setUserData({ ...userData, last_name: e.target.value })
                    }
                  />
                  {signupErrors.last_name &&
                    signupErrors.last_name.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData({ ...userData, email: e.target.value })
                    }
                  />
                  {signupErrors.email &&
                    signupErrors.email.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>

                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Contraseña"
                    value={userData.password}
                    onChange={(e) =>
                      setUserData({ ...userData, password: e.target.value })
                    }
                  />
                  {signupErrors.password &&
                    signupErrors.password.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>
                <Form.Group>
                  <Form.Control
                    type="password"
                    placeholder="Confirmar contraseña"
                    value={userData.password_confirmation}
                    onChange={(e) =>
                      setUserData({
                        ...userData,
                        password_confirmation: e.target.value,
                      })
                    }
                  />
                  {signupErrors.password_confirmation &&
                    signupErrors.password_confirmation.map((error) => (
                      <small className="d-block text-red">{error}</small>
                    ))}
                </Form.Group>
                <button
                  type="submit"
                  className="btn btn-sm btn-green text-white header-btn w-100 mb-3"
                  onClick={handleShowRegister}
                >
                  Registrate
                </button>
                <div className="d-flex justify-content-end">
                  <span
                    className="cursor-pointer"
                    onClick={handleChangeToLogin}
                  >
                    O inicia sesión
                  </span>
                </div>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      )}
    </AppContext.Consumer>
  );
}
