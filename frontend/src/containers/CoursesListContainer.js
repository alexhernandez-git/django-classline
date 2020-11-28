import React, { useEffect, useState } from "react";
import ContainerWrapper from "src/components/ui/Container";
import {
  ButtonCustomColor,
  ButtonCustomGradient,
} from "../components/ui/ButtonCustom";
import { GridVideos } from "./CoursesAcademy";
import Filters from "src/components/Layout/Filters";
import { IconContext } from "react-icons/lib";
import { IoIosArrowDropleft } from "react-icons/io";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";
import { fetchPublishedCourses } from "../redux/actions/courses/buyCourses";

const CoursesListContainer = () => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchCourses = () => dispatch(fetchPublishedCourses());
      dispatchFetchCourses();
    }
  }, [programReducer.isLoading]);
  const buyCoursesReducer = useSelector((state) => state.buyCoursesReducer);

  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    // dispatch(fetchBuyPacksPagination(url, showMyPacks));
  };
  const goToLogin = () => {
    push(`/academy/${programReducer.program.code}/courses-login`);
  };
  const [showMyPacks, setShowMyPacks] = useState(false);
  const handleGoToDetails = (course) => {
    push(`/academy/${programReducer.program.code}/course-info/${course.code}`);
  };
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
  return (
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
          .share-course-div {
            display: flex;
            justify-content: space-between;
            .sc-copy-link {
              display: flex;
              input {
                width: 100%;
                border: 1px solid #757575;
                border-radius: 0.4rem 0 0 0.4rem;
                padding: 0.5rem;
                color: #757575;
                font-size: 1.5rem;
              }
              button {
                border-left: none;
                border-top: 1px solid #757575;
                border-right: 1px solid #757575;
                border-bottom: 1px solid #757575;
                border-radius: 0 0.4rem 0.4rem 0;
                padding: 0.5rem;
                background: white;
              }
            }
            .sc-mail {
              border: 1px solid #757575;
              border-radius: 0.4rem;
              padding: 0.5rem;
              background: white;
            }
          }
          .tooltip-inner {
            max-width: 200px;
            padding: 0.5rem 1rem;
            color: #fff;
            text-align: center;
            background-color: #000;
            border-radius: 0.5rem;
            font-size: 1.3rem;
          }
        `}
      />
      <div className="py-5 px-3">
        <div
          className="mb-5 pb-5"
          style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
        >
          <ContainerWrapper>
            <Filters title={showMyPacks ? "Mis Cursos" : "Cursos Publicados"} />
            <div className="d-flex justify-content-end mb-3">
              {showMyPacks ? (
                <ButtonCustomColor color={programReducer.program.brand_color}>
                  Ver Cursos Publicados
                </ButtonCustomColor>
              ) : (
                <ButtonCustomColor
                  color={programReducer.program.brand_color}
                  onClick={() => goToLogin()}
                >
                  Ver Mis Cursos
                </ButtonCustomColor>
              )}
            </div>
            <div className="row mx-0">
              <div className="col-12">
                <CoursesContainer>
                  {buyCoursesReducer.courses &&
                    buyCoursesReducer.courses.results.map((course, i) => (
                      <CourseCard
                        key={i}
                        onClick={() => handleGoToDetails(course)}
                      >
                        <div className="cc-img">
                          <img
                            src={
                              course.picture
                                ? course.picture
                                : "/static/assets/img/no-foto.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="cc-info">
                          <div className="cc-info-title">{course.title}</div>
                          <p className="cc-info-subtitle">{course.subtitle}</p>
                          <div className="cc-info-instructor">
                            {course.instructor.first_name}{" "}
                            {course.instructor.last_name}
                          </div>
                          <div className="cc-info-more-info">
                            <span className="ccimi-hours mr-1">
                              {msToHMSRead(course.total_duration)}
                            </span>{" "}
                            ·{" "}
                            <span className="ccimi-clases ml-1">
                              {course.items} clases
                            </span>
                          </div>
                        </div>
                        <div className="cc-price">
                          {course.course_price.value} €
                        </div>
                      </CourseCard>
                    ))}
                </CoursesContainer>
                {/* {isLoading && <span>Cargando...</span>} */}
                {buyCoursesReducer.courses &&
                  (buyCoursesReducer.courses.previous ||
                    buyCoursesReducer.courses.next) && (
                    <div className="d-flex justify-content-center my-5">
                      {buyCoursesReducer.courses.previous ? (
                        <IconContext.Provider
                          value={{
                            size: 50,
                            className: "cursor-pointer",
                          }}
                        >
                          <IoIosArrowDropleft
                            onClick={() =>
                              handleChangePage(
                                buyCoursesReducer.courses.previous
                              )
                            }
                          />
                        </IconContext.Provider>
                      ) : (
                        <IconContext.Provider
                          value={{
                            size: 50,
                            color: "#a1a1a1",
                          }}
                        >
                          <IoIosArrowDropleft />
                        </IconContext.Provider>
                      )}
                      {buyCoursesReducer.courses.next ? (
                        <IconContext.Provider
                          value={{
                            size: 50,
                            className: "cursor-pointer",
                          }}
                        >
                          <IoIosArrowDropright
                            onClick={() =>
                              handleChangePage(buyCoursesReducer.courses.next)
                            }
                          />
                        </IconContext.Provider>
                      ) : (
                        <IconContext.Provider
                          value={{
                            size: 50,
                            color: "#a1a1a1",
                          }}
                        >
                          <IoIosArrowDropright />
                        </IconContext.Provider>
                      )}
                    </div>
                  )}
              </div>
            </div>
          </ContainerWrapper>
        </div>
        <div className="d-flex justify-content-end mr-5">
          <a href="https://classlineacademy.com/" target="_blank">
            <img height="25" src="/static/assets/img/logo7.PNG" />
          </a>
        </div>
      </div>
    </>
  );
};
const CoursesContainer = styled.div`
  max-width: 80rem;
  margin: 0 auto;
`;
const CourseCard = styled.div`
  &:hover {
    opacity: 0.7;
  }
  cursor: pointer;
  padding: 0 0 2rem;
  margin: 0 0 2rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  display: grid;
  grid-template-columns: 26rem 1fr 9.6rem;
  grid-gap: 2rem;
  @media screen and (max-width: 1024px) {
    grid-template-columns: 0.5fr 1fr 9.6rem;
  }
  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
  .cc-img {
    max-width: 26rem;
    img {
      width: 100%;
    }
  }
  .cc-info {
    .cc-info-title {
      font-weight: bold;
      margin: 0 0 1rem 0;
    }
    .cc-info-subtitle {
      font-size: 1.2rem;
    }
    .cc-info-instructor {
      font-size: 1.2rem;
      font-weight: bold;
      color: #73726c;
    }
    .cc-info-more-info {
      display: flex;
      color: #73726c;

      align-items: center;
      @media screen and (max-width: 768px) {
        display: block;
      }
      span {
        font-size: 1.2rem;
      }
    }
  }
  .cc-price {
    font-weight: bold;
  }
`;
export default CoursesListContainer;
