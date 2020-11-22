import styled from "@emotion/styled";
import React, { useState, useEffect } from "react";
import { Global, css } from "@emotion/core";
import { IconContext } from "react-icons/lib";
import { FaGlobeAmericas } from "react-icons/fa";
import { MdCheck, MdOndemandVideo } from "react-icons/md";
import { IoMdInfinite } from "react-icons/io";
import { HiOutlineFolderDownload } from "react-icons/hi";
import BlockItemsListContent from "src/components/ui/BlockItemsListContent";
const CourseBuyContainer = () => {
  const [benefits, setBenefits] = useState([
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Convertir y crear sus propios diseños en páginas web",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Escribir código JavaScript y jQuery",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Entender como funciona JavaScript y PHP",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit:
        "Aprende AJAX, para crear páginas web dínamicas que cargaran información sin recargar la página",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Crear aplicaciones CRUD con PHP y MySQL",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Crear un área de administración con AdminLTE, PHP y MySQL",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Crear páginas web con HTML y CSS",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Crear sitios web dínamicos con PHP y MYSQL",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Aplicar a un empleo de Desarrollador Web Junior",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Agregar pagos de PayPal a tus sitios web",
    },
    {
      id: Math.random().toString(36).substring(7),
      benefit: "Crear aplicaciones seguras con PHP, Ajax y MySQL",
    },
  ]);
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
  const [showBlockInformation, setShowBlockInformation] = useState(false);
  const toggleShowBlockInformation = () => {
    setShowBlockInformation(!showBlockInformation);
  };
  const [course, setCourse] = useState({
    id: "f9914302-38df-4276-8c08-9f4e38c3ef61",
    code: "XSvYM8Q9ES",
    title: "fweafwaewfe",
    subtitle: "",
    description:
      "<p>fewafweaaefwoahfewoipwafepioawef</p><p>awefoieowaefophweaoipfew</p><p><strong>fewaafweoewfj0òawefjfeojwaeopfawe</strong></p><ul><li><strong>feawfaewpkwepòff</strong></li><li><strong>afwepoijaefwàfwej</strong></li><li><strong>feawpojaewfaefwijawef</strong></li></ul>",
    course_language: null,
    picture:
      "http://192.168.1.10:8000/media/programs/courses/pictures/0.1akcsasauk20.jlbvge05f9pchunkbase_-7339840784560636648.png",
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
        picture: null,
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
    video_presentation: null,
    published: false,
    blocks: [
      {
        id: "c5c928f0-9128-419b-a6b0-7a64a8a04287",
        block: {
          id: "c3ebefd5-de46-46ee-b8a1-e7426e82f672",
          code: "C6mC8CLX8g",
          name: "fewfewfewefwaefwa",
          picture:
            "/media/programs/courses/pictures/0.2g05hpcowo90.ytlmuaazxvp0_7.jpg",
          description: null,
          items: [
            {
              id: "48c8d911-d847-423f-b9d7-8b61c4b825dd",
              item: {
                id: "3482c168-66af-4f48-b3eb-099c5eefb72d",
                code: "D2FDfbCN5U",
                name: "fewaeawffewa",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "7fd29113-c351-42ef-8f2a-7dd99cdc2b09",
                  type_choices: "VI",
                  video:
                    "/media/programs/courses/contents/videos/0.vibyopomupevideoplayback_6.mp4",
                  text: "",
                  duration: 447.11,
                  mega_bytes: 94.44,
                  name: "videoplayback (6).mp4",
                  description: "<p>fewfeawfefew</p>",
                  item: "3482c168-66af-4f48-b3eb-099c5eefb72d",
                },
                item_viewed: null,
                materials: [],
              },
              position: 0,
            },
            {
              id: "8588cfc3-2a7e-4806-9803-963ebafaf69a",
              item: {
                id: "2daa398a-d265-406a-b74b-3428b2c0d3fd",
                code: "8puMLKBKyk",
                name: "feweffewafew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "3e21b3ab-cd21-48f2-a3dd-fb64c57757f0",
                  type_choices: "TX",
                  video: null,
                  text: "<p>feweawefwfew</p>",
                  duration: null,
                  mega_bytes: null,
                  name: null,
                  description: "",
                  item: "2daa398a-d265-406a-b74b-3428b2c0d3fd",
                },
                item_viewed: null,
                materials: [],
              },
              position: 1,
            },
            {
              id: "8455f0d0-2d56-4d91-9990-0e506bf2d237",
              item: {
                id: "97bc236f-aa4a-4d8d-9f8d-22b0983f5df0",
                code: "YsWrSF2Sgg",
                name: "feeawfefwfew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "2cdb7b61-9ee0-4ab9-b293-bc74181a3cc1",
                  type_choices: "VI",
                  video:
                    "/media/programs/courses/contents/videos/0.kdfa2qkgoa8_Errores_a_evitar_antes_de_ir_a_yoga.mp4",
                  text: "",
                  duration: 623.64,
                  mega_bytes: 32.8,
                  name: "8 Errores a evitar antes de ir a yoga.mp4",
                  description: "<p>aewfeawefwafewfew</p>",
                  item: "97bc236f-aa4a-4d8d-9f8d-22b0983f5df0",
                },
                item_viewed: null,
                materials: [],
              },
              position: 2,
            },
          ],
        },
        position: 0,
      },
      {
        id: "519e2467-1588-4314-89d9-59c9f6d6777b",
        block: {
          id: "b0dcbde7-74e9-4236-8c96-1dfd3f67b6b5",
          code: "8icMYAGoIY",
          name: "efwefwaaefaw",
          picture:
            "/media/programs/courses/pictures/0.wqqfqr75c30.60a9xlogr360_11.jpg",
          description: "efwaaefwaewfa",
          items: [
            {
              id: "3630be66-3c4c-432d-a88f-f470c287031f",
              item: {
                id: "d1f3bf67-5454-4b4e-8e38-4106caf757d2",
                code: "UFZDNMBaUS",
                name: "efwafewafefew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "657a4303-3ed6-4a67-8bd5-08d0f2190904",
                  type_choices: "VI",
                  video:
                    "/media/programs/courses/contents/videos/0.48kabcwxfjgvideoplayback_2.mp4",
                  text: "",
                  duration: 828.74,
                  mega_bytes: 244.19,
                  name: "videoplayback (2).mp4",
                  description: "<p>fewfweafewfewfew</p>",
                  item: "d1f3bf67-5454-4b4e-8e38-4106caf757d2",
                },
                item_viewed: null,
                materials: [
                  {
                    id: "ce19a786-bb9a-4c4d-a9a0-c6cc1872f8bf",
                    item: "d1f3bf67-5454-4b4e-8e38-4106caf757d2",
                    file:
                      "/media/programs/courses/contents/materials/0.9t90b1jevlk0.drat9i155cn0.8x2lrq5q4packeditor5_1.zip",
                    course: "f9914302-38df-4276-8c08-9f4e38c3ef61",
                    name: "0.drat9i155cn0.8x2lrq5q4packeditor5 (1).zip",
                    mega_bytes: 1.0858840942382812,
                  },
                  {
                    id: "8d7c0b45-0c95-4125-b801-72b0da39a13c",
                    item: "d1f3bf67-5454-4b4e-8e38-4106caf757d2",
                    file:
                      "/media/programs/courses/contents/materials/0.4r0wjy42n1wXray_Ultimate_1.17_v4.0.2.zip",
                    course: "f9914302-38df-4276-8c08-9f4e38c3ef61",
                    name: "Xray_Ultimate_1.17_v4.0.2.zip",
                    mega_bytes: 0.41114234924316406,
                  },
                ],
              },
              position: 3,
            },
            {
              id: "75c8ea86-acca-4ae0-923e-d7a4dfec2cbc",
              item: {
                id: "40e35995-3582-4e3f-afee-41d07c8f038a",
                code: "R9OGuoBXuF",
                name: "efwaeawfewaew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "d88431f3-385d-4ee9-90f0-939aa96f0e8e",
                  type_choices: "TX",
                  video: null,
                  text: "<p>fewafeawfewafew</p>",
                  duration: null,
                  mega_bytes: null,
                  name: null,
                  description: "",
                  item: "40e35995-3582-4e3f-afee-41d07c8f038a",
                },
                item_viewed: null,
                materials: [],
              },
              position: 4,
            },
            {
              id: "329b971b-418f-47c6-aa8a-0d6df138487d",
              item: {
                id: "ab58da3c-036d-4ee2-ab24-45f85c1c66e3",
                code: "9lPG6QKqpN",
                name: "efwfewefwaefw",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "bcf85fc3-e4cf-4887-b5e0-a55c2f227627",
                  type_choices: "VI",
                  video:
                    "/media/programs/courses/contents/videos/0.3q1ak421np9videoplayback_3.mp4",
                  text: "",
                  duration: 305.52,
                  mega_bytes: 57.68,
                  name: "videoplayback (3).mp4",
                  description: "",
                  item: "ab58da3c-036d-4ee2-ab24-45f85c1c66e3",
                },
                item_viewed: null,
                materials: [],
              },
              position: 5,
            },
          ],
        },
        position: 1,
      },
      {
        id: "61104d11-8141-47d1-8b4b-dc3ef1d2d68f",
        block: {
          id: "8349d9ad-9038-422d-ab4a-e752e84b5ea2",
          code: "LNRjoRNPy6",
          name: "fwaefewawefafew",
          picture:
            "/media/programs/courses/pictures/0.vrmoopw5t90.g11pntign6Webp.net-resizeimage_9.png",
          description: null,
          items: [
            {
              id: "82bfc104-bc1e-4208-b2ee-5f6366c85de2",
              item: {
                id: "0d20004f-c4b4-4be4-b990-318cdb5c38e8",
                code: "TFKqo5x0VD",
                name: "fewfewafewfew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "b15c9e58-3c92-4c5d-8d57-7e28370939d8",
                  type_choices: "TX",
                  video: null,
                  text: "<p>ewfaewfew</p>",
                  duration: null,
                  mega_bytes: null,
                  name: null,
                  description: "",
                  item: "0d20004f-c4b4-4be4-b990-318cdb5c38e8",
                },
                item_viewed: null,
                materials: [],
              },
              position: 6,
            },
            {
              id: "31df3864-8ea3-435c-983c-7fc9cbaf2c0c",
              item: {
                id: "fe188d60-c865-4a1b-b1a8-c2b901108d4c",
                code: "ZGjMJPc5Kc",
                name: "efwafeaefwew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "7268715e-8cf2-475f-9eb0-03c93dd1061f",
                  type_choices: "VI",
                  video:
                    "/media/programs/courses/contents/videos/0.0hfk3twu77k54_Recetas_de_Pastas_Saludables_Para_Adelgazar_Caseras__F%C3%A1ciles.mp4",
                  text: "",
                  duration: 416.59000000000003,
                  mega_bytes: 93.97,
                  name:
                    "4 Recetas de Pastas Saludables Para Adelgazar (Caseras & Fáciles).mp4",
                  description: "",
                  item: "fe188d60-c865-4a1b-b1a8-c2b901108d4c",
                },
                item_viewed: null,
                materials: [],
              },
              position: 7,
            },
            {
              id: "87cff982-7911-4f86-97c9-1b9da6603ed2",
              item: {
                id: "78cfce69-8cc2-4b41-aab9-b4841a69aa61",
                code: "FKZbgcewJl",
                name: "efwwefafewfew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "c3749a74-bae2-4a99-906f-37a0d9964b17",
                  type_choices: "VI",
                  video:
                    "/media/programs/courses/contents/videos/0.d5w56l7v779videoplayback_4.mp4",
                  text: "",
                  duration: 705.5,
                  mega_bytes: 192.79,
                  name: "videoplayback (4).mp4",
                  description: "",
                  item: "78cfce69-8cc2-4b41-aab9-b4841a69aa61",
                },
                item_viewed: null,
                materials: [],
              },
              position: 8,
            },
            {
              id: "d3fe9afe-86d5-4cc4-89d8-32f6da45f57c",
              item: {
                id: "50025a02-907f-47c8-90e1-716e6967eb8e",
                code: "UPdBh3OHfG",
                name: "fewfewfew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "301f5c35-e94a-4a10-b7a5-350354bbc0db",
                  type_choices: "TX",
                  video: null,
                  text: "<p>ewefefefewew</p>",
                  duration: null,
                  mega_bytes: null,
                  name: null,
                  description: "",
                  item: "50025a02-907f-47c8-90e1-716e6967eb8e",
                },
                item_viewed: null,
                materials: [],
              },
              position: 9,
            },
            {
              id: "ff80565e-e697-4984-be10-3560abe35314",
              item: {
                id: "66f2996b-f9c1-45e5-a7d1-eef706cb6f5f",
                code: "lgc6Q8gCGL",
                name: "fewfeafew",
                type_choices: "LE",
                is_private: false,
                content: {
                  id: "457c1ba8-612b-4319-80cf-df7eed92994d",
                  type_choices: "VI",
                  video:
                    "/media/programs/courses/contents/videos/0.m20uhh2qlot1ST_YOGA_FLOW_IN_MY_NEW_HOME_.mp4",
                  text: "",
                  duration: 234.06,
                  mega_bytes: 16.29,
                  name: "1ST YOGA FLOW IN MY NEW HOME =).mp4",
                  description: "",
                  item: "66f2996b-f9c1-45e5-a7d1-eef706cb6f5f",
                },
                item_viewed: null,
                materials: [],
              },
              position: 10,
            },
          ],
        },
        position: 2,
      },
    ],
    blocks_count: 3,
    items_count: 11,
    total_duration: 3561.1600000000003,
    color: "#67c7a4",
  });

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
        <div className="course-info-container">
          <div className="course-info-div">
            <div className="course-benefits">
              <span className="course-benefits-title">Lo que aprenderás</span>
              <div className="course-benefits-list">
                {benefits.map((benefit) => (
                  <div className="benefit" key={benefit.id}>
                    <IconContext.Provider
                      value={{
                        color: "",
                        className: "mt-1",
                      }}
                    >
                      <MdCheck />
                    </IconContext.Provider>
                    <span>{benefit.benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="course-content-list">
              <span className="course-content-list-title">
                Contenido del curso
              </span>
              <div className="resum-course-content">
                <small>
                  {course.blocks_count} secciones <b>·</b> {course.items_count}{" "}
                  clases <b>·</b> {msToHMSRead(course.total_duration)}
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
                <span className="course-description-title">Descripción</span>

                <div className="course-description-content">
                  <small
                    dangerouslySetInnerHTML={{
                      __html: course.description,
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
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
  }
`;

export default CourseBuyContainer;
