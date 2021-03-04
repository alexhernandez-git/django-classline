import React, { useState, useContext } from "react";
import "static/assets/styles/components/Users/Teachers/TeachersProfile/TeacherTeach.scss";
import { IconContext } from "react-icons";
import {
  FaStar,
  FaUser,
  FaChalkboardTeacher,
  FaUniversity,
} from "react-icons/fa";
import { BsFillChatFill } from "react-icons/bs";
import { TeachersProfileContext } from "src/context/TeachersProfileContext/TeachersProfileContext";
import { ProgramContext } from "src/context/ProgramContext/ProgramContext";
import { AppContext } from "src/context/AppContext";
import { Link } from "react-router-dom";
const CourseTeacher = () => {
  return (
    <ProgramContext.Consumer>
      {(programContext) => (
        <div className="teacher-teach w-100 p-4 rounded bg-white text-grey">
          <div className="row pr-3 pl-3">
            <div className="col-sm-4 d-flex d-sm-block">
              <div className="mb-2">
                <img
                  src={
                    programContext.programState.program.instructor &&
                    programContext.programState.program.instructor.profile
                      .picture
                      ? programContext.programState.program.instructor.profile
                          .picture
                      : "../../../../static/assets/img/avatar.png"
                  }
                  alt=""
                  className="rounded-circle"
                  style={{
                    height: "50px",
                    width: "50px",
                  }}
                />
              </div>
              <div className="d-block d-sm-none ml-3"></div>
              <div>
                <div className="d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-dark cursor-ponter",
                      size: "15px",
                    }}
                  >
                    <FaStar />
                  </IconContext.Provider>
                  <small className="text-grey ml-1">
                    Calificacion:{" "}
                    {programContext.programState.program.instructor &&
                      programContext.programState.program.instructor.teacher
                        .rating}
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-dark cursor-ponter",
                      size: "15px",
                    }}
                  >
                    <BsFillChatFill />
                  </IconContext.Provider>
                  <small className="text-grey ml-1">
                    {" "}
                    {programContext.programState.program.instructor &&
                      programContext.programState.program.instructor.teacher
                        .ratings}{" "}
                    reseñas
                  </small>
                </div>

                <div className="d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-dark cursor-ponter",
                      size: "15px",
                    }}
                  >
                    <FaUser />
                  </IconContext.Provider>
                  <small className="text-grey ml-1">
                    {" "}
                    {programContext.programState.program.instructor &&
                      programContext.programState.program.instructor.teacher
                        .students}{" "}
                    estudiantes
                  </small>
                </div>
                <div className="d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-dark cursor-ponter",
                      size: "15px",
                    }}
                  >
                    <FaUniversity />
                  </IconContext.Provider>
                  <small className="text-grey ml-1">
                    {" "}
                    {programContext.programState.program.instructor &&
                      programContext.programState.program.instructor.teacher
                        .academies}{" "}
                    academias
                  </small>
                </div>
                {/* <div className="d-flex align-items-center">
                                    <IconContext.Provider value={{
                                        className: "text-dark cursor-ponter",
                                        size: '15px'
                                    }}>

                                        <FaChalkboardTeacher />
                                    </IconContext.Provider>
                                    <small className="text-grey ml-1">423 videos</small>
                                </div>
                                <div className="d-flex align-items-center">
                                    <IconContext.Provider value={{
                                        className: "text-dark cursor-ponter",
                                        size: '15px'
                                    }}>

                                        <FaChalkboardTeacher />
                                    </IconContext.Provider>
                                    <small className="text-grey ml-1">423 videos</small>
                                </div> */}
              </div>
            </div>
            <div className="col-sm-8">
              <div className="d-block my-3 d-sm-none"></div>
              {programContext.programState.program.instructor && (
                <Link
                  to={`/instructor/${programContext.programState.program.instructor.code}`}
                >
                  <span className="d-block h4 text-primary">
                    {programContext.programState.program.instructor.profile
                      .is_enterprise ? (
                      programContext.programState.program.instructor.profile
                        .company_name
                    ) : (
                      <>
                        {
                          programContext.programState.program.instructor
                            .first_name
                        }{" "}
                        {
                          programContext.programState.program.instructor
                            .last_name
                        }
                      </>
                    )}
                  </span>
                </Link>
              )}
              {/* <span className="d-block h6 text-grey">Instructor de Muay Thai</span> */}
              <small className="new-line">
                {programContext.programState.program.instructor &&
                  programContext.programState.program.instructor.profile
                    .biography}
              </small>
            </div>
          </div>
        </div>
      )}
    </ProgramContext.Consumer>
  );
};

export default CourseTeacher;
