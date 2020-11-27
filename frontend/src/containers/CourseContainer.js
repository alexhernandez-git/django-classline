import React, { useEffect, useRef, useState } from "react";

import { Global, css } from "@emotion/core";
import CourseLayout from "../components/CourseAcademy/CourseLayout";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import { IconContext } from "react-icons";
import { IoIosShareAlt } from "react-icons/io";
import { MdEmail, MdShare } from "react-icons/md";
import { Modal, Overlay, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";

const CourseContainer = () => {
  const authReducer = useSelector((state) => state.authReducer);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [showTooltip, setShowTooltip] = useState(false);
  const target = useRef(null);
  useEffect(() => {
    if (showTooltip) {
      const timer = setTimeout(() => {
        setShowTooltip(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showTooltip]);
  const textAreaRef = useRef(null);

  function copyToClipboard(e) {
    textAreaRef.current.select();
    document.execCommand("copy");
    // This is just personal preference.
    // I prefer to not show the whole text area selected.
    e.target.focus();
    setShowTooltip(true);
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
            overflow: hidden;
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
      <Layout>
        <div className="header-div">
          <a target="_blank" href={`https://classlineacademy.com`}>
            <div className="h-cl-icon">
              <img src={"/static/assets/img/logo7.PNG"} alt="" />
            </div>
          </a>
          <div className="hbc-student-options">
            <div className="hbc-share-div" onClick={handleShow}>
              <IconContext.Provider
                value={{
                  size: 20,
                  className: "mr-1",
                }}
              >
                <MdShare />
              </IconContext.Provider>
              <span>Compartir</span>
            </div>
          </div>
        </div>
        <div className="course-div">
          <CourseLayout isAcademy={false} />
        </div>
      </Layout>

      <Modal show={show} onHide={handleClose} size="md">
        <Modal.Header className="p-4" closeButton>
          <Modal.Title>
            <span className="font-weight-bold h3">Compartir este curso</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          <div className="share-course-div">
            <div className="sc-copy-link" ref={target}>
              <input
                type="text"
                value={`http://192.168.1.10:8000/academy/EyeelknHcN/course-info/XSvYM8Q9ES`}
                onChange={(e) => e.preventDefault()}
                ref={textAreaRef}
              />

              <button onClick={copyToClipboard}>Copiar</button>
            </div>
            <Overlay
              target={target.current}
              show={showTooltip}
              placement="bottom"
            >
              {(props) => (
                <Tooltip id="overlay-example" {...props}>
                  Enlace copiado
                </Tooltip>
              )}
            </Overlay>
            <a
              href={`mailto:?subject=titulo del curso&body=Creemos que te puede interesar este curso`}
            >
              <button className="sc-mail">
                <IconContext.Provider
                  value={{
                    size: 20,
                    className: "",
                  }}
                >
                  <MdEmail />
                </IconContext.Provider>
              </button>
            </a>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
const Layout = styled.div`
  .header-div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    height: 5rem;
    .h-cl-icon {
      height: 2.5rem;
      cursor: pointer;
      img {
        height: 100%;
      }
    }
    .hbc-student-options {
      .hbc-share-div {
        display: flex;
        align-items: center;
        cursor: pointer;
      }
    }
  }
`;
export default CourseContainer;
