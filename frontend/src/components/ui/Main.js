import styled from "@emotion/styled";

export const Main = styled.div`
  grid-area: content;
  position: relative;
  background: #f9f9f9;

  overflow-y: auto;
  overflow-x: hidden;
  height: calc(100vh - 6rem);
  @media screen and (max-width: 768px) {
    height: calc(100vh - 6rem);
  }
  @media screen and (max-width: 576px) {
    ${(props) => props.padding && "padding: 1rem"}
  }
  ${(props) => props.padding && "padding: 4rem"}
`;
