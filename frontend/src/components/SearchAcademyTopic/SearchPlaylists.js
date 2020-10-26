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
  const playlistsTopicReducer = useSelector(
    (state) => state.playlistsTopicReducer
  );
  let settings = null;
  if (!playlistsTopicReducer.isLoading) {
    settings = {
      className: "center",
      infinite: playlistsTopicReducer.playlists.results.length > 3,
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
            infinite: playlistsTopicReducer.playlists.results.length > 2,
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
  return playlistsTopicReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="">
          <span>Playlists</span>
     
        </div>

        <Slider {...settings}>
          {playlistsTopicReducer.playlists.results &&
            playlistsTopicReducer.playlists.results.map((playlist_topic) => (
              <div className="p-2 cursor-pointer" key={playlist_topic.id}>
                <Course playlist={playlist_topic.playlist} />
              </div>
            ))}
        </Slider>
        {playlistsTopicReducer.isLoading && <span>Cargando...</span>}
        {playlistsTopicReducer.playlists.results.length == 0 && (
          <span className="text-grey">No hay playlists</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchPlaylists;
