import React, { useRef, useState, useEffect } from "react";
import {
  fetchFolders,
  removeCurrentFolder,
  setCurrentFolder,
} from "../../redux/actions/moveFolders";
import { useSelector, useDispatch } from "react-redux";
import styled from "@emotion/styled";
import DocsItem from "../ui/DocsItem";
import { ButtonCustom } from "../ui/ButtonCustom";
import { IconContext } from "react-icons/lib";
import { FaFolder } from "react-icons/fa";

const MoveDocsItems = (props) => {
  const { doc } = props;
  const dispatch = useDispatch();
  const moveFoldersReducer = useSelector((state) => state.moveFoldersReducer);

  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchFolders = () => dispatch(fetchFolders());
      dispatchFetchFolders();
    }
  }, []);
  const hanldeEnterFolder = (folder) => {
    dispatch(setCurrentFolder(folder.id));
    dispatch(fetchFolders());
  };
  const hanldeEnterTopFolder = () => {
    dispatch(removeCurrentFolder());
    dispatch(fetchFolders());
  };
  return (
    <div className="p-4">
      <div>
        {moveFoldersReducer.current_folders.length > 0 ? (
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
        ) : (
          <ButtonCustom
            style={{ opacity: 0.2 }}
            type="button"
            className="d-flex align-items-center mr-3 justify-content-center cursor-no-pointer"
          >
            <IconContext.Provider
              value={{
                className: "mr-2",
                color: "#fff",
              }}
            >
              <FaFolder />
            </IconContext.Provider>
            Volver
          </ButtonCustom>
        )}
      </div>

      <hr />
      <div className="row">
        <div className="col-12">
          <GridFolders>
            {moveFoldersReducer.folders &&
              moveFoldersReducer.folders.map((folder) => (
                <DocsItem
                  folder={folder}
                  key={folder.id}
                  hanldeEnterFolder={hanldeEnterFolder}
                />
              ))}
          </GridFolders>
          {moveFoldersReducer.isLoading && <span>Cargando...</span>}
        </div>
      </div>
    </div>
  );
};
export const GridFolders = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;
  grid-template-columns: repeat(5, 1fr);

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

export default MoveDocsItems;
