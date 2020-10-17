import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlickSlider } from "src/components/ui/SlickSlider";
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
          <span>Videos</span>
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
              <div className="p-2" key={video.id}>
                <Video video={video} />
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

export default FavouriteVideos;
