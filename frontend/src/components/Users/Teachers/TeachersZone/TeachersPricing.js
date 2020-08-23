import React, { useState, useContext } from "react";
import Tab from "react-bootstrap/Tab";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import "static/assets/styles/components/Users/Teachers/TeachersZone/Courses/TeachersCourses.scss";
import { Link } from "react-router-dom";
import ProgramCard from "src/components/Layout/ProgramCard";
import { AppContext } from "src/context/AppContext";
import { IconContext } from "react-icons";
import axios from "axios";
import Pricing from "../../../ui/Pricing";
import useCheckAreDiscount from "src/hooks/useCheckAreDiscount";

const TeachersPricing = () => {
  const [areDiscount, fetchDiscount] = useCheckAreDiscount();

  // async function createProgram() {
  //     const data = {
  //         title: '',
  //         subtitle: '',
  //         description: '',
  //         benefits: [],
  //         events: [],
  //         program_price: null,
  //         program_language: null
  //     }
  //     await axios
  //         .post(`/api/programs/`, data, appContext.tokenConfig(appContext.userProfile))
  //         .then(res => {
  //             console.log(res)
  //             appContext.newProgram(res.data)
  //         })
  //         .catch(err => {
  //             console.log(err.response)

  //         });
  // }

  return (
    <AppContext.Consumer>
      {(appContext) => (
        <div className="container teacher-my-course pt-5 text-grey">
          <div className="d-sm-flex justify-content-start">
            <div>
              <span className="h3 d-block mb-0 text-dark">Pricing</span>
              <span>Dale a tus alumnos acceso a la academia</span>
            </div>
          </div>
          <div className="my-3">
            <Pricing useCheckAreDiscount={{ areDiscount, fetchDiscount }} />
          </div>
        </div>
      )}
    </AppContext.Consumer>
  );
};

export default TeachersPricing;
