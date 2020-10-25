import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import CourseCard from "src/components/AdminAcademy/CourseCard";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {
  fetchPlaylists,
  setPlaylistEdit,
  deletePlaylistEdit,
  deletePlaylist,
  fetchPlaylistsPagination,
} from "src/redux/actions/courses";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import ContainerWrapper from "src/components/ui/Container";
const CoursesAdmin = () => {
  const MySwal = withReactContent(Swal);

  const main = useRef();

  const { program } = useParams();
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);

  const coursesReducer = useSelector((state) => state.coursesReducer);
  useEffect(() => {
    if (
      !programReducer.isLoading &&
      programReducer.program &&
      coursesReducer.playlists.results.length == 0
    ) {
      const dispatchFetchPlaylists = () => dispatch(fetchPlaylists());
      dispatchFetchPlaylists();
    }
  }, [programReducer.isLoading]);
  const handleSetEditPlaylist = (playlist) => {
    const dispatchSetEditPlaylist = (playlist) =>
      dispatch(setPlaylistEdit(playlist));
    dispatchSetEditPlaylist(playlist);
  };
  const handleDeleteEditPlaylist = (playlist) => {
    const dispatchDeleteEditPlaylist = (playlist) =>
      dispatch(deletePlaylistEdit(playlist));
    dispatchDeleteEditPlaylist(playlist);
  };
  const handleDeletePlaylist = (id) => {
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
        const dispatchDeletePlaylist = (id) => dispatch(deletePlaylist(id));
        dispatchDeletePlaylist(id);
      }
    });
  };
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
        title="Playlists"
        placeholder="Buscar playlists"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />
      <ContainerWrapper>
        <div className="d-flex justify-content-end mb-3">
          <Link to={`/academy/${program}/admin/form/playlist`}>
            <ButtonCustom onClick={handleDeleteEditPlaylist}>
              Nueva Playlist
            </ButtonCustom>
          </Link>
        </div>
        {coursesReducer.playlists &&
          coursesReducer.playlists.results.map((playlist) => (
            <CourseCard
              playlist={playlist}
              key={playlist.id}
              handleSetEditPlaylist={handleSetEditPlaylist}
              handleDeletePlaylist={handleDeletePlaylist}
            />
          ))}
        {coursesReducer.isLoading && <span>Cargando...</span>}
        {coursesReducer.playlists &&
          (coursesReducer.playlists.previous ||
            coursesReducer.playlists.next) && (
            <div className="d-flex justify-content-center my-5">
              {coursesReducer.playlists.previous ? (
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                >
                  <IoIosArrowDropleft
                    onClick={() =>
                      handleChangePage(coursesReducer.playlists.previous)
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
              {coursesReducer.playlists.next ? (
                <IconContext.Provider
                  value={{
                    size: 50,
                    className: "cursor-pointer",
                  }}
                >
                  <IoIosArrowDropright
                    onClick={() =>
                      handleChangePage(coursesReducer.playlists.next)
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
    </Main>
  );
};

export default CoursesAdmin;
