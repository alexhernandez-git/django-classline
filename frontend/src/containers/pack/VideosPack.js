import React, { useRef, useState, useEffect } from "react";

import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Main } from "src/components/ui/Main";

import { fetchVideos, fetchVideosPagination } from "src/redux/actions/videosPack";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import ContainerWrapper from "src/components/ui/Container";

export default function Videos() {
  const main = useRef();
  const videosPackReducer = useSelector((state) => state.videosPackReducer);

  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const handleOpenCategories = () => {
    setCategoriesOpen((CategoriesOpen) => {
      if (CategoriesOpen) {
        return false;
      } else {
        return true;
      }
    });
  };
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchVideos = () => dispatch(fetchVideos());
      dispatchFetchVideos();
    }
  }, [programReducer.isLoading]);
  const [search, setSearch] = useState("");
  // useEffect(() => {
  //   if (!programReducer.isLoading && programReducer.program) {
  //     const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
  //     dispatchFetchVideos(search);
  //   }
  // }, [search, programReducer.isLoading]);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
    dispatchFetchVideos(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchVideosPagination = (url) =>
      dispatch(fetchVideosPagination(url));
    dispatchFetchVideosPagination(url);
  };
  return (
    <>
      <Main padding ref={main}>
        <Filters
          title="Videos"
          placeholder={"Buscar Videos"}
          title="Videos"
          placeholder="Buscar video"
          search={{ search: search, setSearch: setSearch }}
          onSubmit={handleSubmitSearch}
        />
        <ContainerWrapper>
          <div className="row">
            <div className="col-12">
              <GridVideos>
                {videosPackReducer.videos &&
                  videosPackReducer.videos.results.map((video_pack) => (
                    <div key={video_pack.video.id}>
                      <Video video={video_pack.video} />
                    </div>
                  ))}
              </GridVideos>
              {videosPackReducer.isLoading && <span>Cargando...</span>}
              {videosPackReducer.videos &&
                (videosPackReducer.videos.previous ||
                  videosPackReducer.videos.next) && (
                  <div className="d-flex justify-content-center my-5">
                    {videosPackReducer.videos.previous ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropleft
                          onClick={() =>
                            handleChangePage(videosPackReducer.videos.previous)
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
                    {videosPackReducer.videos.next ? (
                      <IconContext.Provider
                        value={{
                          size: 50,
                          className: "cursor-pointer",
                        }}
                      >
                        <IoIosArrowDropright
                          onClick={() =>
                            handleChangePage(videosPackReducer.videos.next)
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
        </ContainerWrapper>
      </Main>
    </>
  );
}

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
