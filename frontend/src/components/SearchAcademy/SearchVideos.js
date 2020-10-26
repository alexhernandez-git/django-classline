import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlickSlider } from "src/components/ui/SlickSlider";
const SearchVideos = () => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const videosReducer = useSelector(
    (state) => state.videosReducer
  );
  let settings = null;
  if (!videosReducer.isLoading) {
    settings = {
      className: "center",
      infinite: videosReducer.videos.results.length > 4,
      slidesToShow: 4,
      slidesToScroll: 4,

      speed: 700,
      draggable: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:
              videosReducer.videos.results.length < 3
                ? videosReducer.videos.results.length
                : 3,
            slidesToScroll:
              videosReducer.videos.results.length < 3
                ? videosReducer.videos.results.length
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
  return videosReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="">
          <span>Videos</span>
  
        </div>
        <Slider {...settings}>
          {videosReducer.videos.results &&
            videosReducer.videos.results.map((video) => (
              <div className="p-2" key={video.id}>
                <Video video={video} />
              </div>
            ))}
        </Slider>
        {videosReducer.isLoading && <span>Cargando...</span>}
        {videosReducer.videos.results.length == 0 && (
          <span className="text-grey">No hay videos</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchVideos;
