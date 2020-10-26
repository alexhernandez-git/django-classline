import React, { useState, useEffect } from "react";
import { Main } from "src/components/ui/Main";
import styled from "@emotion/styled";
import MainProgramInfo from "src/components/MainPage/MainProgramInfo";
import { textEllipsis } from "src/components/ui/TextEllipsis";

import { useDispatch } from "react-redux";
import { fetchPopularVideos } from "src/redux/actions/popularVideos";
import { fetchPopularPlaylists } from "src/redux/actions/popularPlaylists";
import { fetchPopularPodcasts } from "src/redux/actions/popularPodcasts";
import { useSelector } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { IconContext } from "react-icons/lib";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaListUl, FaPodcast, FaRegCalendarAlt, FaRegPlayCircle, FaSearch } from "react-icons/fa";
import TopicCard from "../components/TopicAcademy/TopicCard";
import SearchElementCard from "../components/AdminAcademy/SearchElementCard";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { useRef } from "react";
import { fetchTopics, fetchTopicsPagination } from "../redux/actions/topics/topics";
import VideoPlayer from "src/components/ui/VideoPlayer";
import { MdFolder, MdFolderShared, MdForum } from "react-icons/md";

export default function Home() {
  const history = useHistory();
  const { program } = useParams();
  const authReducer = useSelector((state) => state.authReducer);
  // useEffect(() => {
  //   console.log("isloading", authReducer.isLoading);
  //   // if (!authReducer.isLoading && !authReducer.isAuthenticated)
  //   // history.push(`/academy/${program}`);
  // }, [authReducer.isLoading]);

  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);
  const topicsReducer = useSelector((state) => state.topicsReducer);

  const [searchVideos, setSearchVideos] = useState("")
  const [searchPlaylists, setSearchPlaylists] = useState("")
  const [searchPodcasts, setSearchPodcasts] = useState("")
  const main = useRef()
  const handleChangePage = (url) => {
    main.current.scrollTo(0, 0);

    const dispatchFetchTopicsPagination = (url) =>
      dispatch(fetchTopicsPagination(url));
    dispatchFetchTopicsPagination(url);
  };
  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchTopics = () => dispatch(fetchTopics());
      dispatchFetchTopics();
    }
  }, [programReducer.isLoading]);
  const [search, setSearch] = useState("")
  const handleSearchSubmit = () =>{
    history.push({pathname: `/academy/${program}/search`, state: {search: search}})
  }
  const [isPlaying, setIsPlaying] = useState(false)
  return (
    !programReducer.isLoading && (
      <>
        <Main className="text-grey">

                <MainProgramInfo 
                    search={{search: search, setSearch: setSearch}}
                    handleSearchSubmit={handleSearchSubmit} 
                />

          <div className="container mt-5">
            <GridElements className="">
              {programReducer.program.are_videos &&
                <SearchElementCard 
                searchVideos 
                search={{search: searchVideos, setSearch: setSearchVideos}}
                />  
              }
              {programReducer.program.are_admin_playlists && 
                <SearchElementCard 
                searchPlaylists
                search={{search: searchPlaylists, setSearch: setSearchPlaylists}}
                />
              }
              {programReducer.program.are_podcasts &&
                <SearchElementCard 
                searchPodcasts
                search={{search: searchPodcasts, setSearch: setSearchPodcasts}}
                />
              }

            </GridElements>
          </div>
          
          <ImgContainer>
          {programReducer.program.video_presentation ? 
          <>
              {isPlaying ? 
                <>
                <VideoPlayer video={{video:programReducer.program.video_presentation}} />
                
                </>
                :
                <>
            <div className="img-content" onClick={()=>setIsPlaying(true)}>
              <IconContext.Provider

                value={{
                  className: "position-absolute cursor-pointer",
                  color: "#fff",
                  style: {
                    left: "0",
                    right: "0",
                    top: "0",
                    bottom: "0",
                    margin: "auto",
                    fontSize: "4rem",
                    zIndex: "100",
                  },
                }}
                >
                <div>
                  <FaRegPlayCircle />
                </div>
              </IconContext.Provider>
              <small>Ver video presentación</small>
            </div>
            <img className="img-video" src={programReducer.program && programReducer.program.picture} />
             </>
             }
             </>
             :
            <img className="img-picture" src={programReducer.program && programReducer.program.picture} />

          }
          </ImgContainer>
          {(programReducer.program.are_meetups || programReducer.program.are_docs || programReducer.program.are_forum) ?
            <ToolsList>
             {programReducer.program.are_meetups && (

               <Link
                    to={`/academy/${program}/meetups`}
                    >
                    <Tool>
                        <div className="d-flex flex-column justify-content-center align-items-center">
                          <IconContext.Provider
                            value={{
                              size: 30,
                              className: "cursor-pointer",
                            }}
                            >
                            <FaRegCalendarAlt/>
                          </IconContext.Provider>
                          Eventos
                        </div>
                    </Tool>
                  </Link>
             )}
              {programReducer.program.are_docs && (

                <Link
                to={`/academy/${program}/docs`}
                >
                  <Tool>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <IconContext.Provider
                          value={{
                            size: 30,
                            className: "cursor-pointer",
                          }}
                          >
                          <MdFolder/>
                        </IconContext.Provider>
                        Recursos
                      </div>
                  </Tool>
                  </Link>
              )}
              {programReducer.program.are_forum  && (
                <Link
                to={`/academy/${program}/forum`}
                >
                  <Tool>
                      <div className="d-flex flex-column justify-content-center align-items-center">
                        <IconContext.Provider
                          value={{
                            size: 30,
                            className: "cursor-pointer",
                          }}
                          >
                          <MdForum/>
                        </IconContext.Provider>
                        Foro
                      </div>
                  </Tool>
                </Link>
              )}
            </ToolsList>
            
          :
          <div className="m-5 d-flex"></div>
          }
          {topicsReducer.topics && topicsReducer.topics.results && topicsReducer.topics.results.length > 0 && 
            <div className="container">
              <div className="border-bottom mb-3 pb-2 text-center">
                <span>Temas</span>
              </div>
              <TopicsContainer ref={main}>
                {topicsReducer.topics &&
                    topicsReducer.topics.results.map((topic) => (
                      <TopicCard key={topic.id} topic={topic} />
                  ))}
              </TopicsContainer>
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
          }
        </Main>
      </>
    )
  );
}


