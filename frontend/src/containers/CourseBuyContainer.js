import styled from "@emotion/styled";
import React, { useState, useEffect, useRef } from "react";
import { Global, css } from "@emotion/core";
import { IconContext } from "react-icons/lib";
import { FaCircle, FaGlobeAmericas, FaRegPlayCircle } from "react-icons/fa";
import { MdCheck, MdClose, MdOndemandVideo } from "react-icons/md";
import { IoMdInfinite } from "react-icons/io";
import { HiOutlineFolderDownload } from "react-icons/hi";
import BlockItemsListContent from "src/components/ui/BlockItemsListContent";
import {
  CardElement,
  useStripe,
  useElements,
  CardExpiryElement,
  CardCvcElement,
  CardNumberElement,
} from "@stripe/react-stripe-js";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPublishedCourse } from "../redux/actions/courses/buyCourses";
import moment from "moment";
import { login, registerCheckoutClass } from "src/redux/actions/auth";
import { Field, Form, Formik } from "formik";
const CourseBuyContainer = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const buyCoursesReducer = useSelector((state) => state.buyCoursesReducer);
  const { course } = buyCoursesReducer;
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program && id) {
      const dispatchFetchCourse = (id) => dispatch(fetchPublishedCourse(id));
      dispatchFetchCourse(id);
    }
  }, [programReducer.isLoading]);
  function msToHMSRead(seconds) {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh} horas y ${mm
        .toString()
        .padStart(2, "0")} minutos de duración total`;
    }
    return `${mm} minutos de duración total`;
  }
  function msToHMSCard(seconds) {
    if (isNaN(seconds)) {
      return "00:00";
    }
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, "0");
    if (hh) {
      return `${hh} horas de video bajo demanda`;
    }
    return `${mm} minutos de video bajo demanda`;
  }

  const [showBlockInformation, setShowBlockInformation] = useState(false);
  const toggleShowBlockInformation = () => {
    setShowBlockInformation(!showBlockInformation);
  };

  const programVideoRef = useRef();
  const video = useRef();
  const [openVideo, setOpenVideo] = useState(false);
  const handleOpenVideo = () => {
    video.current.play();
    setOpenVideo(true);
  };
  const handleCloseVideo = () => {
    video.current.pause();
    setOpenVideo(false);
  };

  const handleWindowClick = (e) => {
    if (!programVideoRef.current.contains(e.target)) {
      handleCloseVideo(false);
    }
  };
  useEffect(() => {
    const handleClick = (e) => {
      handleWindowClick(e);
    };
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  });
  const [buyNow, setBuyNow] = useState(false);
  const handleOpenBuyNow = () => {
    setBuyNow(true);
  };
  const handleCloseBuyNow = () => {
    setBuyNow(false);
  };

  const [isLogin, setIsLogin] = useState(false);
  const handleOpenIsLogin = () => {
    setIsLogin(true);
  };
  const handleCloseIsLogin = () => {
    setIsLogin(false);
  };

  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    // Block native form submission.
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const cardElement = elements.getElement(CardElement);

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // dispatch(buyPack(buyPacksReducer.selected_pack, paymentMethod.id));
    }
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isStudent, setIsStudent] = useState(false);
  const [isIdentifying, setIsIdentifying] = useState(false);
  const hanldeOpenIsIdentifying = () => {
    setIsIdentifying(true);
  };
  const hanldeCloseIsIdentifying = () => {
    setIsIdentifying(false);
  };

  useEffect(() => {
    if (isAuthenticated && isStudent) {
      setBuyNow(false);
    }
  }, [isAuthenticated]);
  return buyCoursesReducer.isLoadingCourse ? (
    "Cargando..."
  ) : (
    <>
      <Global
        styles={css`
          :root {
            --darkgray: #323840;
            --body-bg: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            --msger-bg: #fff;
            --border: 1px solid #ddd;
            --left-msg-bg: #ececec;
            --right-msg-bg: #579ffb;
            --green: #86bb71;
            --blue: #94c2ed;
            --orange: #e38968;
            --gray: #92959e;
            --success: #28a745 !important;
            --danger: #dc3545 !important;
          }
          * {
            padding: 0;
            margin: 0;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          h1 {
            font-size: 4rem;
          }
          h2 {
            font-size: 3.2rem;
          }
          h3 {
            font-size: 2.8rem;
          }
          h4 {
            font-size: 2.4rem;
          }
          h5 {
            font-size: 2rem;
          }
          h6 {
            font-size: 1.6rem;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            font-family: "Open Sans", sans-serif;
            color: #3c3b37;
          }
          a {
            text-decoration: none;
            color: #000;
          }

          input:focus,
          button:focus,
          a:focus,
          textarea:focus {
            outline: none;
          }
          /* Utils */
          .cursor-pointer {
            cursor: pointer;
          }
          .modal-header .close {
            font-size: 2rem;
          }
          .modal-content {
            border: none;
          }
          .swal2-container,
          .swal2-styled,
          .swal2-icon {
            font-size: 1.6rem !important;
          }
          .swal2-title {
            font-size: 2rem !important;
          }
          .swal2-styled.swal2-confirm {
            background-color: rgb(0, 0, 0) !important;
            border-left-color: rgb(0, 0, 0) !important;
            border-right-color: rgb(0, 0, 0) !important;
          }
        `}
      />

      <CourseContainer color={course.color}>
        <div className="header-course">
          <div className="header-course-container">
            <div className="header-course-info">
              {!buyNow && (
                <>
                  <h2 className="course-title">{course.title}</h2>
                  <h4 className="course-subtitle">{course.subtitle}</h4>
                  <div>
                    <span>
                      Creado por {course.instructor.first_name}{" "}
                      {course.instructor.last_name}
                    </span>
                  </div>
                  <div className="course-more-info">
                    <small>
                      Fecha de la ultima actualización:{" "}
                      {moment(course.modified).format("D-M-YYYY")}
                    </small>
                    {/* <small>
                      <IconContext.Provider
                        value={{
                          color: "white",
                          className: "course-more-info-icon",
                        }}
                      >
                        <FaGlobeAmericas />
                      </IconContext.Provider>
                      Español
                    </small> */}
                  </div>
                </>
              )}
            </div>
            <div className="header-course-cta">
              <div className="cta-content">
                {course.video_presentation ? (
                  <div className="cta-image" onClick={handleOpenVideo}>
                    <img
                      src={
                        course.picture
                          ? course.picture
                          : "/static/assets/img/no-foto.png"
                      }
                      alt=""
                    />
                    <IconContext.Provider
                      value={{
                        className: "position-absolute h1",
                        color: "#fff",
                        style: {
                          left: "0",
                          right: "0",
                          top: "0",
                          bottom: "0",
                          margin: "auto",
                          fontSize: "5rem",
                          zIndex: "100",
                        },
                      }}
                    >
                      <div>
                        <FaRegPlayCircle />
                      </div>
                    </IconContext.Provider>
                    <IconContext.Provider
                      value={{
                        className: "position-absolute h1 text-dark",
                        // color: "#fff",

                        style: {
                          left: "0",
                          right: "0",
                          top: "0",
                          bottom: "0",
                          margin: "auto",
                          fontSize: "4.8rem",
                          opacity: "0.8",
                        },
                      }}
                    >
                      <div>
                        <FaCircle />
                      </div>
                    </IconContext.Provider>
                  </div>
                ) : (
                  <div className="cta-image-no-pointer">
                    <img
                      src={
                        course.picture
                          ? course.picture
                          : "/static/assets/img/no-foto.png"
                      }
                      alt=""
                    />
                  </div>
                )}
                <div className="cta-info">
                  <div className="course-price">
                    <span>{course.course_price.value} €</span>
                    {/* <small></small> */}
                  </div>
                  <div className="course-buttons">
                    {authReducer.isAuthenticated && (
                      <div className="mb-2">
                        <small className="text-grey">
                          Hola {authReducer.user.first_name}
                        </small>
                      </div>
                    )}
                    {buyNow ? (
                      <>
                        {(!authReducer.isAuthenticated || !isStudent) && (
                          <button
                            className={
                              authReducer.isAuthenticated
                                ? "buy-now-btn"
                                : "buy-now-btn btn-disabled"
                            }
                            onClick={handleOpenBuyNow}
                          >
                            Realizar pago
                          </button>
                        )}
                      </>
                    ) : (
                      <>
                        {(!authReducer.isAuthenticated || !isStudent) && (
                          <button
                            className="buy-now-btn"
                            onClick={handleOpenBuyNow}
                          >
                            Comprar ahora
                          </button>
                        )}
                      </>
                    )}
                    {authReducer.isAuthenticated && isStudent && (
                      <Link to="/academy/EyeelknHcN/course-playing/XSvYM8Q9ES/">
                        <button className="buy-now-btn">
                          Acceder al curso
                        </button>
                      </Link>
                    )}
                    {!authReducer.isAuthenticated && !isIdentifying && (
                      <div className="mt-2">
                        <small>¿Ya eres alumno?</small>{" "}
                        <small
                          className="link-identify"
                          onClick={hanldeOpenIsIdentifying}
                        >
                          Identificate
                        </small>
                      </div>
                    )}
                    {isIdentifying && !authReducer.isAuthenticated && (
                      <div className="identify-user">
                        <div className="iu-form">
                          <span>Inicia Sesión</span>
                          <Formik
                            enableReinitialize={true}
                            initialValues={{
                              email: "",
                              password: "",
                            }}
                            onSubmit={(values) => {
                              const dispatchLogin = (values) =>
                                dispatch(login(values));
                              dispatchLogin(values);
                            }}
                          >
                            {(props) => {
                              return (
                                <>
                                  <Form className="w-100">
                                    {authReducer.error &&
                                      authReducer.error.data.detail && (
                                        <small className="d-block text-red text-center mb-2">
                                          {authReducer.error.data.detail}
                                        </small>
                                      )}
                                    <Field
                                      name="email"
                                      type="text"
                                      placeholder="Email or Username"
                                    />
                                    {authReducer.error &&
                                      authReducer.error.data.email &&
                                      authReducer.error.data.email.map(
                                        (error) => (
                                          <small className="d-block text-red">
                                            {error}
                                          </small>
                                        )
                                      )}
                                    <Field
                                      name="password"
                                      type="password"
                                      placeholder="Contraseña"
                                    />
                                    {authReducer.error &&
                                      authReducer.error.data.password &&
                                      authReducer.error.data.password.map(
                                        (error) => (
                                          <small className="d-block text-red">
                                            {error}
                                          </small>
                                        )
                                      )}
                                    <div className="m-1"></div>
                                    <button
                                      className="shadow"
                                      className="my-button"
                                      type="submit"
                                    >
                                      Iniciar sesión
                                    </button>
                                  </Form>
                                </>
                              );
                            }}
                          </Formik>
                        </div>
                        <div className="d-flex justify-content-center">
                          <small
                            className="cancel-iu"
                            onClick={hanldeCloseIsIdentifying}
                          >
                            Cancelar
                          </small>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="course-content">
                    <span className="course-content-bold">
                      Este curso incluye:
                    </span>
                    <small>
                      <IconContext.Provider
                        value={{
                          color: "",
                          className: "course-content-icon",
                        }}
                      >
                        <MdOndemandVideo />
                      </IconContext.Provider>
                      {msToHMSCard(course.total_duration)}
                    </small>
                    {course.materials_count > 0 && (
                      <small>
                        <IconContext.Provider
                          value={{
                            color: "",
                            className: "course-content-icon",
                          }}
                        >
                          <HiOutlineFolderDownload />
                        </IconContext.Provider>
                        {course.materials_count} recursos descargables
                      </small>
                    )}
                    <small>
                      <IconContext.Provider
                        value={{
                          color: "",
                          className: "course-content-icon",
                        }}
                      >
                        <IoMdInfinite />
                      </IconContext.Provider>
                      Acceso de por vida
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="course-color"></div>
        <div className="course-info-container">
          <div className="course-info-div">
            {buyNow ? (
              <>
                <div className="mt-5 text-grey">
                  <span className="course-link" onClick={handleCloseBuyNow}>
                    Volver a la información del curso
                  </span>
                </div>
                {authReducer.isAuthenticated ? (
                  <>
                    <div className="course-checkout-card">
                      <span className="ccc-title">Pagar</span>

                      <div className="ccc-content">
                        <CardNumberElement
                          options={{
                            placeholder: "Número de tarjeta",
                            style: {
                              base: {
                                fontSize: "16px",
                                backgroundColor: "#fff",
                                padding: "1rem",

                                margin: "1rem",
                                color: "#424770",
                                "::placeholder": {
                                  color: "#aab7c4",
                                },
                              },
                              invalid: {
                                color: "#9e2146",
                              },
                            },
                          }}
                        />
                        <div className="ccc-elements-between">
                          <CardExpiryElement
                            options={{
                              style: {
                                base: {
                                  fontSize: "16px",
                                  backgroundColor: "#fff",
                                  padding: "1rem",

                                  margin: "1rem",
                                  color: "#424770",
                                  "::placeholder": {
                                    color: "#aab7c4",
                                  },
                                },
                                invalid: {
                                  color: "#9e2146",
                                },
                              },
                            }}
                          />
                          <CardCvcElement
                            options={{
                              style: {
                                base: {
                                  fontSize: "16px",
                                  backgroundColor: "#fff",
                                  padding: "1rem",

                                  margin: "1rem",
                                  color: "#424770",
                                  "::placeholder": {
                                    color: "#aab7c4",
                                  },
                                },
                                invalid: {
                                  color: "#9e2146",
                                },
                              },
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="login-register-course">
                      <div className="lrc-header">
                        <div className="lrc-header-links">
                          <span onClick={handleCloseIsLogin}>Registrate</span>{" "}
                          <small>o</small>{" "}
                          <span onClick={handleOpenIsLogin}>Inicia sesión</span>
                        </div>
                        <span>para adquirir el curso</span>
                      </div>
                      <div className="lrc-form">
                        {isLogin ? (
                          <>
                            <span>Inicia Sesión</span>
                            <Formik
                              enableReinitialize={true}
                              initialValues={{
                                email: "",
                                password: "",
                              }}
                              onSubmit={(values) => {
                                const dispatchLogin = (values) =>
                                  dispatch(login(values));
                                dispatchLogin(values);
                              }}
                            >
                              {(props) => {
                                return (
                                  <>
                                    <Form className="w-100">
                                      {authReducer.error &&
                                        authReducer.error.data.detail && (
                                          <small className="d-block text-red text-center mb-2">
                                            {authReducer.error.data.detail}
                                          </small>
                                        )}

                                      {authReducer.error &&
                                        authReducer.error.data
                                          .non_field_errors &&
                                        authReducer.error.data.non_field_errors.map(
                                          (error) => (
                                            <small className="d-block text-red text-center mb-2">
                                              {error}
                                            </small>
                                          )
                                        )}
                                      <Field
                                        name="email"
                                        type="text"
                                        placeholder="Email or Username"
                                      />
                                      {authReducer.error &&
                                        authReducer.error.data.email &&
                                        authReducer.error.data.email.map(
                                          (error) => (
                                            <small className="d-block text-red">
                                              {error}
                                            </small>
                                          )
                                        )}
                                      <Field
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                      />
                                      {authReducer.error &&
                                        authReducer.error.data.password &&
                                        authReducer.error.data.password.map(
                                          (error) => (
                                            <small className="d-block text-red">
                                              {error}
                                            </small>
                                          )
                                        )}

                                      <button type="submit">
                                        Iniciar Sesión
                                      </button>
                                    </Form>
                                  </>
                                );
                              }}
                            </Formik>
                            <div className="lrc-form-footer">
                              <div>
                                <small>
                                  ¿No tienes una cuenta de Classline Academy?
                                </small>{" "}
                                <small
                                  className="lrc-form-footer-link"
                                  onClick={handleCloseIsLogin}
                                >
                                  Registrate
                                </small>
                              </div>
                            </div>
                          </>
                        ) : (
                          <>
                            <Formik
                              enableReinitialize={true}
                              initialValues={{
                                first_name: "",
                                last_name: "",
                                email: "",
                                password: "",
                                password_confirmation: "",
                              }}
                              onSubmit={(values) => {
                                const dispatchLogin = (values) =>
                                  dispatch(registerCheckoutClass(values));
                                dispatchLogin(values);
                              }}
                            >
                              {(props) => {
                                return (
                                  <>
                                    <Form className="w-100">
                                      <span>Registrate</span>
                                      <Field
                                        name="first_name"
                                        type="text"
                                        placeholder="Nombre"
                                      />
                                      {authReducer.error &&
                                        authReducer.error.data.first_name &&
                                        authReducer.error.data.first_name.map(
                                          (error) => (
                                            <small className="d-block text-red">
                                              {error}
                                            </small>
                                          )
                                        )}
                                      <Field
                                        name="last_name"
                                        type="text"
                                        placeholder="Apellidos"
                                      />

                                      {authReducer.error &&
                                        authReducer.error.data.last_name &&
                                        authReducer.error.data.last_name.map(
                                          (error) => (
                                            <small className="d-block text-red">
                                              {error}
                                            </small>
                                          )
                                        )}
                                      <Field
                                        name="email"
                                        type="text"
                                        placeholder="Email or Username"
                                      />
                                      {authReducer.error &&
                                        authReducer.error.data.email &&
                                        authReducer.error.data.email.map(
                                          (error) => (
                                            <small className="d-block text-red">
                                              {error}
                                            </small>
                                          )
                                        )}
                                      <Field
                                        name="password"
                                        type="password"
                                        placeholder="Contraseña"
                                      />
                                      {authReducer.error &&
                                        authReducer.error.data.password &&
                                        authReducer.error.data.password.map(
                                          (error) => (
                                            <small className="d-block text-red">
                                              {error}
                                            </small>
                                          )
                                        )}
                                      <Field
                                        name="password_confirmation"
                                        type="password"
                                        placeholder="Confirmar contraseña"
                                      />
                                      {authReducer.error &&
                                        authReducer.error.data
                                          .password_confirmation &&
                                        authReducer.error.data.password_confirmation.map(
                                          (error) => (
                                            <small className="d-block text-red">
                                              {error}
                                            </small>
                                          )
                                        )}
                                      <button type="submit">Registrarse</button>
                                    </Form>
                                  </>
                                );
                              }}
                            </Formik>
                            <div className="lrc-form-footer">
                              <div>
                                <small>
                                  ¿Tienes una cuenta de Classline Academy?
                                </small>{" "}
                                <small
                                  className="lrc-form-footer-link"
                                  onClick={handleOpenIsLogin}
                                >
                                  Clica aqui
                                </small>
                              </div>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </>
                )}
                <div className="order-details">
                  <span className="order-details-title">
                    Detalles del pedido
                  </span>

                  <div className="order-details-content">
                    <div className="current-course-info">
                      <div className="cci-img">
                        <img src={course.picture} alt="" />
                      </div>
                      <div className="cci-title">
                        <small>{course.title}</small>
                      </div>
                      <div className="cci-price">
                        <small>{course.course_price.value} €</small>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <>
                {course.benefits.length > 0 && course.benefits[0].name != "" ? (
                  <div className="course-benefits">
                    <span className="course-benefits-title">
                      Lo que aprenderás
                    </span>
                    <div className="course-benefits-list">
                      {course.benefits.map((benefit) => (
                        <div className="benefit" key={benefit.id}>
                          <IconContext.Provider
                            value={{
                              color: "",
                              className: "mt-1",
                            }}
                          >
                            <MdCheck />
                          </IconContext.Provider>
                          <span>{benefit.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="m-4"></div>
                )}
                <div className="course-content-list">
                  <span className="course-content-list-title">
                    Contenido del curso
                  </span>
                  <div className="resum-course-content">
                    <small>
                      {course.blocks_count} secciones <b>·</b>{" "}
                      {course.items_count} clases <b>·</b>{" "}
                      {msToHMSRead(course.total_duration)}
                    </small>
                    <div
                      className="show-block-information"
                      onClick={toggleShowBlockInformation}
                    >
                      {showBlockInformation ? (
                        <small>Esconder curso</small>
                      ) : (
                        <small>Desplegar curso</small>
                      )}
                    </div>
                  </div>
                  <div className="course-content-list-content">
                    {course &&
                      course.blocks.map((track, index_block) => (
                        <BlockItemsListContent
                          key={index_block}
                          track={track}
                          index_block={index_block}
                          showBlockInformation={showBlockInformation}
                        />
                      ))}
                    {/* {playingCourseReducer.isLoading && <span>Cargando...</span>} */}
                  </div>
                </div>

                {course.description && (
                  <div className="course-description">
                    <span className="course-description-title">
                      Descripción
                    </span>

                    <div className="course-description-content">
                      <small
                        dangerouslySetInnerHTML={{
                          __html: course.description,
                        }}
                      />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </CourseContainer>
      <ProgramVideo className="" openVideo={openVideo}>
        <div className="video-div" openVideo={openVideo}>
          <div className="course-card position-relative">
            <IconContext.Provider
              value={{
                className: "icon-close cursor-pointer",
                color: "#fff",
                size: "30px",
              }}
            >
              <MdClose onClick={handleCloseVideo} />
            </IconContext.Provider>
            <div
              className="shadow w-100 p-1 rounded bg-white"
              ref={programVideoRef}
            >
              <div className="w-100">
                <CardContainer>
                  <VideoCard
                    ref={video}
                    poster={course.picture}
                    src={course.video_presentation}
                    controls
                  />
                </CardContainer>
              </div>
            </div>
          </div>
        </div>
      </ProgramVideo>
      {openVideo && <TransparentBackground />}
    </>
  );
};
const CourseContainer = styled.div`
  padding: 0.5rem;
  .course-link {
    cursor: pointer;
    /* &:hover { */
    text-decoration: underline;
    /* } */
  }
  .header-course {
    border-radius: 1rem 1rem 0 0;
    background: #1e1e1c;
    color: #fff;
    padding: 3.2rem 1rem;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 0.5rem 1rem;
    .header-course-container {
      max-width: 118.4rem;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 35rem;
      grid-column-gap: 3rem;
      @media screen and (max-width: 768px) {
        display: block;
      }
      .header-course-info {
        .course-title {
          font-weight: 600;
          margin-bottom: 2rem;
        }
        .course-subtitle {
          margin-bottom: 2rem;

          font-size: 1.8rem;
        }
        .course-more-info {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          small {
            display: flex;
            align-items: center;
            .course-more-info-icon {
              margin-right: 0.5rem;
            }
          }
          small:first-of-type {
            margin-right: 1rem;
          }
        }
      }
      .header-course-cta {
        position: relative;

        .cta-content {
          color: #3c3b37;
          position: fixed;
          background: #fff;
          padding: 0.2rem;
          width: 35rem;
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
          border-radius: 0.4rem;
          /* 
          @media screen and (max-width: 1200px) {
            position: absolute;
          } */
          @media screen and (max-width: 1024px) {
            position: relative;
          }
          @media screen and (max-width: 768px) {
            width: 100%;
            background: initial;
            color: #fff;
            margin-top: 3rem;
          }
          .cta-image-no-pointer {
            position: relative;

            img {
              width: 100%;
              border-radius: 0.4rem;
            }
          }
          .cta-image {
            position: relative;
            cursor: pointer;
            img {
              width: 100%;
              border-radius: 0.4rem;
            }
          }
          .cta-info {
            padding: 2rem;
            .course-price {
              span {
                font-size: 3rem;
                font-weight: 700;
              }
            }
            .course-buttons {
              margin-top: 2rem;
              .buy-now-btn.btn-disabled {
                opacity: 0.4;
              }
              .buy-now-btn {
                width: 100%;
                border-radius: 0.4rem;

                padding: 1rem;
                /* border: 1px solid ${(props) => props.color};
                color: ${(props) => props.color} !important;
                background: #fff; */
                color: #fff;
                background: ${(props) => props.color};
                border: none;
                font-weight: bold;
              }
              .link-identify {
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              }
              .identify-user {
                .iu-form {
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  padding: 2rem 2.5rem 2.5rem;
                  span {
                    text-align: center;
                    display: block;
                    margin-bottom: 1rem;
                    font-size: 2rem;
                    font-weight: bold;
                  }
                  input {
                    display: block;
                    width: 100%;
                    border: 1px solid #ccc;
                    border-radius: 0.4rem;
                    padding: 1rem;
                    margin-bottom: 1rem;
                  }
                  button {
                    width: 100%;
                    border-radius: 0.4rem;

                    padding: 1rem;
                    /* border: 1px solid ${(props) => props.color};
                color: ${(props) => props.color} !important;
                background: #fff; */
                    color: #fff;
                    background: ${(props) => props.color};
                    border: none;
                    font-weight: bold;
                  }
                }
                .cancel-iu {
                  cursor: pointer;
                  text-decoration: underline;
                  color: #757575;
                }
              }
            }
            .course-content {
              margin-top: 2rem;
              .course-content-bold {
                font-weight: bold;
                display: block;
              }
              small {
                display: block;
                margin-top: 1rem;
                .course-content-icon {
                  margin-right: 1rem;
                }
              }
            }
          }
        }
      }
    }
  }
  .course-color {
    background: ${(props) => props.color};
    padding: 0.5rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
    border-radius: 0 0 1rem 1rem;
  }
  .course-info-container {
    max-width: 118.4rem;
    margin: 0 auto 3rem;
    display: grid;
    grid-template-columns: 1fr 35rem;
    grid-column-gap: 3rem;
    @media screen and (max-width: 1024px) {
      display: block;
    }
    .course-info-div {
      margin: auto 1rem;
      .course-benefits {
        margin: 3rem 0;
        padding: 2.5rem;
        background-color: #fbfbf8;
        border-radius: 0.4rem;
        border: 1px solid #dcdacb;
        .course-benefits-title {
          color: #3c3b37;
          font-size: 2.4rem;
          font-weight: 800;
        }
        .course-benefits-list {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
          @media screen and (max-width: 1024px) {
            grid-template-columns: 1fr;
          }
          .benefit {
            display: grid;
            grid-template-columns: 16px 1fr;
            /* align-items: center; */
            span {
              font-size: 1.4rem;
              margin-left: 1rem;
            }
          }
        }
      }
      .course-content-list {
        margin-bottom: 3rem;
        .course-content-list-title {
          color: #3c3b37;
          font-size: 2.4rem;
          font-weight: 800;
        }
        .resum-course-content {
          margin: 1rem 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .show-block-information {
            cursor: pointer;
            small {
              font-weight: 700;
            }
          }
        }
        .course-content-list-content {
        }
      }
      .course-description {
        .course-description-title {
          color: #3c3b37;
          font-size: 2.4rem;
          font-weight: 800;
        }
        .course-description-content {
          margin-top: 1.6rem;
        }
      }

      .login-register-course {
        margin: 3rem 0 0;
        padding: 2.5rem 2.5rem 0;
        .lrc-header {
          display: flex;
          align-items: center;
          flex-direction: column;
          color: #757575 !important;
          .lrc-header-links {
            span {
              font-size: 2rem;

              cursor: pointer;
              &:hover {
                text-decoration: underline;
              }
            }
          }
        }
        .lrc-form {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 3rem 0;
          padding: 2rem 2.5rem 2.5rem;
          background-color: #fbfbf8;
          border-radius: 0.4rem;
          border: 1px solid #dcdacb;
          span {
            text-align: center;
            display: block;
            margin-bottom: 2rem;
            font-size: 2.4rem;
            font-weight: bold;
          }
          input {
            display: block;
            width: 100%;
            border: 1px solid #ccc;
            border-radius: 0.4rem;
            padding: 1rem;
            margin-bottom: 1rem;
          }
          button {
            width: 100%;
            border-radius: 0.4rem;

            padding: 1rem;
            /* border: 1px solid ${(props) => props.color};
                color: ${(props) => props.color} !important;
                background: #fff; */
            color: #fff;
            background: ${(props) => props.color};
            border: none;
            font-weight: bold;
          }
          .lrc-form-footer {
            width: 100%;
            display: flex;
            justify-content: flex-end;
            margin-top: 1.5rem;
            small {
              color: #757575 !important;
              &.lrc-form-footer-link {
                cursor: pointer;
                &:hover {
                  text-decoration: underline;
                }
              }
            }
          }
        }
      }
      .order-details {
        margin: 3rem 0;
        .order-details-title {
          color: #3c3b37;
          font-size: 2.4rem;
          font-weight: 800;
        }
        .order-details-content {
          margin: 1.6rem 0;
          .current-course-info {
            height: 7rem;
            display: flex;
            justify-content: space-between;
            @media screen and (max-width: 768px) {
              display: block;
            }
            .cci-img {
              height: 7rem;
              overflow: hidden;
              img {
                height: 100%;
                -ms-flex-negative: 0;
                width: 6rem;
                object-fit: cover;
              }
            }
            .cci-title {
              small {
                font-weight: bold;
              }
            }
            .cci-price {
            }
          }
        }
      }
    }
    .course-checkout-card {
      margin-top: 3rem;
      .ccc-title {
        color: #3c3b37;
        font-size: 2.4rem;
        font-weight: 800;
      }
      .ccc-content {
        margin-top: 1.6rem;
        padding: 2rem 2.5rem 2.5rem;
        background-color: #fbfbf8;
        border-radius: 0.4rem;
        border: 1px solid #dcdacb;
        .ccc-elements-between {
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-gap: 1rem;
          @media screen and (max-width: 768px) {
            display: block;
            .StripeElement {
              margin: inherit;
            }
          }
          .StripeElement {
            margin: 1rem 0;
          }
        }
        .StripeElement {
          background: #fff;
        }
      }
    }
  }
`;

const ProgramVideo = styled.div`
  z-index: 999;
  -webkit-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;

  transition: all 0.25s linear;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100vh;
  /* background: rgba(0,0,0,.7); */
  ${(props) => (props.openVideo ? "opacity: 1;" : "  opacity: 0;")}
  ${(props) =>
    props.openVideo ? "transform: scale(1);" : "  transform: scale(0);"}

      .video-div {
    -webkit-transition: all 0.25s linear;
    -o-transition: all 0.25s linear;
    transition: all 0.25s linear;
    opacity: 1;
    width: 100%;
    position: fixed;
    max-width: 80rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 5%;
  }
  .icon-close {
    z-index: 999;
    position: absolute;
    top: -30px;
    right: 0;
  }
`;
const CardContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  height: 0;
`;
const VideoCard = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
const TransparentBackground = styled.div`
  -webkit-transition: all 0.25s linear;
  -o-transition: all 0.25s linear;

  transition: all 0.25s linear;
  position: fixed;
  width: 100%;
  left: 0;
  top: 0;
  height: 100vh;
  background: rgba(0, 0, 0, 0.7);
`;
export default CourseBuyContainer;
