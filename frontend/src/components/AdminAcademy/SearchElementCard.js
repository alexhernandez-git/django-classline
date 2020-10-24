import styled from "@emotion/styled";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import moment from "moment";
import { IconContext } from "react-icons/lib";
import { BsFillCollectionPlayFill } from "react-icons/bs";
import { FaListUl, FaPodcast, FaSearch } from "react-icons/fa";
import React, { useState,useRef} from "react";
import useOutsideClick from "../../hooks/useOutsideClick";
import { Link, useParams } from "react-router-dom";
import SearchBar from "../ui/SearchBar";


const SearchElementCard = (props) => {
  const [active, setActive] = useState(false)
  const {program} = useParams()
  const ref = useRef();
  const {searchVideos, searchPlaylists, searchPodcasts, search} = props
  useOutsideClick(ref, () => {
    setActive(false)
  });
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
            search={search}
          />
        
          <div className="div-results">
            <BadgesContainer>
                <Link to={`/academy/${program}/fewefwafeaw/${searchVideos && "videos" || searchPlaylists && "playlists" || searchPodcasts && "podcasts"}`}>
                  <Badge>
                    <small>
                        Comida sana
                    </small>
                  </Badge>
                </Link>
                <Link to={`/academy/${program}/fewefwafeaw/${searchVideos && "videos" || searchPlaylists && "playlists" || searchPodcasts && "podcasts"}`}>
                  <Badge>
                    <small>
                        Yoga
                    </small>
                  </Badge>
                </Link>
                <Link to={`/academy/${program}/fewefwafeaw/${searchVideos && "videos" || searchPlaylists && "playlists" || searchPodcasts && "podcasts"}`}>
                  <Badge>
                    <small>
                        Meditación
                    </small>
                  </Badge>
                </Link>
              
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
const Search = styled.div`
  display: flex;
  justify-content: center;
  input{
    padding:1rem 1rem 1rem 2rem;

    max-width:30rem;
    width: 100%;
    display: block;
    border-radius: 2rem 0 0 2rem;

    overflow: hidden;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border:none;
  }
  button{
    padding:1rem;
    max-width:5rem;
    width: 100%;
    display: block;
    border-radius: 0 2rem  2rem 0;
    overflow: hidden;
    box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
    border:none;
  }
  button:hover{
    opacity: 0.7;
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
