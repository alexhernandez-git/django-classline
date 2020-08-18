import React from "react";
import { IconContext } from "react-icons";
import { IoMdCheckmark } from "react-icons/io";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";

const ProgramBenefits = () => {
  const programReducer = useSelector((state) => state.programReducer);

  return (
    <>
      <Subtitle className="mt-5  text-primary">Beneficios</Subtitle>
      <hr />
      <div className="row pr-3 pl-3 mt-3">
        {!programReducer.isLoading &&
          programReducer.program.benefits.map((benefit) => (
            <div className="col-md-6 col-lg-4 col-xl-3 text-break">
              <div className="subject p-2 position-relative">
                <IconContext.Provider
                  value={{
                    className: "mr-2 text-primary position-absolute",
                    size: "20px",
                  }}
                >
                  <IoMdCheckmark style={{ top: "7px", left: "-16px" }} />{" "}
                  {benefit.name}
                </IconContext.Provider>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export const Subtitle = styled.div`
  font-size: 2rem;
`;
export default ProgramBenefits;
