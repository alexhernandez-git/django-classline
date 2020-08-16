import React, { useState, useRef, useEffect } from "react";
import "static/assets/styles/components/Layout/WelcomeLayout.scss";
import Blackboard from "./Blackboard";
import Form from "react-bootstrap/Form";
import Slider from "react-slick";
import { Link, Redirect } from "react-router-dom";
import { IconContext } from "react-icons";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { FaRegPlayCircle, FaCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";

const WelcomeLayout = () => {
  const videoPresentation = useRef();
  const slider = useRef();
  const [slideIndex, setSlideIndex] = useState(0);
  const [search, setSearch] = useState("");
  const [send, setSend] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setSend(true);
  };

  const settings = {
    initialSlide: 0,
    infinite: false,
    speed: 1000,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (current, next) => setSlideIndex(next),
    afterChange: (current) => setSlideIndex(current),
  };
  const settings2 = {
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    speed: 1000,
    arrows: false,
    dots: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const [actived, setActived] = useState(false);
  const handleCloseVideo = () => {
    videoPresentation.current.pause();

    setActived(false);
  };
  const handleOpenVideo = () => {
    videoPresentation.current.play();
    setActived(true);
  };
  const handleWindowClick = (e) => {
    if (!videoPresentation.current.contains(e.target)) {
      handleCloseVideo();
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
  useEffect(() => {
    const handleEndVideo = (e) => {
      handleCloseVideo();
    };
    videoPresentation.current.addEventListener("ended", handleEndVideo);

    return () => {
      videoPresentation.current.removeEventListener("ended", handleEndVideo);
    };
  });
  return (
    <>
      <div className="div-welcome bg-gradient-green shadow">
        <div className="container">
          <div className="row">
            <div className="col-md-6 align-self-center">
              <span className="mt-3 text-light h4 font-weight-light text-shadow">
                Bienvenido a <h2 className="h2 mb-4">ClassLine Academy</h2>
              </span>
              <Form onSubmit={handleSubmit}>
                <Form.Control
                  className="mb-2"
                  type="text"
                  placeholder="¿Que estas buscando?"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
                {send > 0 && (
                  <Redirect
                    to={{
                      pathname: "/programs/" + search,
                    }}
                  />
                )}
              </Form>

              <span className="mt-3 text-light h4 font-weight-light text-shadow">
                Academias online
              </span>
            </div>
            <div className="col-md-6 p-5">
              <span className="d-block d-md-none m-3"></span>
              <div
                className="position-relative  cursor-pointer"
                onClick={handleOpenVideo}
              >
                <img
                  className="w-100"
                  src="../../../static/assets/img/snapshotlaptop.png"
                  alt="screenshot"
                />
                <div className="card-img-container text-white">
                  <IconContext.Provider
                    value={{
                      className: "position-absolute h1",
                      style: {
                        left: "0",
                        right: "0",
                        top: "0",
                        bottom: "0",
                        margin: "auto",
                        fontSize: "4rem",
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
                      style: {
                        left: "0",
                        right: "0",
                        top: "0",
                        bottom: "0",
                        margin: "auto",
                        fontSize: "3.8rem",
                        opacity: "0.8",
                      },
                    }}
                  >
                    <div>
                      <FaCircle />
                    </div>
                  </IconContext.Provider>
                </div>
              </div>{" "}
              <div
                className="position-fixed"
                style={{
                  webkitTransition: "all 0.25s linear",
                  oTransition: "all 0.25s linear",
                  transition: "all 0.25s linear",
                  zIndex: 1000000,
                  width: "100%",
                  maxWidth: "1200px",
                  maxHeight: "300px",
                  transform: actived ? "scale(1)" : "scale(0)",
                  opacity: actived ? 1 : 0,
                  margin:
                    "5% auto" /* Will not center vertically and won't work in IE6/7. */,
                  left: 0,
                  right: 0,
                  padding: "5%",
                  top: 0,
                }}
              >
                <div className="position-relative">
                  <IconContext.Provider
                    value={{
                      className: "cursor-pointer",
                      color: "#fff",
                      size: "30px",
                    }}
                  >
                    <MdClose
                      onClick={handleCloseVideo}
                      style={{
                        zIndex: 510,
                        position: "absolute",
                        top: "-30px",
                        right: 0,
                      }}
                    />
                  </IconContext.Provider>
                  <div
                    style={{
                      position: "absolute",
                      zIndex: 100000,
                      background: "#000",
                      width: "77%",
                      height: "80%",
                      margin: "auto",
                      left: 0,
                      top: "5%",
                      right: 0,
                    }}
                  ></div>
                  <video
                    ref={videoPresentation}
                    style={{
                      position: "absolute",
                      zIndex: 1000000,
                      width: "77%",

                      height: "80%",
                      margin: "auto",
                      left: 0,
                      top: "5%",
                      right: 0,
                    }}
                    controls
                    controlsList="nodownload"
                    src="../../../static/assets/videos/screencastweb2.mp4"
                  ></video>
                  <img
                    className="w-100"
                    src="../../../static/assets/img/screenshotvideos.png"
                    alt="screenshot"
                  />
                </div>
              </div>
              {/* <Slider {...settings2}>
                <img
                  className="w-100"
                  src="../../../static/assets/img/screenshotvideos.png"
                  alt="screenshot"
                />
                <img
                  className="w-100"
                  src="../../../static/assets/img/snapshotlaptop2.png"
                  alt="screenshot"
                />
                <img
                  className="w-100"
                  src="../../../static/assets/img/screenshotvideo3.png"
                  alt="screenshot"
                />
              </Slider> */}
              {/* <Blackboard /> */}
            </div>
          </div>
        </div>
      </div>
      <div className="shadow text-white">
        <div className="w-100">
          <div className="row bg-danger p-1 shadow">
            <div className="container text-center d-flex justify-content-center align-items-center">
              {slideIndex == 0 ? (
                <>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "grey",
                        className: "h3 mr-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropleft />
                    </IconContext.Provider>
                  </span>
                  <span className="h4 m-0 p-2 cursor-pointer">Alumno</span>
                  <span
                    className="h4 m-0 p-2 cursor-pointer font-weight-lighter"
                    style={{ opacity: 0.8 }}
                    onClick={() => {
                      slider.current.slickGoTo(1);
                    }}
                  >
                    Instructor
                  </span>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "h3 ml-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropright
                        onClick={() => {
                          slider.current.slickGoTo(1);
                        }}
                      />
                    </IconContext.Provider>
                  </span>
                </>
              ) : (
                <>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "white",
                        className: "h3 mr-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropleft
                        onClick={() => {
                          slider.current.slickGoTo(0);
                        }}
                      />
                    </IconContext.Provider>
                  </span>
                  <span
                    className="h4 m-0 p-2 cursor-pointer font-weight-lighter"
                    style={{ opacity: 0.8 }}
                    onClick={() => {
                      slider.current.slickGoTo(0);
                    }}
                  >
                    Alumno
                  </span>

                  <span className="h4 m-0 p-2 cursor-pointer">Instructor</span>
                  <span>
                    <IconContext.Provider
                      value={{
                        color: "grey",
                        className: "h3 ml-2 mb-0 cursor-pointer",
                      }}
                    >
                      <IoIosArrowDropright />
                    </IconContext.Provider>
                  </span>
                </>
              )}
            </div>
          </div>
          <div className="container container-info-pill">
            <Slider {...settings} ref={slider}>
              <div className="slick-element text-center p-4 d-sm-flex justify-content-around font-weight-normal">
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Tu eliges</span>
                  tu academia online
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">
                    Sin compromiso
                  </span>
                  en tus subscripciones
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Acceso a</span>
                  todo el contenido
                </div>
              </div>

              <div className="slick-element text-center p-4 d-sm-flex justify-content-around font-weight-normal">
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Crea gratis</span>
                  tu academia online
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">Gana dinero</span>
                  las subscripciones
                </div>
                <div className="info-pill col-md-3 d-flex flex-column align-items-center justify-content-center p-2 bg-gradient-green rounded-pill shadow">
                  <span className="font-weight-bold d-block">
                    Asinga cuentas
                  </span>
                  para tus alumnos
                </div>
              </div>
            </Slider>
          </div>
          <div className="d-sm-flex justify-content-center bg-gradient-green p-3">
            {/* <Link to="/courses" className="text-center d-block bg-white cursor-pointer rounded-pill text-grey px-3 py-2 m-0 h5 font-weight-normal text-secondary shadow m-2">Cursos en directo</Link> */}
            <Link
              to="/programs"
              className="text-center d-block bg-white cursor-pointer rounded-pill text-grey px-3 py-2 m-0 h5 font-weight-normal text-secondary shadow m-2"
            >
              Ver academias online
            </Link>
            {/* <Link to="/teachers" className="text-center d-block bg-white cursor-pointer rounded-pill text-grey px-3 py-2 m-0 h5 font-weight-normal text-secondary shadow m-2">Clases particulares</Link> */}
          </div>
        </div>
      </div>
      {actived && (
        <div
          style={{
            webkitTransition: "all 0.25s linear",
            oTransition: "all 0.25s linear",

            transition: "all 0.25s linear",
            position: "fixed",
            width: "100%",
            left: 0,
            top: 0,
            height: "100vh",
            zIndex: 100000,
            background: "rgba(0, 0, 0, 0.7)",
          }}
        ></div>
      )}
    </>
  );
};

export default WelcomeLayout;
