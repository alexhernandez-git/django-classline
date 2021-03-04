import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { ProgramContext } from "src/context/ProgramContext/ProgramContext";
import { AppContext } from "src/context/AppContext";
import { FaRegPlayCircle, FaCircle } from "react-icons/fa";
import { IconContext } from "react-icons";

const CourseCard = (props) => {
  const { classRoom } = props;
  const { pathname } = useLocation();
  const programContext = useContext(ProgramContext);
  const appContext = useContext(AppContext);
  const [active, setActive] = useState(false);

  const isBuyed = () => {
    return appContext.userProfile.user.programs.some(
      (program) => program.id == programContext.programState.program.id
    );
  };
  const isInstructor = () => {
    return (
      programContext.programState.program.instructor.id ==
      appContext.userProfile.user.id
    );
  };
  return (
    <AppContext.Consumer>
      {(appContext) => (
        <ProgramContext.Consumer>
          {(programContext) => (
            <div>
              <div className="px-3 course-card">
                <div className="shadow w-100 p-1 rounded bg-white mb-3">
                  <div className="w-100">
                    {active ? (
                      <div className="card-img-container">
                        <video
                          className="img-card"
                          preload="auto"
                          controls
                          variant="top"
                          autoPlay
                          poster={programContext.programState.program.picture}
                          src={
                            programContext.programState.program
                              .video_presentation
                          }
                        />
                      </div>
                    ) : programContext.programState.program
                        .video_presentation ? (
                      <div
                        className="card-img-container cursor-pointer"
                        onClick={() => setActive(true)}
                      >
                        <img
                          className="img-card"
                          controls
                          variant="top"
                          src={programContext.programState.program.picture}
                        />
                        <IconContext.Provider
                          value={{
                            className: "position-absolute h1",
                            style: {
                              left: "0",
                              right: "0",
                              top: "0",
                              bottom: "0",
                              margin: "auto",
                              fontSize: "4rem",
                              zIndex: "100",
                            },
                          }}
                        >
                          <div>
                            <FaRegPlayCircle />
                          </div>
                        </IconContext.Provider>
                        <IconContext.Provider
                          value={{
                            className: "position-absolute h1 text-dark",
                            style: {
                              left: "0",
                              right: "0",
                              top: "0",
                              bottom: "0",
                              margin: "auto",
                              fontSize: "3.8rem",
                              opacity: "0.8",
                            },
                          }}
                        >
                          <div>
                            <FaCircle />
                          </div>
                        </IconContext.Provider>
                      </div>
                    ) : (
                      <div className="card-img-container">
                        <img
                          className="img-card"
                          controls
                          variant="top"
                          src={programContext.programState.program.picture}
                        />
                      </div>
                    )}

                    <div className="course-score p-3">
                      {!appContext.userProfile.loading &&
                        programContext.programState.program.published && (
                          <>
                            {(!appContext.userProfile.is_authenticated ||
                              (!isBuyed() && !isInstructor()) ||
                              !programContext.programState.program
                                .published) && (
                              <>
                                <div className="my-3 d-flex justify-content-center align-items-end">
                                  <span className=" h4 font-weight-normal text-primary mb-0 mr-2">
                                    {programContext.programState.program
                                      .program_price &&
                                      programContext.programState.program
                                        .program_price.value}
                                    €
                                  </span>
                                  {/* <span className=" h5 font-weight-normal text-primary mb-0 mr-2">
                                    <s>
                                      {programContext.programState.program
                                        .program_price &&
                                        (
                                          programContext.programState.program
                                            .program_price.value + 10
                                        ).toFixed(2)}
                                      €
                                    </s>
                                  </span> */}
                                  <span className="font-weight-normal text-primary mb-0">
                                    por mes
                                  </span>
                                </div>
                                <Link
                                  to={
                                    appContext.userProfile.is_authenticated
                                      ? `/cart/checkout/${programContext.programState.program.code}`
                                      : pathname
                                  }
                                  className="btn btn-green btn-block m-0 text-white"
                                >
                                  Subscribirse
                                </Link>
                              </>
                            )}
                          </>
                        )}

                      <div>
                        <Link
                          to={`/academy/${programContext.programState.program.code}`}
                          className="btn btn-outline-green btn-block m-0 mt-3 text-white cursor-pointer"
                          target="_blank"
                        >
                          Acceso a la academia
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                {/* {!classRoom || !program.actived ? (
                  <div className="shadow w-100 p-1 rounded bg-white enterprices-card">
                    <div className="w-100">
                      <div className="p-3 text-grey">
                        <span className="h5 d-block">
                          ¿Entrenamiento de más de 5 personas?
                        </span>
                        <span>
                          Date a tu equipo un lugar donde aprender las cosas que
                          les apasionan
                        </span>
                        <div className="mt-2">
                          <a href={"mailto:vlexhndz@gmail.com"}>
                            <span className="font-weight-bold text-secondary">
                              Quiero saber más
                            </span>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ""
                )} */}
              </div>
            </div>
          )}
        </ProgramContext.Consumer>
      )}
    </AppContext.Consumer>
  );
};

export default CourseCard;
