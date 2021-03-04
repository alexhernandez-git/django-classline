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
import {
  fetchFolders,
  setCurrentFolder,
  removeCurrentFolder,
} from "../redux/actions/publicFolders";
import { fetchFiles } from "../redux/actions/publicFiles";
import { ButtonCustom } from "../components/ui/ButtonCustom";
import { FaFolder } from "react-icons/fa";
import ContainerWrapper from "src/components/ui/Container";

export default function DocsAcademy() {
  const main = useRef();
  const publicFoldersReducer = useSelector(
    (state) => state.publicFoldersReducer
  );
  const publicFilesReducer = useSelector((state) => state.publicFilesReducer);
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
      const dispatchFetchFolders = () => dispatch(fetchFolders());
      dispatchFetchFolders();
      const dispatchFetchFiles = () => dispatch(fetchFiles());
      dispatchFetchFiles();
    }
  }, []);
  const [search, setSearch] = useState("");
  // useEffect(() => {
  //   if (!programReducer.isLoading && programReducer.program) {
  //     const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
  //     dispatchFetchVideos(search);
  //   }
  // }, [search, programReducer.isLoading]);
  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchFolders = (search) => dispatch(fetchFolders(search));
    dispatchFetchFolders(search);
    const dispatchFetchFiles = (search) => dispatch(fetchFiles(search));
    dispatchFetchFiles(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchVideosPagination = (url) =>
      dispatch(fetchVideosPagination(url));
    dispatchFetchVideosPagination(url);
  };
  const hanldeEnterFolder = (folder) => {
    dispatch(setCurrentFolder(folder.id));
    dispatch(fetchFolders());
    dispatch(fetchFiles());
  };
  const hanldeEnterTopFolder = () => {
    dispatch(removeCurrentFolder());
    dispatch(fetchFolders());
    dispatch(fetchFiles());
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
        <ContainerWrapper>
          <div className=" mb-3">
            {publicFoldersReducer.current_folders.length > 0 && (
              <ButtonCustom
                type="button"
                className="d-flex align-items-center mr-3 justify-content-center"
                onClick={hanldeEnterTopFolder}
              >
                <IconContext.Provider
                  value={{
                    className: "cursor-pointer mr-2",
                    color: "#fff",
                  }}
                >
                  <FaFolder />
                </IconContext.Provider>
                Volver
              </ButtonCustom>
            )}
          </div>
          <div className="row">
            <div className="col-12">
              <GridFolders>
                {publicFoldersReducer.folders &&
                  publicFoldersReducer.folders.map((folder) => (
                    <DocsItem
                      folder={folder}
                      key={folder.id}
                      hanldeEnterFolder={hanldeEnterFolder}
                    />
                  ))}
                {publicFilesReducer.files &&
                  publicFilesReducer.files.map((file) => (
                    <DocsItem
                      is_file
                      file={file}
                      key={file.id}
                      hanldeEnterFolder={hanldeEnterFolder}
                    />
                  ))}
              </GridFolders>
              {publicFilesReducer.isLoading ||
                (publicFoldersReducer.isLoading && <span>Cargando...</span>)}
            </div>
          </div>
        </ContainerWrapper>
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
  grid-template-columns: repeat(7, 1fr);

  @media screen and (max-width: 1200px) {
    grid-template-columns: repeat(5, 1fr);
  }
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(4, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;
