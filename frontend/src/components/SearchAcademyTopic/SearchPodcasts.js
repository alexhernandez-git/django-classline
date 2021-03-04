import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { useHistory, Link, useParams, useLocation } from "react-router-dom";
import Podcast from "src/components/ui/Podcast";
import { useDispatch, useSelector } from "react-redux";
import { playPodcast } from "src/redux/actions/podcasts";
import { SlickSlider } from "../ui/SlickSlider";

const SearchPodcasts = () => {
  const { pathname } = useLocation();

  const { program } = useParams();
  const dispatch = useDispatch();
  const router = useHistory();
  const handlePlay = (podcast) => {
    if (!/\/demo\//.test(pathname)) {
      const dispatchPlayPodcast = (podcast) => dispatch(playPodcast(podcast));
      dispatchPlayPodcast(podcast);
      router.push(`/academy/${program}/podcasts`);
    }
  };
  const podcastsTopicReducer = useSelector(
    (state) => state.podcastsTopicReducer
  );
  let settings = null;
  if (!podcastsTopicReducer.isLoading) {
    settings = {
      infinite: podcastsTopicReducer.podcasts.results.length > 2,
      slidesToShow:
        podcastsTopicReducer.podcasts.results.length < 2
          ? podcastsTopicReducer.podcasts.results.length
          : 2,
      slidesToScroll:
        podcastsTopicReducer.podcasts.results.length < 2
          ? podcastsTopicReducer.podcasts.results.length
          : 2,
      draggable: true,
      vertical: true,
      verticalSwiping: true,
    };
  }
  return podcastsTopicReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="">
          <span>Podcasts</span>

        </div>
        <Slider {...settings}>
          {podcastsTopicReducer.podcasts.results &&
            podcastsTopicReducer.podcasts.results.map((podcast_topic) => (
              <div className="p-2" key={podcast_topic.id}>
                <Podcast podcast={podcast_topic.podcast} handlePlay={handlePlay} />
              </div>
            ))}
          {podcastsTopicReducer.isLoading && <span>Cargando...</span>}
        </Slider>
        {podcastsTopicReducer.podcasts.results.length == 0 && (
          <span className="text-grey">No hay podcasts</span>
        )}
      </SlickSlider>
    </>
  );
};

export default SearchPodcasts;
