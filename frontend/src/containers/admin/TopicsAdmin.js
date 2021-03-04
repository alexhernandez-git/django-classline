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
import TopicCard from "../../components/AdminAcademy/TopicCard";
import styled from "@emotion/styled";
import { createTopic, fetchTopics, fetchTopicsPagination } from "../../redux/actions/topics/topics";
const TopicsAdmin = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory()
  const main = useRef();

  const { program } = useParams();
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchTopics = () => dispatch(fetchTopics());
      dispatchFetchTopics();
    }
  }, [programReducer.isLoading]);
  const topicsReducer = useSelector((state) => state.topicsReducer);

  const [search, setSearch] = useState("");
  const handleSubmitSearch = (e) => {
    e.preventDefault();

    const dispatchFetchTopics = (search) => dispatch(fetchTopics(search));
    dispatchFetchTopics(search);
  };
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchTopicsPagination = (url) =>
    dispatch(fetchTopicsPagination(url));
  dispatchFetchTopicsPagination(url);
  };
  const handleCreateTopic = () =>{
    const dispatchCreateTopic = (history) =>{
      dispatch(createTopic(history))
    }
    dispatchCreateTopic(history)
  }
  return (
    <Main padding ref={main}>
        <ContainerWrapper>
      <Filters
        title="Temas"
        placeholder="Buscar Tema"
        search={{ search: search, setSearch: setSearch }}
        onSubmit={handleSubmitSearch}
      />
      <div className="d-flex justify-content-end mb-3">
          <ButtonCustom onClick={handleCreateTopic}>
            Nuevo Tema
          </ButtonCustom>
      </div>
          <div className="row">
            <div className="col-12">
              <GridTopics>
              {topicsReducer.topics &&
                topicsReducer.topics.results.map((topic) => (
                  <TopicCard
                    topic={topic}
                    key={topic.id}
                  />
                ))}
     
              </GridTopics>
      {topicsReducer.isLoading && <span>Cargando...</span>}
      {topicsReducer.topics &&
        (topicsReducer.topics.previous ||
          topicsReducer.topics.next) && (
          <div className="d-flex justify-content-center my-5">
            {topicsReducer.topics.previous ? (
              <IconContext.Provider
                value={{
                  size: 50,
                  className: "cursor-pointer",
                }}
              >
                <IoIosArrowDropleft
                  onClick={() =>
                    handleChangePage(topicsReducer.topics.previous)
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
            {topicsReducer.topics.next ? (
              <IconContext.Provider
                value={{
                  size: 50,
                  className: "cursor-pointer",
                }}
              >
                <IoIosArrowDropright
                  onClick={() =>
                    handleChangePage(topicsReducer.topics.next)
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
export const GridTopics = styled.div`
  display: grid;
  grid-gap: 4rem 2rem;


  grid-template-columns: repeat(4, 1fr);
  
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
export default TopicsAdmin;
