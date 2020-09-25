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
const index = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { program } = useParams();
  const programReducer = useSelector((state) => state.programReducer);
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
                      programReducer.program && programReducer.program.picture
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
      {openVideo && <TransparentBackground />}
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
    props.openVideo
      ? "transform: scale(1);"
      : "  transform: scale(0);"}

      .video-div {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 80rem;
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
