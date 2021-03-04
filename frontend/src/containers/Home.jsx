import React, { useState, useEffect, useContext } from "react";
import WelcomeLayout from "src/components/Layout/WelcomeLayout";
import TeachersCarousel from "src/components/Users/Teachers/TeachersCarousel";
import MainCategories from "src/components/Categories/MainCategories";
import "static/assets/styles/containers/Home.scss";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { useParams, useHistory } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Home = () => {
  const { token, email } = useParams();
  const { push } = useHistory();
  const appContext = useContext(AppContext);
  useEffect(() => {
    const verify = async (token) => {
      if (token) {
        await appContext.verifyAccount(token);
        push("/");
      }
    };
    verify(token);
  }, [token]);
  useEffect(() => {
    const validateChangeEmail = async (email) => {
      if (email) {
        await appContext.validateChangeEmail(email);
        push("/");
      }
    };
    validateChangeEmail(email);
  }, [email]);
  return (
    <div className="text-grey">
      <WelcomeLayout />
      {/* <TeachersCarousel />
            <div className="banner-home mt-5 border-danger bg-danger box-shadow">
                <h4 className="h2">Nunca pares de aprender</h4>
                <p>Y aprende como nunca lo has hecho</p>
                <Link to="/teachers">
                    <Button variant="outline-light">Empezar ahora</Button>
                </Link>
            </div>
            <MainCategories />
            <div className="banner-instructor">
                <div className="banner-instructor-grid container">
                    <div className="position-relative">
                        <img src="https://i.udemycdn.com/home/non-student-cta/udlite-lohp-promo-teacher.jpg" alt="" />

                    </div>
                    <div className="banner-instructor-text">
                        <h4 className="h2">Conviertete en instructor</h4>
                        <p>Y enseña como nunca lo has hecho</p>
                        <Button variant="outline-info">Empezar ahora</Button>
                    </div>
                </div>
            </div> */}
    </div>
  );
};

export default Home;
