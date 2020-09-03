import React, { useRef, useState, useEffect } from "react";

import Layout from "src/components/Layout/Layout";
import Filters from "src/components/Layout/Filters";
import Video from "src/components/ui/Video";
import styled from "@emotion/styled";
import { Main } from "src/components/ui/Main";

import { fetchVideos, fetchVideosPagination } from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { useParams } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import DocsItem from "src/components/ui/DocsItem";

export default function DocsAcademy() {
  const main = useRef();
  const videosReducer = useSelector((state) => state.videosReducer);

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
          title="Documentos"
          placeholder={"Buscar Documentos"}
          title="Documentos"
          search={{ search: search, setSearch: setSearch }}
          onSubmit={handleSubmitSearch}
        />

        <div className="row">
          <div className="col-12">
            <GridFolders>
              <DocsItem />
              <DocsItem />
              <DocsItem />
              <DocsItem />
              <DocsItem />
              <DocsItem />
              <DocsItem />
              <DocsItem file />
              <DocsItem file />
              <DocsItem file />
              <DocsItem file />
            </GridFolders>
            {videosReducer.isLoading && <span>Cargando...</span>}
          </div>
        </div>
      </Main>
    </>
  );
}

const ButtonSearchUsers = styled.button`
  background: none;
  border: none;
  font-size: 18px;
  padding: 7px 12px;
  border-radius: 100px;
  color: #828282;
  cursor: pointer;
  display: flex;
  align-items: center;
  &:hover {
    background: #e7e7e7;
  }
`;
export const GridFolders = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;
  grid-template-columns: repeat(5, 1fr);
  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
