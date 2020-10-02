import React, { useState, useRef, useEffect } from "react";
import { Global, css } from "@emotion/core";
import styled from "@emotion/styled";

import Header from "./HeaderAcademy";
import Sidebar from "./SidebarAcademy";
import ScrollToTop from "src/hooks/ScrollToTop";
import { useCurrentWidth } from "src/hooks/useCurrentWidth";

const Layout = (props) => {
  const width = useCurrentWidth();
  const [sidebarActive, setSidebarActive] = useState(false);

  useEffect(() => {
    if (width <= 768) {
      setSidebarActive(false);
    }
  }, [width]);

  const handleMenuToggle = () => {
    setSidebarActive((sidebarActive) => {
      if (sidebarActive) {
        return false;
      } else {
        return true;
      }
    });
  };
  const closeMenu = () => {
    setSidebarActive((sidebarActive) => {
      if (sidebarActive) {
        return false;
      }
    });
  };

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
          *,
          *:before,
          *:after {
            box-sizing: inherit;
          }
          body {
            font-size: 1.6rem;
            font-family: "Open Sans", sans-serif;
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
        `}
      />

      <ScrollToTop setActive closeMenu={closeMenu} />
      <MainContainer sidebarActive={sidebarActive} closeMenu={closeMenu}>
        <Header handleMenuToggle={handleMenuToggle} />
        <Sidebar sidebarActive={sidebarActive} />
        {props.children}
      </MainContainer>
    </>
  );
};
const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 60px auto;
  grid-template-columns: minmax(90px, 90px) auto;
  grid-template-areas:
    "header header"
    "menu content";

  @media screen and (max-width: 576px) {
    grid-template-areas:
      "header header"
      "content content";
    grid-template-columns: 100% auto;
  }
  /* ${(props) =>
    props.sidebarActive &&
    "grid-template-columns: minmax(300px, 18%) auto!important"} */
`;

export default Layout;
