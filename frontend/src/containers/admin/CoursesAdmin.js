import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { ButtonCustom } from "src/components/ui/ButtonCustom";

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import PackCard from "../../components/PackAcademy/PackCard";
import styled from "@emotion/styled";
import { createPack, fetchPacks, fetchPacksPagination } from "../../redux/actions/packs";
const CoursesAdmin = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory()
  const main = useRef();

  const { program } = useParams();
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchPacks = () => dispatch(fetchPacks());
      dispatchFetchPacks();
    }
  }, [programReducer.isLoading]);
  const packsReducer = useSelector((state) => state.packsReducer);

  const [search, setSearch] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const dispatchFetchPacks = (search) => dispatch(fetchPacks(search));
    dispatchFetchPacks(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchPacksPagination = (url) =>
    dispatch(fetchPacksPagination(url));
  dispatchFetchPacksPagination(url);
  };
  const handleCreatePack = () =>{
    const dispatchCreatePack = (history) =>{
      dispatch(createPack(history))
    }
    dispatchCreatePack(history)
  }
  return (
    <Main padding ref={main}>
        <ContainerWrapper>
      <Filters
        title="Cursos"
        placeholder="Buscar curso"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />
      <div className="d-flex justify-content-end mb-3">
          <ButtonCustom onClick={handleCreatePack}>
            Nuevo curso
          </ButtonCustom>
      </div>
          <div className="row">
            <div className="col-12">
              <GridVideos>
              {packsReducer.packs &&
                packsReducer.packs.results.map((pack) => (
                  <PackCard
                    pack={pack}
                    key={pack.id}
                  />
                ))}
     
              </GridVideos>
              {packsReducer.isLoading && <span>Cargando...</span>}
      {packsReducer.packs &&
        (packsReducer.packs.previous ||
          packsReducer.packs.next) && (
          <div className="d-flex justify-content-center my-5">
            {packsReducer.packs.previous ? (
              <IconContext.Provider
                value={{
                  size: 50,
                  className: "cursor-pointer",
                }}
              >
                <IoIosArrowDropleft
                  onClick={() =>
                    handleChangePage(packsReducer.packs.previous)
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
            {packsReducer.packs.next ? (
              <IconContext.Provider
                value={{
                  size: 50,
                  className: "cursor-pointer",
                }}
              >
                <IoIosArrowDropright
                  onClick={() =>
                    handleChangePage(packsReducer.packs.next)
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
  );
};
export const GridVideos = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;

  grid-template-columns: repeat(3, 1fr);
  @media screen and (max-width: 992px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr);
  }
`;
export default CoursesAdmin;
