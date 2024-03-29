import React from "react";
import { Global, css } from "@emotion/core";

import BookMeetups from "src/components/ui/BookMeetups";
const BookClassContainer = () => {
  return (
    <>
      <Global
        styles={css`
          :root {
            --darkgray: #323840;
            --gradient: linear-gradient(45deg, #2e6a89, #56b389);
            --border: 1px solid #ddd;
            --left-msg-bg: #ececec;
            --right-msg-bg: #579ffb;
            --green: #56b389;
            --blue: #94c2ed;
            --orange: #e38968;
            --gray: #92959e;
            --purple: #684e73;
          }
          * {
            padding: 0;
            margin: 0;
          }
          html {
            font-size: 62.5%;
            box-sizing: border-box;
          }
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            font-family: "Open Sans", sans-serif;
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
          a {
            text-decoration: none;
            color: #000;
          }
          a:hover {
            text-decoration: none;
            color: #000;
          }

          input:focus,
          button:focus,
          a:focus {
            outline: none;
          }
          /* Utils */
          .cursor-pointer {
            cursor: pointer;
          }
        `}
      />

      {/* <Header className="p-3 shadow">
        <ContainerLogo className="cursor-pointer d-flex align-items-center">
          <Logo>
            <img
              src={
                !programReducer.isLoading &&
                programReducer.program.instructor.profile.picture
                  ? programReducer.program.instructor.profile.picture
                  : "../../static/assets/img/no-foto.png"
              }
              alt="avatar"
            />
          </Logo>
          <span className="ml-3 font-weight-bold">
            {!programReducer.isLoading && programReducer.program.title}
          </span>
        </ContainerLogo>
      </Header> */}
      <div className="py-5 px-3">
        <BookMeetups />
        <div className="d-flex justify-content-end mr-5">
          <a href="https://classlineacademy.com/" target="_blank">
            <img height="25" src="../../../static/assets/img/logo7.PNG" />
          </a>
        </div>
      </div>
    </>
  );
};

export default BookClassContainer;
