import React from "react";
import { AppContext } from "src/context/AppContext";
import {
  ProgramContext,
  ProgramProvider,
} from "src/context/ProgramContext/ProgramContext";

import "static/assets/styles/components/Courses/Course.scss";
import MainInfoProgram from "src/components/Programs/Program/MainInfoProgram";
import ProgramBenefits from "src/components/Programs/Program/ProgramBenefits";
import DescriptionProgram from "src/components/Programs/Program/DescriptionProgram";
import ProgramCard from "src/components/Programs/Program/ProgramCard";
import ScheduleProgram from "../components/Programs/Program/ScheduleProgram";
import StudentFeedback from "src/components/Programs/StudentFeedback";
import ProgramTeacher from "src/components/Programs/Program/ProgramTeacher";
import InformationProgram from "src/components/Programs/Program/InformationProgram";
const Program = (props) => {
  const { match } = props;
  let { id } = match.params;

  return (
    <AppContext.Consumer>
      {(appContext) => (
        <ProgramProvider id={id}>
          <ProgramContext.Consumer>
            {(programContext) => (
              <>
                {programContext.programState.loading ? (
                  "Cargando..."
                ) : (
                  <>
                    <div className="course-content text-white pt-5 course bg-dark">
                      <div className="container">
                        <div className="row ">
                          <div className="col-lg-8 col-md-6 mb-4 p-0">
                            <MainInfoProgram
                              program={programContext.programState.program}
                            />
                          </div>
                          {/^\/classroom\/program\/(?!videos)(?!meeting)/.test(
                            location.pathname
                          ) ? (
                            <div className="col-lg-4  col-md-6 mb-4 p-0 position-relative">
                              <ProgramCard
                                program={programContext.programState.program}
                                classRoom={true}
                              />
                            </div>
                          ) : (
                            <div className="col-lg-4  col-md-6 mb-4 p-0 position-relative">
                              <ProgramCard
                                program={programContext.programState.program}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="container mt-4">
                      <div className="row">
                        <div className="col-lg-8 mb-4 p-0">
                          {!/^\/classroom\/program\/(?!videos)(?!meeting)/.test(
                            location.pathname
                          ) ? (
                            <>
                              {programContext.programState.program
                                .description != "" ? (
                                <DescriptionProgram
                                  program={programContext.programState.program}
                                />
                              ) : (
                                ""
                              )}
                              {programContext.programState.program.benefits
                                .length > 0 &&
                              programContext.programState.program.benefits[0]
                                .name != "" ? (
                                <ProgramBenefits
                                  program={programContext.programState.program}
                                />
                              ) : (
                                ""
                              )}
                              <InformationProgram
                                program={programContext.programState.program}
                              />
                            </>
                          ) : (
                            ""
                          )}
                          {programContext.programState.program.meetups ? (
                            <ScheduleProgram
                              program={programContext.programState.program}
                            />
                          ) : (
                            ""
                          )}
                          <ProgramTeacher />

                          <StudentFeedback id={id} />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}
          </ProgramContext.Consumer>
        </ProgramProvider>
      )}
    </AppContext.Consumer>
  );
};

export default Program;
