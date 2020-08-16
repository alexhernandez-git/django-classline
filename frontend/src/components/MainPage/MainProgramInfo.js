import React, { useState, useEffect, useContext } from "react";
import { useSelector } from "react-redux";

import styled from "@emotion/styled";

const MainProgramInfo = () => {
  const [active, setActive] = useState(false);
  const program = useSelector((state) => state.programReducer.program);

  return (
    <>
      <div className="col-lg-8 col-md-6 mb-4 p-0">
        <div className="w-100 text-white">
          <MainInfo className="d-flex flex-column justify-content-center">
            <h2 className="text-break">{program && program.title}</h2>
            <span>{program && program.subtitle}</span>
          </MainInfo>
        </div>
      </div>
      <div className="col-lg-4 col-md-6 mb-4 p-0 position-relative">
        {program && program.video_presentation && (
          <div className="px-3 course-card">
            <div className="shadow w-100 p-1 rounded bg-white mb-3">
              <div className="w-100">
                <CardContainer>
                  <VideoCard
                    poster={program && program.picture}
                    src={program && program.video_presentation}
                    controls
                  />
                </CardContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
export const ProfileImgDiv = styled.div`
  height: 100px;
  width: 100px;
  overflow: hidden;
  border-radius: 50%;
  margin: 0 20px 20px 0;
`;
export const MainInfo = styled.div`
  h2 {
    font-size: 3.5rem;
  }
`;
export const CardContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%;
  overflow: hidden;
  height: 0;
`;
export const VideoCard = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
export default MainProgramInfo;
