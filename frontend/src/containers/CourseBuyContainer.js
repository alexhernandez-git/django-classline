import styled from "@emotion/styled";
import React from "react";
import { Global, css } from "@emotion/core";
import { IconContext } from "react-icons/lib";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdOndemandVideo } from "react-icons/md";
import { IoMdInfinite } from "react-icons/io";
import { HiOutlineFolderDownload } from "react-icons/hi";

const CourseBuyContainer = () => {
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
            overflow: hidden;
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

      <CourseContainer>
        <div className="header-course">
          <div className="header-course-container">
            <div className="header-course-info">
              <h2 className="course-title">
                Desarrollo Web Completo con HTML5, CSS3, JS AJAX PHP y MySQL
              </h2>
              <h4 className="course-subtitle">
                Aprende Desarrollo Web con este curso 100% práctico, paso a paso
                y sin conocimientos previos, INCLUYE PROYECTO FINAL
              </h4>
              <div>
                <span>Creado por Juan Pablo De la torre Valdez</span>
              </div>
              <div className="course-more-info">
                <small>Fecha de la ultima actualización: 8/2020</small>
                <small>
                  <IconContext.Provider
                    value={{
                      color: "white",
                      className: "course-more-info-icon",
                    }}
                  >
                    <FaGlobeAmericas />
                  </IconContext.Provider>
                  Español
                </small>
              </div>
            </div>
            <div className="header-course-cta">
              <div className="cta-content">
                <div className="cta-image">
                  <img src="/static/assets/img/no-foto.png" alt="" />
                </div>
                <div className="cta-info">
                  <div className="course-price">
                    <span>13,99 €</span>
                    {/* <small></small> */}
                  </div>
                  <div className="course-buttons">
                    <button className="buy-now-btn">Comprar ahora</button>
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
                      54 horas de vídeo bajo demanda
                    </small>
                    <small>
                      <IconContext.Provider
                        value={{
                          color: "",
                          className: "course-content-icon",
                        }}
                      >
                        <HiOutlineFolderDownload />
                      </IconContext.Provider>
                      39 recursos descargables
                    </small>
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
      </CourseContainer>
    </>
  );
};
const CourseContainer = styled.div`
  .header-course {
    background: #1e1e1c;
    color: #fff;
    padding: 3.2rem 1rem;
    .header-course-container {
      max-width: 118.4rem;
      margin: 0 auto;
      display: grid;
      grid-template-columns: 1fr 35rem;
      grid-column-gap: 3rem;
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
          small:first-child {
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
          @media screen and (max-width: 1200px) {
            right: 1rem;
          }
          .cta-image {
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
              .buy-now-btn {
                width: 100%;
                border-radius: 0.4rem;

                padding: 1rem;
                /* border: 1px solid #67c7a4;
                color: #67c7a4 !important;
                background: #fff; */
                color: #fff;
                background: #67c7a4;
                border: none;
                font-weight: bold;
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
    background: #67c7a4;
    padding: 1rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
  }
`;

export default CourseBuyContainer;
