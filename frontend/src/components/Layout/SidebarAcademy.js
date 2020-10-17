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
  FaChalkboardTeacher,
  FaPhotoVideo,
  FaBox,
} from "react-icons/fa";
import { BsFillCollectionPlayFill, BsFillChatDotsFill } from "react-icons/bs";
import { MdFolderShared, MdFolder, MdForum } from "react-icons/md";

import { IconContext } from "react-icons";
import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const Sidebar = (props) => {
  const { sidebarActive } = props;
  const { pathname } = useLocation();
  const { program } = useParams();
  const programReducer = useSelector((state) => state.programReducer);
  const authReducer = useSelector((state) => state.authReducer);
  const isInstructorButNotAdmin = () =>{
    if ( 
      authReducer.user.teacher.instructor_in.some(
        (allowed_program) =>allowed_program.program.code == program
        )
        &&
        !authReducer.user.teacher.programs.some(
          (program) => program.code == program
          )
    ){
      return true
    }else{
      return false
    }
  }
  return programReducer.isLoading ? (
    "Cargando..."
  ) : (
    <ContainerSidebar sidebarActive={sidebarActive}>
      {/\/admin\/?/.test(pathname) ? (
        <>
          {!isInstructorButNotAdmin() &&
          <>
          <Link to={`/academy/${program}/admin`}>
            <SecctionLink active={/\/admin\/?$/.test(pathname)}>
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
          <Link to={`/academy/${program}/admin/packs`}>
            <SecctionLink active={/\/packs\/?$/.test(pathname)}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaBox />
              </IconContext.Provider>{" "}
              Packs
            </SecctionLink>
          </Link>
          
          <Link to={`/academy/${program}/admin/instructors`}>
            <SecctionLink active={/\/instructors\/?$/.test(pathname)}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaChalkboardTeacher />
              </IconContext.Provider>{" "}
              Instructores
            </SecctionLink>
          </Link>
          <Link to={`/academy/${program}/admin/accounts`}>
            <SecctionLink active={/\/accounts\/?$/.test(pathname)}>
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
          </>
          }
          <Link to={`/academy/${program}/admin/users`}>
            <SecctionLink active={/\/users\/?$/.test(pathname)}>
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
            <SecctionLink active={/\/videos\/?$/.test(pathname)}>
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
            <SecctionLink active={/\/courses\/?$/.test(pathname)}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                }}
              >
                <FaListUl />
              </IconContext.Provider>{" "}
              Playlists
            </SecctionLink>
          </Link>
          <Link to={`/academy/${program}/admin/podcasts`}>
            <SecctionLink active={/\/podcasts\/?$/.test(pathname)}>
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
            <SecctionLink active={/\/meetups\/?$/.test(pathname)}>
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
          <Link to={`/academy/${program}/admin/docs`}>
            <SecctionLink active={/\/docs\/?$/.test(pathname)}>
              <IconContext.Provider
                value={{
                  className: "sidebar-icon",
                  size: 25,
                }}
              >
                <MdFolder />
              </IconContext.Provider>{" "}
              Recursos
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
            <SecctionLink active={/\/home\/?$/.test(pathname)}>
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
              <SecctionLink active={/\/videos\/?$/.test(pathname)}>
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
          {programReducer.program.are_admin_playlists && (
            <Link
              to={`${
                /\/demo\/?/.test(pathname) ? "/demo" : ""
              }/academy/${program}/courses`}
            >
              <SecctionLink active={/\/courses\/?$/.test(pathname)}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                  }}
                >
                  <FaListUl />
                </IconContext.Provider>{" "}
                Playlists
              </SecctionLink>
            </Link>
          )}
          {programReducer.program.are_podcasts && (
            <Link
              to={`${
                /\/demo\/?/.test(pathname) ? "/demo" : ""
              }/academy/${program}/podcasts`}
            >
              <SecctionLink active={/\/podcasts\/?$/.test(pathname)}>
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
              <SecctionLink active={/\/meetups\/?$/.test(pathname)}>
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
          {programReducer.program.are_docs && (
            <Link
              to={`${
                /\/demo\/?/.test(pathname) ? "/demo" : ""
              }/academy/${program}/docs`}
            >
              <SecctionLink active={/\/docs\/?$/.test(pathname)}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                    size: 25,
                  }}
                >
                  <MdFolder />
                </IconContext.Provider>{" "}
                Recursos
              </SecctionLink>
            </Link>
          )}

          <hr />
          {programReducer.program.are_forum  && (
            <Link
              to={
                /\/demo\/?/.test(pathname) ? pathname :`/academy/${program}/forum`
              }
            >
              <SecctionLink active={/\/forum\/?$/.test(pathname)}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                    size: 25,
                  }}
                >
                  <MdForum />
                </IconContext.Provider>{" "}
                Foro
              </SecctionLink>
            </Link>
          )}
          {programReducer.program.are_videos  && (
            <Link
              to={            
                /\/demo\/?/.test(pathname) ? pathname :`/academy/${program}/playlists`
              }
            >
              <SecctionLink active={/\/playlists\/?$/.test(pathname)}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                  }}
                >
                  <FaListUl />
                </IconContext.Provider>{" "}
                Mis playlists
              </SecctionLink>
            </Link>
          )}
          {programReducer.program.are_docs  && (
            <Link
              to={
                /\/demo\/?/.test(pathname) ? pathname :`/academy/${program}/shared-docs`
              }
            >
              <SecctionLink active={/\/shared-docs\/?$/.test(pathname)}>
                <IconContext.Provider
                  value={{
                    className: "sidebar-icon",
                    size: 25,
                  }}
                >
                  <MdFolderShared />
                </IconContext.Provider>{" "}
                Compartido conmigo
              </SecctionLink>
            </Link>
          )}
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
  overflow-x: hidden;
  overflow-y: auto;
  top: 60px !important;

  height: calc(100vh - 60px);
  @media screen and (min-width: 768px) {
    top: 60px !important;
  }

  @media screen and (min-width: 576px) {
    &:hover {
      width: 300px;
    }
  }

  @media screen and (max-width: 576px) {
    /* top: 145px; */
    top: 60px !important;
    overflow-y: scroll;
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
