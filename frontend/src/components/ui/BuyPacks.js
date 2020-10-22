import React, { useRef, useState, useEffect } from "react";
import Layout from "src/components/Layout/Layout";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
import { ButtonCustomGradient } from "src/components/ui/ButtonCustom";

import { Link, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ContainerWrapper from "src/components/ui/Container";

import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { IconContext } from "react-icons";
import PackCard from "../../components/AdminAcademy/PackCard";
import styled from "@emotion/styled";
import BuyPackCard from "../AdminAcademy/BuyPackCard";
import { fetchBuyPacksPagination, fetchMyPacks, fetchPublishedPacks,setSelectedPack } from "../../redux/actions/buyPacks";
const PacksAdmin = () => {
  const MySwal = withReactContent(Swal);
  const history = useHistory()
  const main = useRef();
  const { push } = useHistory();

  const { program } = useParams();
  const dispatch = useDispatch();
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchPacks = () => dispatch(fetchPublishedPacks());
      dispatchFetchPacks();
    }
  }, [programReducer.isLoading]);
  const buyPacksReducer = useSelector((state) => state.buyPacksReducer);
  const authReducer = useSelector((state) => state.authReducer);
  
  const [showMyPacks, setShowMyPacks] = useState(false);
  
   const handleChangePage = (url) => {
     main.current.scrollTo(0, 0);
 
     dispatch(fetchBuyPacksPagination(url, showMyPacks));
   };
  const handleFetchPublishedPacks = () =>{
    dispatch(fetchPublishedPacks(setShowMyPacks));
  }
  const handleFetchMyPacks = () =>{
    dispatch(fetchMyPacks(setShowMyPacks));

  }
  const goToLogin = () =>{
    push(`/academy/${programReducer.program.code}/packs-login`);
  }
  const handleClickOnPack=(pack) =>{
    dispatch(setSelectedPack(pack));
    push(`/academy/${programReducer.program.code}/pack/detail`)
  }
  return (
    <div
    className="mb-5 pb-5"
    style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.1)" }}
  >
    <ContainerWrapper>
      <Filters
        title={showMyPacks ? "Mis Packs" : "Packs Publicados"}
      />
      <div className="d-flex justify-content-end mb-3">
        {showMyPacks ? 
             <ButtonCustomGradient          
             onClick={handleFetchPublishedPacks}>
               Ir a Packs Publicados
             </ButtonCustomGradient>
        :
          <ButtonCustomGradient          
          onClick={() =>
            authReducer.isAuthenticated
              ? handleFetchMyPacks()
              : goToLogin()
          }>
            Ir a Mis Packs
          </ButtonCustomGradient>
        }
      </div>
          <div className="row">
            <div className="col-12">
              <GridVideos>
              {buyPacksReducer.packs &&
                buyPacksReducer.packs.results.map((pack) => (
                  <BuyPackCard
                    pack={pack}
                    key={pack.id}
                    handleClickOnPack={handleClickOnPack}
                  />
                ))}
     
              </GridVideos>
              {buyPacksReducer.isLoading && <span>Cargando...</span>}
      {buyPacksReducer.packs &&
        (buyPacksReducer.packs.previous ||
          buyPacksReducer.packs.next) && (
          <div className="d-flex justify-content-center my-5">
            {buyPacksReducer.packs.previous ? (
              <IconContext.Provider
                value={{
                  size: 50,
                  className: "cursor-pointer",
                }}
              >
                <IoIosArrowDropleft
                  onClick={() =>
                    handleChangePage(buyPacksReducer.packs.previous)
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
            {buyPacksReducer.packs.next ? (
              <IconContext.Provider
                value={{
                  size: 50,
                  className: "cursor-pointer",
                }}
              >
                <IoIosArrowDropright
                  onClick={() =>
                    handleChangePage(buyPacksReducer.packs.next)
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
        </div>
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
export default PacksAdmin;
