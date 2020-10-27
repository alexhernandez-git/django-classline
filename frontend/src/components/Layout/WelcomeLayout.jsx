import React, { useState, useRef, useEffect } from "react";
import "static/assets/styles/components/Layout/WelcomeLayout.scss";
import Form from "react-bootstrap/Form";
import { Link, Redirect } from "react-router-dom";
import { IconContext } from "react-icons";
import { FaRegPlayCircle, FaCircle } from "react-icons/fa";
import { MdClose } from "react-icons/md";
import InfoSlider from "./InfoSlider";
import useCheckAreDiscount from "../../hooks/useCheckAreDiscount";

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

  const [actived, setActived] = useState(false);
  const handleCloseVideo = () => {
    videoPresentation.current.pause();

    setActived(false);
  };
  const handleOpenVideo = () => {
    videoPresentation.current.play();
    console.log("entra");
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
  const [areDiscount, fetchDiscount] = useCheckAreDiscount();
  useEffect(() => {
    console.log(actived);
  }, [actived]);
  return (
    <>
      <div className=" bg-gradient-green shadow">
        <div className="div-welcome">
          <div className="container">
            <div className="row">
              <div className="col-md-6 align-self-center">
                <span className="mt-3 text-light h4 font-weight-light text-shadow">
                  Bienvenido a <h2 className="h2 mb-4">Classline Academy</h2>
                </span>
                {/* <Form onSubmit={handleSubmit}>
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
                </Form> */}

                <span className="mt-3 text-light h4 font-weight-light text-shadow">
                  Crea tu propia academia online
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
                    src="../../../static/assets/img/ShapeItApp (4).png"
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
                    zIndex: actived ? 1000000 : "-1",
                    width: "100%",
                    maxWidth: "800px",
                    transform: actived ? "scale(1)" : "scale(0)",
                    opacity: actived ? 1 : 0,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                  // width: 100%;
                  // position: fixed;
                  // max-width: 80rem;
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
                      src="../../../static/assets/videos/videopresentation.mp4"
                    ></video>
                    <img
                      className="w-100"
                      src="../../../static/assets/img/ShapeItApp (4).png"
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

        {areDiscount && (
          <div className="div-offer-discount">
            <div className="offer-discount bg-warning text-white p-2 text-center">
              {console.log(areDiscount)}
              <span className="d-block title h4 mb-0">{areDiscount.title}</span>
              <span className="d-block h5 mb-0 font-weight-normal">
                {areDiscount.message}
              </span>
            </div>
          </div>
        )}
      </div>
      <InfoSlider />
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
