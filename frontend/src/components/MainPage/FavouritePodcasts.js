import React, { useEffect, useRef } from "react";
import Slider from "react-slick";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { useHistory, Link, useParams, useLocation } from "react-router-dom";
import Podcast from "src/components/ui/Podcast";
import { useDispatch, useSelector } from "react-redux";
import { playPodcast } from "src/redux/actions/podcasts";

const FavouritePodcasts = () => {
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
  const popularPodcastsReducer = useSelector(
    (state) => state.popularPodcastsReducer
  );
  let settings = null;
  if (!popularPodcastsReducer.isLoading) {
    settings = {
      infinite: popularPodcastsReducer.podcasts.length > 2,
      slidesToShow: 2,
      slidesToScroll: 2,
      draggable: true,
      vertical: true,
      verticalSwiping: true,
    };
  }
  return popularPodcastsReducer.isLoading ? (
    "Cargando..."
  ) : (
    <>
      <SlickSlider>
        <div className="d-flex justify-content-between">
          <span>Podcasts Populares</span>
          <Link
            to={
              !/\/demo\//.test(pathname)
                ? `/academy/${program}/podcasts`
                : `/demo/academy/${program}/podcasts`
            }
          >
            <span className="cursor-pointer">Ver más</span>
          </Link>
        </div>
        <Slider {...settings}>
          {popularPodcastsReducer.podcasts &&
            popularPodcastsReducer.podcasts.map((podcast) => (
              <div className="p-2" key={podcast.id}>
                <Podcast podcast={podcast} handlePlay={handlePlay} />
              </div>
            ))}
          {popularPodcastsReducer.isLoading && <span>Cargando...</span>}
        </Slider>
        {popularPodcastsReducer.podcasts.length == 0 && (
          <span className="text-grey">No hay podcasts</span>
        )}
      </SlickSlider>
    </>
  );
};

const SlickSlider = styled.div`
  .slick-prev {
    left: -10px !important;
    z-index: 100 !important;
  }
  .slick-next {
    right: 10px !important;
  }
  .slick-next:before,
  .slick-prev:before {
    color: #000;
    font-size: 4rem;
  }
  .slick-slide div:focus {
    outline: none !important;
  }
`;

export default FavouritePodcasts;
