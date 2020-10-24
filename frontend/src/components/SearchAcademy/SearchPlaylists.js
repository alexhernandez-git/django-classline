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
  const popularPlaylistsReducer = useSelector(
    (state) => state.popularPlaylistsReducer
  );
  let settings = null;
  if (!popularPlaylistsReducer.isLoading) {
    settings = {
      className: "center",
      infinite: popularPlaylistsReducer.playlists.length > 3,
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
            infinite: popularPlaylistsReducer.playlists.length > 2,
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
  return popularPlaylistsReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="d-flex justify-content-between">
          <span>Playlists</span>
          <Link
            to={
              !/\/demo\//.test(pathname)
                ? `/academy/${program}/courses`
                : `/demo/academy/${program}/courses`
            }
          >
            <span className="cursor-pointer">Ver más</span>
          </Link>
        </div>

        <Slider {...settings}>
          {popularPlaylistsReducer.playlists &&
            popularPlaylistsReducer.playlists.map((playlist) => (
              <div className="p-2 cursor-pointer" key={playlist.id}>
                <Course playlist={playlist} />
              </div>
            ))}
        </Slider>
        {popularPlaylistsReducer.isLoading && <span>Cargando...</span>}
        {popularPlaylistsReducer.playlists.length == 0 && (
          <span className="text-grey">No hay playlists</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchPlaylists;
