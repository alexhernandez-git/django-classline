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
  const { program, pack } = useParams();
  const programReducer = useSelector((state) => state.programReducer);
  const studentPackReducer = useSelector((state) => state.studentPackReducer);
  const authReducer = useSelector((state) => state.authReducer);

  return studentPackReducer.isLoading ? (
    "Cargando..."
  ) : (
    <ContainerSidebar sidebarActive={sidebarActive}>
      
          {studentPackReducer.pack.are_videos && (
            <Link
              to={`/pack/${program}/${pack}/videos`}
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
      
          {studentPackReducer.pack.are_podcasts && (
            <Link
            to={`/pack/${program}/${pack}/podcasts`}

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
