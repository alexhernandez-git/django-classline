import React, { useState } from "react";
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
import { useSelector } from "react-redux";
import styled from "@emotion/styled";
import { Global, css } from "@emotion/core";

const CoursesListContainer = () => {
  const { push } = useHistory();

  const [courses, setCourses] = useState({
    count: 2,
    next: null,
    previous: null,
    results: [
      {
        id: "f9914302-38df-4276-8c08-9f4e38c3ef61",
        code: "XSvYM8Q9ES",
        title: "Wordpress training",
        subtitle: "",
        description:
          "<p>fewafweaaefwoahfewoipwafepioawef</p><p>awefoieowaefophweaoipfew</p><p>&nbsp;</p><p><strong>fewaefwafewaefwewf</strong></p><p><strong>fewaafweoewfj0òawefjfeojwaeopfawe</strong></p><ul><li><strong>feawfaewpkwepòff</strong></li><li><strong>afwepoijaefwàfwej</strong></li><li><strong>feawpojaewfaefwijawef</strong></li></ul>",
        course_price: null,
        course_language: null,
        picture:
          "http://192.168.1.10:8000/media/programs/courses/pictures/0.0v2pmb5gi230.8p0fznz5ct2wordpress-training.jpg",
        students_count: 0,
        students: [],
        instructor: {
          id: "f0f3a11e-e54c-4ecd-8238-c6acf5b743d6",
          code: "acUgt2YDd9",
          username: "vlexhndz@gmail.com",
          first_name: "Alex",
          last_name: "Hernandez",
          email: "vlexhndz@gmail.com",
          phone_number: "",
          is_staff: false,
          profile: {
            picture:
              "/media/users/pictures/f0f3a11e-e54c-4ecd-8238-c6acf5b743d6AlexNRC-9290_1080.jpg",
            is_enterprise: false,
            company_name: null,
            language: null,
            biography: "",
            country: null,
            stripe_account_id: "acct_1HDPmILG81widXZi",
            stripe_customer_id: null,
            subscriptions: [],
          },
          created_account: false,
          first_password: null,
          teacher: {
            programs: 1,
            rating: 0.0,
            ratings: 0,
            students: 0,
            academies: 1,
          },
          password_changed: false,
        },
        published_in_program: true,
        benefits: [
          {
            id: "9219b356-b063-4b1a-a927-08d8bf4df523",
            name: "",
          },
        ],
        video_presentation:
          "http://192.168.1.10:8000/media/programs/courses/videos/0.cg71wpexhbqvideoplayback_2.mp4",
        published: false,
        blocks: 3,
        items: 11,
        total_duration: 3561.1600000000003,
        color: "#b872dc",
      },
      {
        id: "f9914302-38df-4276-8c08-9f4e38c3ef61",
        code: "XSvYM8Q9ES",
        title: "Wordpress training",
        subtitle: "",
        description:
          "<p>fewafweaaefwoahfewoipwafepioawef</p><p>awefoieowaefophweaoipfew</p><p>&nbsp;</p><p><strong>fewaefwafewaefwewf</strong></p><p><strong>fewaafweoewfj0òawefjfeojwaeopfawe</strong></p><ul><li><strong>feawfaewpkwepòff</strong></li><li><strong>afwepoijaefwàfwej</strong></li><li><strong>feawpojaewfaefwijawef</strong></li></ul>",
        course_price: null,
        course_language: null,
        picture:
          "http://192.168.1.10:8000/media/programs/courses/pictures/0.0v2pmb5gi230.8p0fznz5ct2wordpress-training.jpg",
        students_count: 0,
        students: [],
        instructor: {
          id: "f0f3a11e-e54c-4ecd-8238-c6acf5b743d6",
          code: "acUgt2YDd9",
          username: "vlexhndz@gmail.com",
          first_name: "Alex",
          last_name: "Hernandez",
          email: "vlexhndz@gmail.com",
          phone_number: "",
          is_staff: false,
          profile: {
            picture:
              "/media/users/pictures/f0f3a11e-e54c-4ecd-8238-c6acf5b743d6AlexNRC-9290_1080.jpg",
            is_enterprise: false,
            company_name: null,
            language: null,
            biography: "",
            country: null,
            stripe_account_id: "acct_1HDPmILG81widXZi",
            stripe_customer_id: null,
            subscriptions: [],
          },
          created_account: false,
          first_password: null,
          teacher: {
            programs: 1,
            rating: 0.0,
            ratings: 0,
            students: 0,
            academies: 1,
          },
          password_changed: false,
        },
        published_in_program: true,
        benefits: [
          {
            id: "9219b356-b063-4b1a-a927-08d8bf4df523",
            name: "",
          },
        ],
        video_presentation:
          "http://192.168.1.10:8000/media/programs/courses/videos/0.cg71wpexhbqvideoplayback_2.mp4",
        published: false,
        blocks: 3,
        items: 11,
        total_duration: 3561.1600000000003,
        color: "#b872dc",
      },
      {
        id: "f9914302-38df-4276-8c08-9f4e38c3ef61",
        code: "XSvYM8Q9ES",
        title: "Wordpress training",
        subtitle: "",
        description:
          "<p>fewafweaaefwoahfewoipwafepioawef</p><p>awefoieowaefophweaoipfew</p><p>&nbsp;</p><p><strong>fewaefwafewaefwewf</strong></p><p><strong>fewaafweoewfj0òawefjfeojwaeopfawe</strong></p><ul><li><strong>feawfaewpkwepòff</strong></li><li><strong>afwepoijaefwàfwej</strong></li><li><strong>feawpojaewfaefwijawef</strong></li></ul>",
        course_price: null,
        course_language: null,
        picture:
          "http://192.168.1.10:8000/media/programs/courses/pictures/0.0v2pmb5gi230.8p0fznz5ct2wordpress-training.jpg",
        students_count: 0,
        students: [],
        instructor: {
          id: "f0f3a11e-e54c-4ecd-8238-c6acf5b743d6",
          code: "acUgt2YDd9",
          username: "vlexhndz@gmail.com",
          first_name: "Alex",
          last_name: "Hernandez",
          email: "vlexhndz@gmail.com",
          phone_number: "",
          is_staff: false,
          profile: {
            picture:
              "/media/users/pictures/f0f3a11e-e54c-4ecd-8238-c6acf5b743d6AlexNRC-9290_1080.jpg",
            is_enterprise: false,
            company_name: null,
            language: null,
            biography: "",
            country: null,
            stripe_account_id: "acct_1HDPmILG81widXZi",
            stripe_customer_id: null,
            subscriptions: [],
          },
          created_account: false,
          first_password: null,
          teacher: {
            programs: 1,
            rating: 0.0,
            ratings: 0,
            students: 0,
            academies: 1,
          },
          password_changed: false,
        },
        published_in_program: true,
        benefits: [
          {
            id: "9219b356-b063-4b1a-a927-08d8bf4df523",
            name: "",
          },
        ],
        video_presentation:
          "http://192.168.1.10:8000/media/programs/courses/videos/0.cg71wpexhbqvideoplayback_2.mp4",
        published: false,
        blocks: 3,
        items: 11,
        total_duration: 3561.1600000000003,
        color: "#b872dc",
      },
      {
        id: "f9914302-38df-4276-8c08-9f4e38c3ef61",
        code: "XSvYM8Q9ES",
        title: "Wordpress training",
        subtitle: "",
        description:
          "<p>fewafweaaefwoahfewoipwafepioawef</p><p>awefoieowaefophweaoipfew</p><p>&nbsp;</p><p><strong>fewaefwafewaefwewf</strong></p><p><strong>fewaafweoewfj0òawefjfeojwaeopfawe</strong></p><ul><li><strong>feawfaewpkwepòff</strong></li><li><strong>afwepoijaefwàfwej</strong></li><li><strong>feawpojaewfaefwijawef</strong></li></ul>",
        course_price: null,
        course_language: null,
        picture:
          "http://192.168.1.10:8000/media/programs/courses/pictures/0.0v2pmb5gi230.8p0fznz5ct2wordpress-training.jpg",
        students_count: 0,
        students: [],
        instructor: {
          id: "f0f3a11e-e54c-4ecd-8238-c6acf5b743d6",
          code: "acUgt2YDd9",
          username: "vlexhndz@gmail.com",
          first_name: "Alex",
          last_name: "Hernandez",
          email: "vlexhndz@gmail.com",
          phone_number: "",
          is_staff: false,
          profile: {
            picture:
              "/media/users/pictures/f0f3a11e-e54c-4ecd-8238-c6acf5b743d6AlexNRC-9290_1080.jpg",
            is_enterprise: false,
            company_name: null,
            language: null,
            biography: "",
            country: null,
            stripe_account_id: "acct_1HDPmILG81widXZi",
            stripe_customer_id: null,
            subscriptions: [],
          },
          created_account: false,
          first_password: null,
          teacher: {
            programs: 1,
            rating: 0.0,
            ratings: 0,
            students: 0,
            academies: 1,
          },
          password_changed: false,
        },
        published_in_program: true,
        benefits: [
          {
            id: "9219b356-b063-4b1a-a927-08d8bf4df523",
            name: "",
          },
        ],
        video_presentation:
          "http://192.168.1.10:8000/media/programs/courses/videos/0.cg71wpexhbqvideoplayback_2.mp4",
        published: false,
        blocks: 3,
        items: 11,
        total_duration: 3561.1600000000003,
        color: "#b872dc",
      },
    ],
  });
  const programReducer = useSelector((state) => state.programReducer);

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
                  {courses &&
                    courses.results.map((course, i) => (
                      <CourseCard
                        key={i}
                        onClick={(course) => handleGoToDetails(course)}
                      >
                        <div className="cc-img">
                          <img src={course.picture} alt="" />
                        </div>
                        <div className="cc-info">
                          <div className="cc-info-title">
                            Diseño Web Profesional El Curso Completo, Práctico y
                            desde 0
                          </div>
                          <p className="cc-info-subtitle">
                            HTML5, CSS3, Responsive Design, Adobe XD, SASS,
                            JavaScript, jQuery, Bootstrap 4, WordPress, Git,
                            GitHub
                          </p>
                          <div className="cc-info-instructor">
                            Carlos Arturo Esparza
                          </div>
                          <div className="cc-info-more-info">
                            <span className="ccimi-hours">
                              42,5 horas en total
                            </span>{" "}
                            · <span className="ccimi-clases">254 clases</span>
                          </div>
                        </div>
                        <div className="cc-price">12,99 €</div>
                      </CourseCard>
                    ))}
                </CoursesContainer>
                {/* {isLoading && <span>Cargando...</span>} */}
                {courses && (courses.previous || courses.next) && (
                  <div className="d-flex justify-content-center my-5">
                    {courses.previous ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropleft
                          onClick={() => handleChangePage(courses.previous)}
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
                    {courses.next ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropright
                          onClick={() => handleChangePage(courses.next)}
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
