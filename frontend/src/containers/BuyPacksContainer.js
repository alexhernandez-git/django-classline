import React from "react";
import { Global, css } from "@emotion/core";

import BuyPacks from "src/components/ui/BuyPacks";
const BuyPacksContainer = () => {
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
        <BuyPacks />
      </div>
    </>
  );
};

export default BuyPacksContainer;
