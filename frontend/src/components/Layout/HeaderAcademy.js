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
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IconContext } from "react-icons";
import { IoMdExit } from "react-icons/io";
import { Link } from "react-router-dom";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { textEllipsis } from "../ui/TextEllipsis";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "src/redux/actions/auth";
import { Modal, Button } from "react-bootstrap";
import StarRatings from "react-star-ratings";
import { Formik, Form as FormFormik, Field } from "formik";
import { AdminForm } from "src/components/ui/AdminForm";
import { createRating } from "../../redux/actions/rating";

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
          {!programReducer.isLoading && programReducer.program ? (
            <Link
              to={
                !/\/demo\//.test(pathname)
                  ? `/academy/${program}/home`
                  : pathname
              }
            >
              <div className="cursor-pointer d-flex align-items-center">
                <Logo>
                  <img
                    src={
                      !programReducer.isLoading &&
                      programReducer.program.instructor.profile.picture
                        ? programReducer.program.instructor.profile.picture
                        : "../../../static/assets/img/no-foto-square.png"
                    }
                    alt="avatar"
                  />
                </Logo>

                <span className="ml-4 font-weight-bold d-none d-sm-block">
                  {programReducer.program.title && programReducer.program.title}
                </span>
              </div>
            </Link>
          ) : (
            "Cargando..."
          )}

          {/* <CategoriesButton /> */}
        </ContainerLogo>

        {/\/admin\/?/.test(pathname) && (
          <Title css={textEllipsis}>Panel de administración</Title>
        )}

        <ButtonsHeader>
          {!/\/demo\//.test(pathname) &&
            !authReducer.user.teacher.programs.some(
              (programSome) => programSome.code == program
            ) && (
              <>
                {!authReducer.rating ? (
                  <button onClick={handleShow}>
                    <small className="d-none d-sm-block mr-2">Puntuar</small>
                    <IconContext.Provider
                      value={{ className: "global-class-name" }}
                    >
                      <FaRegStar />
                    </IconContext.Provider>
                  </button>
                ) : (
                  <button onClick={handleShow}>
                    <IconContext.Provider
                      value={{ className: "global-class-name" }}
                    >
                      <FaStar />
                    </IconContext.Provider>
                  </button>
                )}
              </>
            )}

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
              {!/\/demo\//.test(pathname) && (
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
              )}
              {!/\/demo\//.test(pathname) && (
                <>
                  <hr className="m-2" />
                  {authReducer.user && authReducer.user.created_account ? (
                    <Link to={`/academy/${program}/profile`}>
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
                  ) : (
                    <Link to={`/myzone/student`} target="_blank">
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
                  )}
                </>
              )}

              {!/\/demo\//.test(pathname) &&
                authReducer.user &&
                isInstructor() && (
                  <>
                    <Link to={`/academy/${program}/admin`}>
                      <button className="w-100 d-flex align-items-center justify-content-center">
                        <IconContext.Provider
                          value={{
                            size: 16,
                            className: "global-class-name",
                          }}
                        >
                          <FaCog />
                        </IconContext.Provider>
                        <small className="ml-2">Admin Panel</small>
                      </button>
                    </Link>
                    <hr className="m-2" />
                  </>
                )}
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
      <Modal
        show={show}
        onHide={handleClose}
        centered
        size="lg"
        className="text-grey border-0"
      >
        <Formik
          enableReinitialize={true}
          initialValues={{
            comment: authReducer.rating ? authReducer.rating.comment : "",
          }}
          onSubmit={(values) => {
            const ratingValues = { ...values, rating };
            const dispatchCreateRating = (values) =>
              dispatch(createRating(values));
            dispatchCreateRating(ratingValues);
            handleClose();
          }}
        >
          {(props) => {
            return (
              <>
                <FormFormik>
                  <Modal.Header closeButton className="border-0"></Modal.Header>
                  <Modal.Body className="bg-white">
                    <AdminForm className="text-center">
                      <label htmlFor="comment">Puntuación</label>

                      <div className="d-flex justify-content-center mb-4">
                        <StarRatings
                          rating={rating}
                          changeRating={(rating) => setRating(rating)}
                          starRatedColor="#e5c07b"
                          numberOfStars={5}
                          starHoverColor="#e5c07b"
                          starDimension="50px"
                          starSpacing="0px"
                          name="rating"
                        />
                      </div>

                      <label htmlFor="comment">Comentario</label>
                      <Field
                        component="textarea"
                        type="texarea"
                        name="comment"
                        id="comment"
                        cols="30"
                        placeholder="Comentario..."
                      />
                    </AdminForm>
                  </Modal.Body>
                  <Modal.Footer className="border-0">
                    <ButtonCustom type="submit">Guardar</ButtonCustom>
                  </Modal.Footer>
                </FormFormik>
              </>
            );
          }}
        </Formik>
      </Modal>
    </>
  );
};
const ContainerHeader = styled.div`
  grid-area: header;
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
