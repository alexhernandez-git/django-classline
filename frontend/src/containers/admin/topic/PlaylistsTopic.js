import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { Modal, Form, Row, Col, Button } from "react-bootstrap";
import { ButtonCustom } from "src/components/ui/ButtonCustom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { MdPlaylistAdd, MdClose } from "react-icons/md";
import PlaylistList from "src/components/ui/PlaylistList";
import SearchBar from "src/components/ui/SearchBar";

import { IconContext } from "react-icons";
import {
  fetchPlaylists,
  fetchPlaylistsIncrease
} from "src/redux/actions/playlistsAdmin";
import { useDispatch, useSelector } from "react-redux";


import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import * as Yup from "yup";
import styled from "@emotion/styled";
import { 
  addPlaylistTopic, 
  fetchPlaylistsTopic, 
  fetchPlaylistsTopicPagination, 
  removePlaylistTopic 
} from "src/redux/actions/topics/playlistsTopic";
import PlaylistCard from "src/components/TopicAcademy/PlaylistCard";
import useOutsideClick from "../../../hooks/useOutsideClick";


const PlaylistsTopic = (props) => {
  const MySwal = withReactContent(Swal);
  const {infinite_height} = props
  const main = useRef();
  const dispatch = useDispatch();
  const playlistsAdminReducer = useSelector((state) => state.playlistsAdminReducer);
  const playlistsTopicReducer = useSelector((state) => state.playlistsTopicReducer);
  const topicReducer = useSelector((state) => state.topicReducer);
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading) {
      const dispatchFetchPlaylists = () => dispatch(fetchPlaylists());
      dispatchFetchPlaylists();
  
    }
  }, [programReducer.program]);

  useEffect(() => {
    if (!topicReducer.isLoading && topicReducer.topic) {
      const dispatchFetchPlaylistsTopic = () => dispatch(fetchPlaylistsTopic());
      dispatchFetchPlaylistsTopic();
    }
  }, [topicReducer.isLoading]);

  const handlePlaylistDelete = (id) => {
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        const dispatchDeletePlaylist = (id) => dispatch(removePlaylistTopic(id));
        dispatchDeletePlaylist(id);
      }
    });
  };

  const [search, setSearch] = useState("");
  
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchPlaylistsTopicSearch = (search) => dispatch(fetchPlaylistsTopic(search));
    dispatchFetchPlaylistsTopicSearch(search);
  };

  const [searchPlaylists, setSearchPlaylists] = useState("");
    const handleSubmitSearchPlaylists = (e) => {
      e.preventDefault();
      const dispatchFetchPlaylistsSearch = (search) => dispatch(fetchPlaylists(search));
      dispatchFetchPlaylistsSearch(searchPlaylists);
    };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPlaylistsTopicPagination = (url) =>
      dispatch(fetchPlaylistsTopicPagination(url));
    dispatchFetchPlaylistsTopicPagination(url);
  };
  const [isAddPlaylistOpen, setIsAddPlaylistOpen] = useState(false);
  const handleToggleAddPlaylist = () => {
    setIsAddPlaylistOpen((isAddPlaylistOpen) => (isAddPlaylistOpen ? false : true));
  };
  const handleAddPlaylist = (id) =>{
    const dispatchAddPlaylistTopic = (id) => dispatch(addPlaylistTopic(id));
    dispatchAddPlaylistTopic(id);
  }
  const [limit, setLimit] = useState(12);
  const fetchMorePlaylists = () => {
    const dispatchFetchPlaylistsIncrease = (limit, search) =>
      dispatch(fetchPlaylistsIncrease(limit, search));
    dispatchFetchPlaylistsIncrease(limit + 12, search);
    setLimit((limit) => limit + 12);
  };
  const addPlaylistRef = useRef()

  useOutsideClick(addPlaylistRef, () => {
    setIsAddPlaylistOpen(false)
  });
  return (
    <>
        <form>
          <Filters
            title="Playlists"
            placeholder="Buscar Playlists"
            search={{ search: search, setSearch: setSearch }}
            onSubmit={handleSubmitSearch}
          />
        </form>
        <ContainerWrapper>
 
 
            <div ref={addPlaylistRef}>
              <div className="cursor-pointer  mb-3" onClick={handleToggleAddPlaylist} >

                {isAddPlaylistOpen ? (
                  <div className="d-flex align-items-center">
                    <IconContext.Provider
                      value={{
                        size: 22,
                        className: "global-class-name mr-2",
                      }}
                      >
                      {" "}
                      <MdClose />
                    </IconContext.Provider>
                    Cerrar
                  </div>
                ) : (
                  <>
                    <IconContext.Provider
                      value={{
                        size: 22,
                        className: "global-class-name mr-2",
                      }}
                      >
                      {" "}
                      <MdPlaylistAdd />
                    </IconContext.Provider>
                    Añadir playlists
                  </>
                )}
                </div>
                {isAddPlaylistOpen && (
                <div className="position-relative">
                  <PlaylistsForm onSubmit={(e) => e.preventDefault()}>
                    <SearchBar
                      placeholder="Buscar Playlists"
                      search={{ search: searchPlaylists, setSearch: setSearchPlaylists }}
                      onSubmit={handleSubmitSearchPlaylists}
                    />
                    <AddPlaylistList>
                      {playlistsAdminReducer.playlists &&
                        playlistsAdminReducer.playlists.results.map((playlist) => (
                          <PlaylistPlaylist
                            className="d-flex justify-content-between align-items-center"
                            key={playlist.id}
                          >
                            <PlaylistList playlist={playlist} />
                            <IconContext.Provider
                              value={{
                                size: 30,
                                className: "global-class-name mr-2 cursor-pointer",
                              }}
                            >
                              <MdPlaylistAdd onClick={() => handleAddPlaylist(playlist.id)} />
                            </IconContext.Provider>
                          </PlaylistPlaylist>
                        ))}
                      {playlistsAdminReducer.isLoading && <span>Cargando...</span>}
                      {playlistsAdminReducer.playlists && playlistsAdminReducer.playlists.next && (
                        <div className="d-flex justify-content-center">
                          <ButtonCustom
                            onClick={fetchMorePlaylists}
                            className="w-100"
                            type="button"
                          >
                            Cargar más playlists
                          </ButtonCustom>
                        </div>
                      )}
                    </AddPlaylistList>
                  </PlaylistsForm>
                </div>
              )}
              </div>


          {playlistsTopicReducer.playlists &&
            playlistsTopicReducer.playlists.results.map((playlist_topic) => (
              <PlaylistCard
                playlist={playlist_topic.playlist}
                key={playlist_topic.playlist.id}
                handlePlaylistDelete={handlePlaylistDelete}
              />
            ))}
          {playlistsTopicReducer.isLoading && <span>Cargando...</span>}
          {playlistsTopicReducer.playlists &&
            (playlistsTopicReducer.playlists.previous || playlistsTopicReducer.playlists.next) && (
              <div className="d-flex justify-content-center my-5">
                {playlistsTopicReducer.playlists.previous ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropleft
                      onClick={() =>
                        handleChangePage(playlistsTopicReducer.playlists.previous)
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
                {playlistsTopicReducer.playlists.next ? (
                  <IconContext.Provider
                    value={{
                      size: 50,
                      className: "cursor-pointer",
                    }}
                  >
                    <IoIosArrowDropright
                      onClick={() =>
                        handleChangePage(playlistsTopicReducer.playlists.next)
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
        </ContainerWrapper>
     
    </>
  );
};
const PlaylistsForm = styled.form`
  position: absolute;
  z-index: 400;
  background: #fff;
  width: 50%;
  @media only screen and (max-width: 768px) {
    width: 100%;

  }
`;
const PlaylistPlaylist = styled.div`
  padding: 1rem;
  &:hover {
    background: #ececec;
  }
`;
const AddPlaylistList = styled.div`
  max-height: 40vh;
  overflow: auto;
`;
export default PlaylistsTopic;
