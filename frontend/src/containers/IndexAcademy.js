import React, { useState, useEffect, useRef } from "react";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import ProgramDescription from "src/components/MainPage/ProgramDescription";
import ProgramBenefits from "src/components/MainPage/ProgramBenefits";
import Estadistics from "src/components/MainPage/Estadistics";
import { MdClose } from "react-icons/md";
import { FaPlay } from "react-icons/fa";
import { Link, useParams, useHistory } from "react-router-dom";
import { IconContext } from "react-icons";
import { useSelector, useDispatch } from "react-redux";
import StudentReview from "src/components/Programs/StudentFeedback/StudentReview";

import { Formik, Form as FormFormik, Field } from "formik";
import { login } from "src/redux/actions/auth";
import StarRating from "src/components/Layout/StarRatings";
import axios from "axios";
import BookMeetups from "src/components/ui/BookMeetups";
const index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { program } = useParams();
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  useEffect(() => {
    if (authReducer.isAuthenticated && authReducer.haveAccess)
      history.push(`/academy/${program}/home/`);
  }, [authReducer.isAuthenticated, authReducer.haveAccess]);
  const programVideoRef = useRef();
  const video = useRef();
  const [accessOpen, setAccessOpen] = useState(false);
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

  return (
    <>
      <Global
        styles={css`
          :root {
            --darkgray: #323840;
            --gradient: linear-gradient(45deg, #2e6a89, #56b389);
            --border: 1px solid #ddd;
            --left-msg-bg: #ececec;
            --right-msg-bg: #579ffb;
            --green: #56b389;
            --blue: #94c2ed;
            --orange: #e38968;
            --gray: #92959e;
            --purple: #684e73;
          }
          * {
            padding: 0;
            margin: 0;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            font-family: "Open Sans", sans-serif;
          }
          a {
            text-decoration: none;
            color: #000;
          }
          a:hover {
            text-decoration: none;
            color: #000;
          }

          input:focus,
          button:focus,
          a:focus {
            outline: none;
          }
          /* Utils */
          .cursor-pointer {
            cursor: pointer;
          }
        `}
      />

      {/* <Header className="p-3 shadow">
        <ContainerLogo className="cursor-pointer d-flex align-items-center">
          <Logo>
            <img
              src={
                !programReducer.isLoading &&
                programReducer.program.instructor.profile.picture
                  ? programReducer.program.instructor.profile.picture
                  : "../../static/assets/img/no-foto.png"
              }
              alt="avatar"
            />
          </Logo>
          <span className="ml-3 font-weight-bold">
            {!programReducer.isLoading && programReducer.program.title}
          </span>
        </ContainerLogo>
      </Header> */}

      <Section className="py-5">
        <div className="container">
          <div className="row">
            <div className="col-sm-6 d-flex align-items-center justify-content-center">
              {/* <span className="text-white">
                {!programReducer.isLoading && programReducer.program.title}{" "}
                trabaja con Classline Academy para ofrecerte esta plataforma
              </span> */}
              {!programReducer.isLoading && programReducer.program.picture && (
                <ContainerImage className="shadow">
                  <img src={programReducer.program.picture} alt="" />
                  <div className="program-main-info">
                    <span className="program-title">
                      {programReducer.program?.title}
                    </span>
                    <div className="punctuation">
                      <StarRating rating={programReducer.program.rating} />
                      <small className="font-weight-light ml-1 mt-1 d-block">
                        ({programReducer.program.ratings})
                      </small>
                    </div>
                  </div>
                </ContainerImage>
              )}
            </div>
            <div className="d-block d-sm-none m-3"></div>
            <div className="col-sm-6">
              <Formik
                enableReinitialize={true}
                initialValues={{
                  email: "",
                  password: "",
                }}
                onSubmit={(values) => {
                  const dispatchLogin = (values) => dispatch(login(values));
                  dispatchLogin(values);
                }}
              >
                {(props) => {
                  return (
                    <>
                      <FormFormik>
                        <Form>
                          <FlipCard className="shadow" accessOpen={accessOpen}>
                            <div className="flip-card-inner">
                              <div className="flip-card-front">
                                <div>
                                  {authReducer.error &&
                                    authReducer.error.data.detail && (
                                      <small className="d-block text-red text-center mb-2">
                                        {authReducer.error.data.detail}
                                      </small>
                                    )}

                                  {authReducer.error &&
                                    authReducer.error.data.non_field_errors &&
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
                                </div>
                                {!programReducer.isLoading && (
                                  <button
                                    className="shadow"
                                    className="my-button"
                                    type="submit"
                                  >
                                    Acceder
                                  </button>
                                )}
                                {!programReducer.isLoading &&
                                  programReducer.program.published && (
                                    <div className="mt-2">
                                      <small
                                        className="d-block cursor-pointer"
                                        onClick={() => setAccessOpen(true)}
                                      >
                                        ¿No tienes acceso?
                                      </small>
                                    </div>
                                  )}
                              </div>
                              {!programReducer.isLoading &&
                                programReducer.program.published &&
                                programReducer.program.program_price && (
                                  <div className="flip-card-back d-flex flex-column justify-content-between">
                                    <div className="d-flex justify-content-end">
                                      <div className="d-flex justify-content-between w-100">
                                        <a href="/" target="_blank">
                                          <img
                                            alt=""
                                            src={
                                              "../../../static/assets/img/logo7.PNG"
                                            }
                                            height="30"
                                            width="109.33"
                                            className="d-inline-block align-top"
                                          />
                                        </a>
                                        <IconContext.Provider
                                          value={{
                                            size: 16,
                                            className: "cursor-pointer",
                                          }}
                                        >
                                          <MdClose
                                            onClick={() => setAccessOpen(false)}
                                          />
                                        </IconContext.Provider>
                                      </div>
                                    </div>
                                    <small>
                                      Consigue accesso por{" "}
                                      {programReducer.program.program_price
                                        .label &&
                                        programReducer.program.program_price
                                          .label}
                                    </small>
                                    <a
                                      href={`/program/${program}`}
                                      className="my-button shadow"
                                      target="_blank"
                                    >
                                      Obtener
                                    </a>
                                  </div>
                                )}
                            </div>
                          </FlipCard>
                        </Form>
                      </FormFormik>
                    </>
                  );
                }}
              </Formik>
            </div>
          </div>
        </div>
      </Section>
      <Separation className="p-3 shadow"></Separation>

      <div className="container my-5 mx-auto w-auto">
        <div className="row mx-2">
          <BookMeetups />
        </div>
        <div className="row mx-2">
          <ProgramInfo className="text-grey">
            <div className="d-sm-flex justify-content-between text-dark">
              <Title>
                Acerca de{" "}
                {!programReducer.isLoading && programReducer.program.title}
              </Title>
              <div className="d-block d-sm-none m-3"></div>
              {!programReducer.isLoading &&
                programReducer.program.video_presentation && (
                  <div
                    className="d-flex align-items-center cursor-pointer"
                    onClick={handleOpenVideo}
                  >
                    <IconContext.Provider
                      value={{
                        className: "",
                        size: "16px",
                      }}
                    >
                      <FaPlay />
                    </IconContext.Provider>
                    <span className="ml-2">Ver video</span>
                  </div>
                )}
            </div>
            {!programReducer.isLoading &&
              programReducer.program.description && <ProgramDescription />}
            {!programReducer.isLoading &&
              programReducer.program.benefits.length > 0 &&
              programReducer.program.benefits[0].name != "" && (
                <ProgramBenefits />
              )}

            <Estadistics />
          </ProgramInfo>

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
                        poster={
                          programReducer.program &&
                          programReducer.program.picture
                        }
                        src={
                          programReducer.program &&
                          programReducer.program.video_presentation
                        }
                        controls
                      />
                    </CardContainer>
                  </div>
                </div>
              </div>
            </div>
          </ProgramVideo>
        </div>
        {openVideo && <TransparentBackground />}
      </div>
    </>
  );
};
const Header = styled.header``;
const ContainerLogo = styled.div``;
const ContainerImage = styled.div`
  width: 100%;
  background: white;
  padding: 0.4rem;
  max-width: 400px;
  border-radius: 0.7rem;
  img {
    width: 100%;
  }
  .program-main-info {
    margin: 1rem 0;
  }
  .program-title {
    display: block;
    text-align: center;
    font-size: 18px;
  }
  .punctuation {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

const FlipCard = styled.fieldset`
  background-color: transparent;
  width: 300px;
  height: 200px;
  border: 1px solid #f1f1f1;
  perspective: 1000px; /* Remove this if you don't want the 3D effect */
  .flip-card-inner {
    position: relative;
    width: 100%;
    height: 100%;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }
  ${(props) =>
    props.accessOpen &&
    `
        .flip-card-inner {
            transform: rotateY(180deg);
        }
        `}
  .flip-card-front, .flip-card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    -webkit-backface-visibility: hidden; /* Safari */
    backface-visibility: hidden;
  }
  .flip-card-front {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .flip-card-back {
    transform: rotateY(180deg);
  }
  .flip-card-back button {
    bottom: 0;
    left: 0;
  }
`;

const Logo = styled.span`
  display: flex;
  align-items: center;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  overflow: hidden;
  font-size: 20px;
  img {
    width: 100%;
  }
`;
const Section = styled.section`
  background: var(--gradient);
`;
const Form = styled.div`
  display: flex;
  justify-content: center;
  fieldset {
    background: #fff;
    padding: 2rem 2rem;
    max-width: 35rem;
    border-radius: 0.7rem;
  }
  input {
    width: 100%;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    border: 1px solid #ccc;
    border-radius: 0.7rem;
    &:first-of-type {
      margin: 0;
    }
  }

  .my-button {
    border: 0;
    padding: 0.5rem 1rem;
    width: 100%;
    background: var(--gradient);
    color: #fff;
    border-radius: 0.7rem;
  }
  .my-button:active {
    position: relative;
    top: 1px;
  }
`;
const Separation = styled.div`
  background-color: var(--purple) !important;
`;
const MainProgramContainer = styled.main`
  background: var(--darkgray);
  padding-top: 2rem;
`;
const ProgramInfo = styled.div`
  width: 100%;
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
export const Title = styled.div`
  font-size: 2.8rem;
`;
export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  height: 0;
`;
export const VideoCard = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
export const TransparentBackground = styled.div`
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
export default index;
