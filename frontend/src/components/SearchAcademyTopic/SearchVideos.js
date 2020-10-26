import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import { Link, useParams, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { SlickSlider } from "src/components/ui/SlickSlider";
const SearchVideos = () => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const videosTopicReducer = useSelector(
    (state) => state.videosTopicReducer
  );
  let settings = null;
  if (!videosTopicReducer.isLoading) {
    settings = {
      className: "center",
      infinite: videosTopicReducer.videos.results.length > 4,
      slidesToShow: 4,
      slidesToScroll: 4,

      speed: 700,
      draggable: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow:
              videosTopicReducer.videos.results.length < 3
                ? videosTopicReducer.videos.results.length
                : 3,
            slidesToScroll:
              videosTopicReducer.videos.results.length < 3
                ? videosTopicReducer.videos.results.length
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
  return videosTopicReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="">
          <span>Videos</span>

        </div>
        <Slider {...settings}>
          {videosTopicReducer.videos.results &&
            videosTopicReducer.videos.results.map((video_topic) => (
              <div className="p-2" key={video_topic.id}>
                <Video video={video_topic.video} />
              </div>
            ))}
        </Slider>
        {videosTopicReducer.isLoading && <span>Cargando...</span>}
        {videosTopicReducer.videos.results.length == 0 && (
          <span className="text-grey">No hay videos</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchVideos;
