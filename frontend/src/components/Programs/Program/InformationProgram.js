import React, { useState, useContext } from "react";
import "static/assets/styles/components/Users/Teachers/TeachersProfile/TeacherTeach.scss";
import { IconContext } from "react-icons";
import { MdDateRange, MdTimelapse } from "react-icons/md";
import {
  FaChalkboardTeacher,
  FaCheck,
  FaVideo,
  FaPodcast,
  FaListUl,
} from "react-icons/fa";
import { BsFillCollectionPlayFill } from "react-icons/bs";

import { TeachersProfileContext } from "src/context/TeachersProfileContext/TeachersProfileContext";
import { ProgramContext } from "src/context/ProgramContext/ProgramContext";

const InformationCourse = () => {
  const teacherContext = useContext(TeachersProfileContext);

  const [isOpen, setIsOpen] = useState(false);
  return (
    <ProgramContext.Consumer>
      {(programContext) => (
        <div className="teacher-teach border bg-light w-100 p-4 rounded mb-3 text-dark">
          <span className="d-block h4 font-weight-normal text-primary">
            Información
          </span>
          <div className="mt-2">
            {/* {programContext.programState.program.are_videos &&
                        <div className="row pr-3 pl-3 mt-3">
                            <div className="col-sm-6 d-flex align-items-center">
                                <IconContext.Provider value={{
                                    className: "text-primary mr-2",
                                    size: '16px'
                                }}>
                                    <BsFillCollectionPlayFill />

                                </IconContext.Provider>
                                <span className="m-0 text-center text-primary font-weight-normal">Videos</span>

                            </div>
                            <div className="col-sm-6 col-lg-6">
                                    <IconContext.Provider value={{
                                        className: "text-primary mr-2",
                                        size: '16px'
                                    }}>
                                        <FaCheck />

                                    </IconContext.Provider>

                            </div>
                        </div>
                    }
                        {programContext.programState.program.are_playlists &&

                        <div className="row pr-3 pl-3 mt-3">
                            <div className="col-sm-6 d-flex align-items-center">
                                <IconContext.Provider value={{
                                    className: "text-primary mr-2",
                                    size: '16px'
                                }}>
                                    <FaListUl />

                                </IconContext.Provider>
                                <span className="m-0 text-center text-primary font-weight-normal">Playlists</span>

                            </div>
                            <div className="col-sm-6 col-lg-6">
                                    <IconContext.Provider value={{
                                        className: "text-primary mr-2",
                                        size: '16px'
                                    }}>
                                        <FaCheck />

                                    </IconContext.Provider>

                            </div>
                        </div>
    }
                            {programContext.programState.program.are_podcasts &&
                        <div className="row pr-3 pl-3 mt-3">
                            <div className="col-sm-6 d-flex align-items-center">
                                <IconContext.Provider value={{
                                    className: "text-primary mr-2",
                                    size: '16px'
                                }}>
                                    <FaPodcast />

                                </IconContext.Provider>
                                <span className="m-0 text-center text-primary font-weight-normal">Podcasts</span>

                            </div>
                            <div className="col-sm-6 col-lg-6">
                                    <IconContext.Provider value={{
                                        className: "text-primary mr-2",
                                        size: '16px'
                                    }}>
                                        <FaCheck />

                                    </IconContext.Provider>

                            </div>
                        </div>
                    }
            
                        {programContext.programState.program.are_meetups &&
                        <div className="row pr-3 pl-3 mt-3">
                            <div className="col-sm-6 d-flex align-items-center">
                                <IconContext.Provider value={{
                                    className: "text-primary mr-2",
                                    size: '16px'
                                }}>
                                    <FaChalkboardTeacher />

                                </IconContext.Provider>
                                <span className="m-0 text-center text-primary font-weight-normal">Videoconferencias</span>

                            </div>
                            <div className="col-sm-6 col-lg-6">
                                    <IconContext.Provider value={{
                                        className: "text-primary mr-2",
                                        size: '16px'
                                    }}>
                                        <FaCheck />

                                    </IconContext.Provider>

                            </div>
                        </div>
                                } */}
            {programContext.programState.program.are_videos && (
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-sm-6 d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-primary mr-2",
                      size: "16px",
                    }}
                  >
                    <BsFillCollectionPlayFill />
                  </IconContext.Provider>
                  <span className="m-0 text-center text-primary font-weight-normal">
                    Videos
                  </span>
                </div>
                <div className="col-sm-6 col-lg-6">
                  {programContext.programState.program.videos}
                </div>
              </div>
            )}
            {programContext.programState.program.are_playlists && (
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-sm-6 d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-primary mr-2",
                      size: "16px",
                    }}
                  >
                    <FaListUl />
                  </IconContext.Provider>
                  <span className="m-0 text-center text-primary font-weight-normal">
                    Playlists
                  </span>
                </div>
                <div className="col-sm-6 col-lg-6">
                  {programContext.programState.program.playlists}
                </div>
              </div>
            )}
            {programContext.programState.program.are_podcasts && (
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-sm-6 d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-primary mr-2",
                      size: "16px",
                    }}
                  >
                    <FaPodcast />
                  </IconContext.Provider>
                  <span className="m-0 text-center text-primary font-weight-normal">
                    Podcasts
                  </span>
                </div>
                <div className="col-sm-6 col-lg-6">
                  {programContext.programState.program.podcasts}
                </div>
              </div>
            )}
            {programContext.programState.program.are_meetups && (
              <div className="row pr-3 pl-3 mt-3">
                <div className="col-sm-6 d-flex align-items-center">
                  <IconContext.Provider
                    value={{
                      className: "text-primary mr-2",
                      size: "16px",
                    }}
                  >
                    <FaChalkboardTeacher />
                  </IconContext.Provider>
                  <span className="m-0 text-center text-primary font-weight-normal">
                    Videoconferencias
                  </span>
                </div>
                <div className="col-sm-6 col-lg-6">
                  {programContext.programState.program.events}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </ProgramContext.Consumer>
  );
};

export default InformationCourse;
