import React, { useRef, useEffect, useState } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import Playlist from "src/components/ui/Playlist";
import {
  fetchPlaylists,
  fetchPlaylistsPagination,
} from "src/redux/actions/playlists";
import { useDispatch, useSelector } from "react-redux";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import { useParams } from "react-router-dom";
const playlists = () => {
  const main = useRef();
  const playlistsReducer = useSelector((state) => state.playlistsReducer);
  const programReducer = useSelector((state) => state.programReducer);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchPlaylists = () => dispatch(fetchPlaylists());
      dispatchFetchPlaylists();
    }
  }, [programReducer.isLoading]);
  const [search, setSearch] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchPlaylists = (search) => dispatch(fetchPlaylists(search));
    dispatchFetchPlaylists(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPlaylistsPagination = (url) =>
      dispatch(fetchPlaylistsPagination(url));
    dispatchFetchPlaylistsPagination(url);
  };
  return (
    <Main padding ref={main}>
      <Filters
        title="Cursos"
        placeholder={"Buscar listas"}
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />

      <div className="row">
        <div className="col-12">
          <GridVideos>
            {playlistsReducer.playlists &&
              playlistsReducer.playlists.results.map((playlist) => (
                <div className="cursor-pointer" key={playlist.key}>
                  <Playlist playlist={playlist} />
                </div>
              ))}
          </GridVideos>
          {playlistsReducer.isLoading && <span>Cargando...</span>}
          {playlistsReducer.playlists &&
            (playlistsReducer.playlists.previous ||
              playlistsReducer.playlists.next) && (
              <div className="d-flex justify-content-center my-5">
                {playlistsReducer.playlists.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(playlistsReducer.playlists.previous)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropleft />
                  </IconContext.Provider>
                )}
                {playlistsReducer.playlists.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(playlistsReducer.playlists.next)
                      }
                    />
                  </IconContext.Provider>
                ) : (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      color: "#a1a1a1",
                    }}
                  >
                    <IoIosArrowDropright />
                  </IconContext.Provider>
                )}
              </div>
            )}
        </div>
      </div>
    </Main>
  );
};
export const GridVideos = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;
  grid-template-columns: repeat(4, 1fr);
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;

export default playlists;
