import styled from "@emotion/styled";

export const SlickSlider = styled.div`
  .slick-prev {
    left: 0px !important;

    right: 0px !important;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex !important;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    &::before {
      color: #232323 !important;

      height: 50px;
      width: 50px;
      font-size: 3.5rem;
      line-height: 45px;
      content: "‹";
    }
    z-index: 100 !important;
  }
  .slick-next {
    right: 0px !important;
    background: #fff;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    justify-content: center;
    align-items: center;
    display: flex !important;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    &::before {
      color: #232323 !important;
      height: 50px;
      width: 50px;
      font-size: 3.5rem;
      line-height: 45px;
      content: "›";
    }
  }

  .slick-slide div:focus {
    outline: none !important;
  }
  .slick-track {
    height: auto !important;
  }
`;
