import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Link, useParams, useLocation } from "react-router-dom";

import { useSelector } from "react-redux";
const FavouriteVideos = () => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const popularVideosReducer = useSelector(
    (state) => state.popularVideosReducer
  );
  let settings = null;
  if (!popularVideosReducer.isLoading) {
    settings = {
      className: "center",
      infinite: popularVideosReducer.videos.length > 4,
      slidesToShow: 4,
      slidesToScroll: 4,

      speed: 700,
      draggable: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:
              popularVideosReducer.videos.length < 3
                ? popularVideosReducer.videos.length
                : 3,
            slidesToScroll:
              popularVideosReducer.videos.length < 3
                ? popularVideosReducer.videos.length
                : 3,
            infinite: true,
          },
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
  }
  return popularVideosReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="d-flex justify-content-between">
          <span>Videos Populares</span>
          <Link
            to={
              !/\/demo\//.test(pathname)
                ? `/academy/${program}/videos`
                : `/demo/academy/${program}/videos`
            }
          >
            <span className="cursor-pointer">Ver más</span>
          </Link>
        </div>
        <Slider {...settings}>
          {popularVideosReducer.videos &&
            popularVideosReducer.videos.map((video) => (
              <div className="p-2">
                <Video video={video} key={video.id} />
              </div>
            ))}
        </Slider>
        {popularVideosReducer.isLoading && <span>Cargando...</span>}
        {popularVideosReducer.videos.length == 0 && (
          <span className="text-grey">No hay videos</span>
        )}
      </SlickSlider>
    </>
  );
};

const SlickSlider = styled.div`
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
`;

export default FavouriteVideos;
