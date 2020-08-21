import React from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import { useSelector } from "react-redux";
const Caracteristics = () => {
  const programReducer = useSelector((state) => state.programReducer);
  return (
    <>
      <Subtitle className="mt-5  text-primary">Estadisticas</Subtitle>
      <hr />
      <CaracteristicsContainer className="row">
        <div className="col-md-4">
          {programReducer.program.are_meetups && (
            <div className="position-relative">
              Clases online
              <IconContext.Provider
                value={{
                  style: {
                    top: "2px",
                  },
                  className: "mr-3 text-primary position-absolute",
                  size: "20px",
                }}
              >
                <IoMdCheckmark />{" "}
              </IconContext.Provider>
            </div>
          )}
          {programReducer.program.are_videos && (
            <div className="position-relative">
              Videos
              <IconContext.Provider
                value={{
                  style: {
                    top: "2px",
                  },
                  className: "mr-3 text-primary position-absolute",
                  size: "20px",
                }}
              >
                <IoMdCheckmark />{" "}
              </IconContext.Provider>
            </div>
          )}
          {programReducer.program.are_podcasts && (
            <div className="position-relative">
              Podcasts
              <IconContext.Provider
                value={{
                  style: {
                    top: "2px",
                  },
                  className: "mr-3 text-primary position-absolute",
                  size: "20px",
                }}
              >
                <IoMdCheckmark />{" "}
              </IconContext.Provider>
            </div>
          )}
          {programReducer.program.are_playlists && (
            <div className="position-relative">
              Cursos
              <IconContext.Provider
                value={{
                  style: {
                    top: "2px",
                  },
                  className: "mr-3 text-primary position-absolute",
                  size: "20px",
                }}
              >
                <IoMdCheckmark />{" "}
              </IconContext.Provider>
            </div>
          )}
        </div>
        <div className="col-md-4">
          {programReducer.program.are_meetups && (
            <div className="position-relative">
              Clases online: {programReducer.program.events}
            </div>
          )}
          {programReducer.program.are_videos && (
            <div className="position-relative">
              Videos: {programReducer.program.videos}
            </div>
          )}
          {programReducer.program.are_podcasts && (
            <div className="position-relative">
              Podcasts: {programReducer.program.podcasts}
            </div>
          )}
          {programReducer.program.are_playlists && (
            <div className="position-relative">
              Cursos: {programReducer.program.playlists}
            </div>
          )}
          <div className="position-relative">
            Alumnos: {programReducer.program.students}
          </div>
        </div>
      </CaracteristicsContainer>
    </>
  );
};
export const CaracteristicsContainer = styled.div``;
export const Subtitle = styled.div`
  font-size: 2rem;
`;
export default Caracteristics;
