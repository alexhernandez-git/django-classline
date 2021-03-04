import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Link, useParams, useLocation } from "react-router-dom";
import Playlist from "src/components/ui/Playlist";
import { useSelector } from "react-redux";
import { SlickSlider } from "../ui/SlickSlider";

const SearchPlaylists = () => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const playlistsAdminReducer = useSelector(
    (state) => state.playlistsAdminReducer
  );
  let settings = null;
  if (!playlistsAdminReducer.isLoading) {
    settings = {
      className: "center",
      infinite: playlistsAdminReducer.playlists.results.length > 3,
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
            infinite: playlistsAdminReducer.playlists.results.length > 2,
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
  return playlistsAdminReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="">
          <span>Playlists</span>
        </div>

        <Slider {...settings}>
          {playlistsAdminReducer.playlists.results &&
            playlistsAdminReducer.playlists.results.map((playlist) => (
              <div className="p-2 cursor-pointer" key={playlist.id}>
                <Playlist playlist={playlist} />
              </div>
            ))}
        </Slider>
        {playlistsAdminReducer.isLoading && <span>Cargando...</span>}
        {playlistsAdminReducer.playlists.results.length == 0 && (
          <span className="text-grey">No hay playlists</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchPlaylists;
