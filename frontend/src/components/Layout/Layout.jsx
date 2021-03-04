import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <div style={{ overflow: "hidden", minHeight: "calc(100vh - 70px)" }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