const GridElements = styled.div`  
/* justify-content: space-between; */
margin-bottom: 2rem;
display: flex;
justify-content: center;
@media screen and (max-width: 576px) {
  display: inline;
  }
`;


const ImgContainer = styled.div`
    max-width:50rem;
    width: 100%;
    border-radius: 2rem;
    margin: 3rem auto;
    overflow: hidden;
    position: relative;
    small{
    position: absolute;
    left: 50%;

    top: 70%;

    transform: translate(-50%,-50%);

    color: #fff;
    z-index: 1;

    }
    .img-video{
      z-index: 1;
      width: 100%;
      display: block;
      border-radius: 2rem;
      overflow: hidden;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      border:none;
      filter: brightness(50%);
    }
    .img-picture{
      z-index: 1;
      width: 100%;
      display: block;
      border-radius: 2rem;
      overflow: hidden;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
      border:none;
    }
`;

const TopicsContainer = styled.div`  
  display: grid;
  grid-gap: 4rem 2rem;
  margin: auto auto 3rem;
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

const ToolsList = styled.div`  
  max-width: 80rem;
  display: flex; 
  justify-content:center;
  flex-wrap: wrap;
`;
const Tool = styled.div`  
  padding: 1rem;
  border-radius: 50%;
  align-items: center;
    justify-content: center;
    display: flex;
  width: 10rem;
  height:10rem;
  color: #606060!important;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  margin: 1rem;
`
