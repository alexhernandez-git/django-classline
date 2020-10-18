import styled from "@emotion/styled";

export const Main = styled.div`
  grid-area: content;
  position: relative;
  background: #f9f9f9;

  overflow-y: auto;
  overflow-x: hidden;
  
  ${(props) => !props.infinite_height && "height: calc(100vh - 6rem)"}

  @media screen and (max-width: 768px) {
    ${(props) => !props.infinite_height && "height: calc(100vh - 6rem)"}
  }
  @media screen and (max-width: 576px) {
    ${(props) => props.padding && "padding: 1rem"}
  }
  ${(props) => props.padding && "padding: 4rem"}
`;
