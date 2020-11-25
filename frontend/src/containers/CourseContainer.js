import React, { useEffect, useRef, useState } from "react";

import { Global, css } from "@emotion/core";
import CourseLayout from "../components/CourseAcademy/CourseLayout";
import styled from "@emotion/styled";
const CourseContainer = () => {
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
      <Layout>
        <div className="header-div">Header</div>
        <div className="course-div">
          <CourseLayout isAcademy={false} />
        </div>
      </Layout>
    </>
  );
};
const Layout = styled.div``;
export default CourseContainer;
