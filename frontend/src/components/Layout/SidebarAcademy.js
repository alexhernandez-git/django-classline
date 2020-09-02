import styled from "@emotion/styled";
import React from "react";
import {
  FaHome,
  FaPodcast,
  FaUsers,
  FaUserGraduate,
  FaCog,
  FaArrowLeft,
  FaListUl,
  FaVideo,
} from "react-icons/fa";
import { BsFillCollectionPlayFill, BsFillChatDotsFill } from "react-icons/bs";
import { IconContext } from "react-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const { sidebarActive } = props;
  const { pathname } = useLocation();
  const { program } = useParams();
  const programReducer = useSelector((state) => state.programReducer);

  return programReducer.isLoading ? (
    "Cargando..."
  ) : (
    <ContainerSidebar sidebarActive={sidebarActive}>
      {/\/admin\/?/.test(pathname) ? (
        <>
          <Link to={`/academy/${program}/admin`}>
            <SecctionLink active={/\/admin\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaCog />
              </IconContext.Provider>{" "}
              Academia
            </SecctionLink>
          </Link>
          <Link to={`/academy/${program}/admin/accounts`}>
            <SecctionLink active={/\/accounts\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaUsers />
              </IconContext.Provider>{" "}
              Cuentas
            </SecctionLink>
          </Link>
          <Link to={`/academy/${program}/admin/users`}>
            <SecctionLink active={/\/users\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaUserGraduate />
              </IconContext.Provider>{" "}
              Alumnos
            </SecctionLink>
          </Link>
          <Link to={`/academy/${program}/admin/videos`}>
            <SecctionLink active={/\/videos\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <BsFillCollectionPlayFill />
              </IconContext.Provider>{" "}
              Videos
            </SecctionLink>
          </Link>
          <Link to={`/academy/${program}/admin/courses`}>
            <SecctionLink active={/\/courses\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaListUl />
              </IconContext.Provider>{" "}
              Cursos
            </SecctionLink>
          </Link>
          <Link to={`/academy/${program}/admin/podcasts`}>
            <SecctionLink active={/\/podcasts\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaPodcast />
              </IconContext.Provider>{" "}
              Podcasts
            </SecctionLink>
          </Link>

          <Link to={`/academy/${program}/admin/meetups`}>
            <SecctionLink active={/\/meetups\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaVideo />
              </IconContext.Provider>{" "}
              Clases online
            </SecctionLink>
          </Link>

          <Link to={`/academy/${program}/home`}>
            <SecctionLink>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaArrowLeft />
              </IconContext.Provider>{" "}
              Volver a la academia
            </SecctionLink>
          </Link>
        </>
      ) : (
        <>
          <Link
            to={`${
              /\/demo\/?/.test(pathname) ? "/demo" : ""
            }/academy/${program}/home`}
          >
            <SecctionLink active={/\/home\/?$/.test(pathname) && true}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaHome />
              </IconContext.Provider>{" "}
              Pagina Principal
            </SecctionLink>
          </Link>
          {programReducer.program.are_videos && (
            <Link
              to={`${
                /\/demo\/?/.test(pathname) ? "/demo" : ""
              }/academy/${program}/videos`}
            >
              <SecctionLink active={/\/videos\/?$/.test(pathname) && true}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                  }}
                >
                  <BsFillCollectionPlayFill />
                </IconContext.Provider>{" "}
                Videos
              </SecctionLink>
            </Link>
          )}
          {programReducer.program.are_courses && (
            <Link
              to={`${
                /\/demo\/?/.test(pathname) ? "/demo" : ""
              }/academy/${program}/courses`}
            >
              <SecctionLink active={/\/courses\/?$/.test(pathname) && true}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                  }}
                >
                  <FaListUl />
                </IconContext.Provider>{" "}
                Cursos
              </SecctionLink>
            </Link>
          )}
          {programReducer.program.are_podcasts && (
            <Link
              to={`${
                /\/demo\/?/.test(pathname) ? "/demo" : ""
              }/academy/${program}/podcasts`}
            >
              <SecctionLink active={/\/podcasts\/?$/.test(pathname) && true}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                  }}
                >
                  <FaPodcast />
                </IconContext.Provider>{" "}
                Podcasts
              </SecctionLink>
            </Link>
          )}
          {programReducer.program.are_meetups && (
            <Link
              to={`${
                /\/demo\/?/.test(pathname) ? "/demo" : ""
              }/academy/${program}/meetups`}
            >
              <SecctionLink active={/\/meetups\/?$/.test(pathname) && true}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                  }}
                >
                  <FaVideo />
                </IconContext.Provider>{" "}
                Clases online
              </SecctionLink>
            </Link>
          )}
          {programReducer.program.are_videos && !/\/demo\/?/.test(pathname) && (
            <>
              <hr />
              <Link
                to={`${
                  /\/demo\/?/.test(pathname) ? "/demo" : ""
                }/academy/${program}/playlists`}
              >
                <SecctionLink active={/\/playlists\/?$/.test(pathname) && true}>
                  <IconContext.Provider
                    value={{
                      className: "sidebar-icon",
                    }}
                  >
                    <FaListUl />
                  </IconContext.Provider>{" "}
                  Listas de reproducción
                </SecctionLink>
              </Link>
            </>
          )}
          {/* <Link href="/[program]/comunity" as={`/academy/${program}/comunity`}>

                        <SecctionLink active={/\/comunity\/?$/.test(pathname) && true}>

                            <IconContext.Provider value={{

                                className: "sidebar-icon"
                            }}>

                                <FaUsers />
                            </IconContext.Provider>{' '}
Comunidad

</SecctionLink>
                    </Link> */}
        </>
      )}
    </ContainerSidebar>
  );
};
const ContainerSidebar = styled.div`
  transition: all 0.5s ease;

  z-index: 999;
  position: absolute;
  height: 100vh;
  left: 0;
  width: 90px;
  background: #fff;
  grid-area: menu;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    top: 60px !important;
  }

  @media screen and (min-width: 576px) {
    top: 60px !important;

    &:hover {
      width: 300px;
    }
  }

  @media screen and (max-width: 576px) {
    /* top: 145px; */
    top: 60px !important;

    width: 0;
    ${(props) =>
      props.sidebarActive &&
      `
        width: 100%;
        &:hover{
            width: 100%;

        }
        `}
  }
`;
const SecctionLink = styled.span`
  cursor: pointer;
  display: block;
  padding: 1.5rem 3.5rem;
  color: #000;
  min-width: 80rem;

  &:hover {
    background: #e5e5e5;
  }

  ${(props) =>
    props.active &&
    `
        background: #e5e5e5;
        font-weight: bold;
        `}
  .sidebar-icon {
    color: #606060;
    margin-right: 3.2rem;
    width: 2rem;
    text-align: center;
    ${(props) =>
      props.active &&
      `
        color: var(--darkgray);
        `}
  }
`;
const Separator = styled.hr`
  margin: 2rem 0;
  border: 0.1px solid #dfdfdf;
`;
export default Sidebar;
