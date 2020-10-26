import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Link, useParams, useLocation } from "react-router-dom";
import Course from "src/components/ui/Course";
import { useSelector } from "react-redux";
import { SlickSlider } from "../ui/SlickSlider";

const SearchPlaylists = () => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const coursesReducer = useSelector(
    (state) => state.coursesReducer
  );
  let settings = null;
  if (!coursesReducer.isLoading) {
    settings = {
      className: "center",
      infinite: coursesReducer.playlists.results.length > 3,
      slidesToShow: 3,
      slidesToScroll: 3,

      speed: 700,
      draggable: false,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            infinite: coursesReducer.playlists.results.length > 2,
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
  return coursesReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="">
          <span>Playlists</span>

        </div>

        <Slider {...settings}>
          {coursesReducer.playlists.results &&
            coursesReducer.playlists.results.map((playlist) => (
              <div className="p-2 cursor-pointer" key={playlist.id}>
                <Course playlist={playlist} />
              </div>
            ))}
        </Slider>
        {coursesReducer.isLoading && <span>Cargando...</span>}
        {coursesReducer.playlists.results.length == 0 && (
          <span className="text-grey">No hay playlists</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchPlaylists;
