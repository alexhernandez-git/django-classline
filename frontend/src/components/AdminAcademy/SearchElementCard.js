import styled from "@emotion/styled";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import moment from "moment";
import { IconContext } from "react-icons/lib";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaListUl, FaPodcast, FaSearch } from "react-icons/fa";
import React, { useState,useRef} from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Link, useHistory, useParams } from "react-router-dom";
import SearchBar from "../ui/SearchBar";
import {useSelector} from "react-redux"

const SearchElementCard = (props) => {
  const [active, setActive] = useState(false)
  const {program} = useParams()
  const history = useHistory()
  const ref = useRef();
  const {searchVideos, searchPlaylists, searchPodcasts} = props
  const topicsReducer = useSelector(state => state.topicsReducer)
  useOutsideClick(ref, () => {
    setActive(false)
  });
  const [search, setSearch] = useState("")
  const handleSearchSubmit = () =>{
    if (searchVideos) {
      history.push({pathname: `/academy/${program}/videos`, state: {search: search}})
    }
    if (searchPlaylists) {
      history.push({pathname: `/academy/${program}/playlists`, state: {search: search}}) 
    }
    if (searchPodcasts) {
      history.push({pathname: `/academy/${program}/podcasts`, state: {search: search}})
    }
  }
  return (
    <Element onClick={()=>setActive(true)} ref={ref}>
      {searchVideos && 
        <div>
          <IconContext.Provider
          value={{
            className: "sidebar-icon",
          }}
          >
            <BsFillCollectionPlayFill />
          </IconContext.Provider>{" "}
          Buscar en Videos
        </div>
      }
      {searchPlaylists && 
        <div>
          <IconContext.Provider
          value={{
            className: "sidebar-icon",
          }}
          >
            <FaListUl />
          </IconContext.Provider>{" "}
          Buscar en Playlists
        </div>
      }
        {searchPodcasts && 
        <div>
          <IconContext.Provider
          value={{
            className: "sidebar-icon",
          }}
          >
            <FaPodcast />
          </IconContext.Provider>{" "}
          Buscar en Podcasts
        </div>
      }
        {active && 
        <div className="hidden-div">
        <SearchBar
            placeholder={searchVideos && "Buscar en Videos" || 
                        searchPlaylists && "Buscar en Playlists" || 
                        searchPodcasts && "Buscar en Podcasts"}
            search={{search: search, setSearch: setSearch}}
            onSubmit={handleSearchSubmit} 
          />
        
          <div className="div-results">
            <BadgesContainer>
                {topicsReducer.topics && topicsReducer.topics.results.map(topic =>(
                    <Link key={topic.id} to={`/academy/${program}/${topic.code}/${searchVideos && "videos" || searchPlaylists && "playlists" || searchPodcasts && "podcasts"}`}>
                      <Badge>
                        <small css={textEllipsis}>
                            {topic.name && topic.name}
                        </small>
                      </Badge>
                    </Link>
                    )
                  )}

              </BadgesContainer>
              </div>
        </div>
      }
    </Element>
  );
};

const Element = styled.div`
cursor:pointer;
  padding:1rem;
  color: #323840;
  display:flex;
  justify-content: center;
  align-items:center;
  text-align:center;
  max-width: 30rem;
  width: 100%;
  display: block;
  border-radius: 2rem;
  position:relative;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  &:hover img {
    transform: scale(1.03);
  }
  margin: 2rem;
 
  .hidden-div{
    background: #fff;
    position:  absolute;
    top: 0;
    left: 0;
    cursor: initial;
    padding:1rem;
    color: #323840;
    display:flex;
    justify-content: center;
    align-items:center;
    max-width: 30rem;
    width: 100%;
    display: block;
    border-radius: 2rem;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    height: max-content;
    z-index: 50;
  }
  .div-results{
    background: #fff;
    color: #323840;

  }
  @media screen and (max-width: 576px) {
    max-width: none;
    margin: 2rem 0;
    .hidden-div{
      max-width: none;
    }
  }
`

const BadgesContainer = styled.div`  
  display: flex;
  flex-flow: wrap;
  margin-top: 1rem;
`;
const Badge = styled.div`
  cursor:pointer;
  padding:1rem;
  color: #323840;
  width: max-content;
  border-radius: 2rem;
  overflow: hidden;
  margin: .5rem;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  &:hover img {
    transform: scale(1.03);
  }
`
export default SearchElementCard;
