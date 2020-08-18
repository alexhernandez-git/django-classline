import React from "react";

import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const ProgramDescription = () => {
  const programReducer = useSelector((state) => state.programReducer);

  return (
    <>
      <Subtitle className="mt-5  text-primary">Descripción</Subtitle>
      <hr />
      <div className="row pr-3 pl-3 mt-3">
        <div className="p-2 position-relative">
          <span className="new-line">
            {!programReducer.isLoading && programReducer.program.description}
          </span>
        </div>
      </div>
    </>
  );
};

export const Subtitle = styled.div`
  font-size: 2rem;
`;
export default ProgramDescription;
