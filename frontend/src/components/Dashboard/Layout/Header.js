import React, { useEffect, useRef, useState } from "react";

import styled from "@emotion/styled";
import {
  FaBars,
  FaUpload,
  FaRegUser,
  FaCog,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { AiOutlinePlus } from "react-icons/ai";

import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IconContext } from "react-icons";
import { IoMdExit } from "react-icons/io";
import { Link } from "react-router-dom";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "src/redux/actions/auth";
import { Modal, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Formik, Form as FormFormik, Field } from "formik";
import { AdminForm } from "src/components/ui/AdminForm";
import { createRating } from "src/redux/actions/rating";

const Header = (props) => {
  const dispatch = useDispatch();
  const profileDiv = useRef();
  const avatarRef = useRef();
  const { push } = useHistory();
  const { pathname } = useLocation();
  const { program } = useParams();
  const authReducer = useSelector((state) => state.authReducer);
  const programReducer = useSelector((state) => state.programReducer);

  const [profileDivOpen, setProfileDivOpen] = useState(false);
  const handleWindowClick = (e) => {
    if (profileDiv.current.contains(e.target)) {
      if (!profileDivOpen) {
        setProfileDivOpen(true);
      } else {
        if (avatarRef.current == e.target) {
          setProfileDivOpen(false);
        }
      }
    } else {
      setProfileDivOpen(false);
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
  const handleLogout = () => {
    if (/\/demo\//.test(pathname)) {
      push(`/program/${program}`);
    } else {
      const dispatchLogout = () => dispatch(logout());
      dispatchLogout();
      push(`/academy/${program}`);
    }
  };
  const isInstructor = () => {
    return authReducer.user.teacher.programs.some((pro) => pro.code == program);
  };
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [rating, setRating] = useState(5);
  useEffect(() => {
    if (authReducer.rating) {
      setRating(authReducer.rating.rating);
    }
  }, [authReducer]);
  return (
    <>
      <ContainerHeader>
        <ContainerLogo>
          <MenuButton
            onClick={props.handleMenuToggle}
            className="d-block d-sm-none"
          >
            <IconContext.Provider
              value={{
                className: "global-class-name",
              }}
            >
              <FaBars />
            </IconContext.Provider>
          </MenuButton>
          <Link to={`/dashboard`}>
            <div className="cursor-pointer d-flex align-items-center">
              <Logo>
                <img
                  src={"../../../static/assets/img/classlinelogosquare.png"}
                  alt="avatar"
                />
              </Logo>

              <span className="ml-4 font-weight-bold d-none d-sm-block">
                Dashboard
              </span>
            </div>
          </Link>
          {/* <CategoriesButton /> */}
        </ContainerLogo>

        {/\/admin\/?/.test(pathname) && (
          <Title css={textEllipsis}>Panel de administración</Title>
        )}
        <ButtonsHeader>
          <div className="position-relative" ref={profileDiv}>
            <Avatar className="cursor-pointer">
              <img
                ref={avatarRef}
                src={
                  authReducer.isAuthenticated &&
                  authReducer.user.profile.picture
                    ? authReducer.user.profile.picture
                    : "../../../static/assets/img/avatar.png"
                }
                alt="avatar"
              />
            </Avatar>

            <ProfileCard
              className={
                profileDivOpen
                  ? "position-absolute bg-white rounded shadow p-2"
                  : "position-absolute bg-white rounded shadow p-2 d-none"
              }
            >
              {/* {!/\/demo\//.test(pathname) && (
                <>
                  <div className="d-flex justify-content-center py-2">
                    {authReducer.isAuthenticated ? (
                      <span>
                        {authReducer.user.first_name == "" &&
                        authReducer.user.last_name == ""
                          ? authReducer.user.username
                          : authReducer.user.first_name +
                            " " +
                            authReducer.user.last_name}
                      </span>
                    ) : (
                      "Cargando..."
                    )}
                  </div>
                </>
              )} */}
              <>
                <hr className="m-2" />
                <Link to={`/dashboard/profile`}>
                  <button className="w-100 d-flex align-items-center justify-content-center">
                    <IconContext.Provider
                      value={{
                        size: 16,
                        className: "global-class-name",
                      }}
                    >
                      <FaRegUser />
                    </IconContext.Provider>
                    <small className="ml-2">Ver perfil</small>
                  </button>
                </Link>
              </>

              <div>
                <button
                  className="w-100 d-flex align-items-center justify-content-center"
                  onClick={handleLogout}
                >
                  <IconContext.Provider
                    value={{
                      className: "global-class-name",
                    }}
                  >
                    <IoMdExit />
                  </IconContext.Provider>
                  <small className="ml-2">Salir</small>
                </button>
              </div>
            </ProfileCard>
          </div>
        </ButtonsHeader>
      </ContainerHeader>
    </>
  );
};
const ContainerHeader = styled.div`
  grid-area: dashboard-header;
  padding: 0 2rem;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  justify-content: space-between;
  grid-gap: 2rem;
  grid-template-areas: "logo title icons";
`;
const ContainerLogo = styled.div`
  grid-area: logo;
  display: flex;
  align-items: center;
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

const MenuButton = styled.button`
  border: none;
  padding: 1rem;
  background: none;
  cursor: pointer;
  font-size: 1.8rem;
  border-radius: 10rem;
  width: 5rem;
  height: 5rem;
  margin-right: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    background: #e7e7e7;
  }
`;
const ButtonsHeader = styled.div`
  grid-area: icons;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  button {
    background: none;
    border: none;
    font-size: 18px;
    padding: 7px 12px;
    border-radius: 100px;
    color: #828282;
    margin-right: 20px;
    cursor: pointer;
    display: flex;
    align-items: center;
  }
  button:hover {
    background: #e7e7e7;
  }
`;

const Avatar = styled.span`
  width: 4rem;
  height: 4rem;
  display: inline-block;
  img {
    vertical-align: top;
    width: 100%;
    border-radius: 10rem;
  }
`;
const ProfileCard = styled.div`
  right: 0;
  top: 50px;
  width: 200px;
  z-index: 1500;
`;
const Title = styled.span`
  grid-area: title;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  font-size: 2rem;
`;
export default Header;
