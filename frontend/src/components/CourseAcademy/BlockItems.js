import React, { useState, useRef, useEffect, useCallback } from "react";
import { ButtonStyle, ButtonCustomError } from "src/components/ui/ButtonCustom";
import { Form, Row, Col, Modal } from "react-bootstrap";
import { IconContext } from "react-icons";
import Filters from "src/components/Layout/Filters";

import { FaPlus, FaTrash } from "react-icons/fa";
import { MdPlaylistAdd, MdClose, MdAdd } from "react-icons/md";
import { AdminForm } from "src/components/ui/AdminForm";
import VideoList from "src/components/ui/VideoList";
import styled from "@emotion/styled";
import DndVideoList from "src/components/ui/DndVideoList";
import SearchBar from "src/components/ui/SearchBar";
import { fetchVideos, fetchVideosIncrease } from "src/redux/actions/videos";
import { useDispatch, useSelector } from "react-redux";

import { Field } from "formik";
import { ButtonCustom } from "../ui/ButtonCustom";
import useOutsideClick from "../../hooks/useOutsideClick";
import CardItemDrag from "./CardItemDrag";
import update from "immutability-helper";

const BlocksItems = (props) => {
  const dispatch = useDispatch();
  const inputFileVideo = useRef(null);
  const inputFileImg = useRef(null);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const handleToggleAddVideo = () => {
    setIsAddVideoOpen((isAddVideoOpen) => (isAddVideoOpen ? false : true));
  };
  const programReducer = useSelector((state) => state.programReducer);

  useEffect(() => {
    if (!programReducer.isLoading && programReducer.program) {
      const dispatchFetchVideos = () => dispatch(fetchVideos());
      dispatchFetchVideos();
    }
  }, [programReducer.isLoading]);
  const videosReducer = useSelector((state) => state.videosReducer);

  const handleAddVideo = (video) => {
    setItemCards((itemCards) => [
      ...itemCards,
      {
        id: Math.random().toString(36).substring(7),
        video: video,
        position: itemCards.length,
      },
    ]);
    setIsAddVideoOpen(false)

  };
  useEffect(() => {
    console.log(itemCards);
  }, [itemCards]);


  const handleDeleteTrackVideo = (id) => {
    setItemCards((itemCards) => itemCards.filter((card) => card.id !== id));
  };
  const [search, setSearch] = useState("");

  const handleSubmitSearch = (e) => {
    e.preventDefault();
    const dispatchFetchVideos = (search) => dispatch(fetchVideos(search));
    dispatchFetchVideos(search);
  };
  const [limit, setLimit] = useState(12);
  const fetchMoreVideos = () => {
    const dispatchFetchVideosIncrease = (limit, search) =>
      dispatch(fetchVideosIncrease(limit, search));
    dispatchFetchVideosIncrease(limit + 12, search);
    setLimit((limit) => limit + 12);
  };
  const addVideoRef = useRef()

  useOutsideClick(addVideoRef, () => {
    setIsAddVideoOpen(false)
  });

  const [itemCards, setItemCards] = useState([
    {
        id: 0,
        position: 0,
        block: {
            name: "Finanzas personales"
        } 
    },
    {
        id: 1,
        position: 1,
        block: {
            name: "Criptomonedas"
        } 
    },
    {
        id:2,
        position:2,
        block: {
            name: "Excel"
        } 
    },
    {
        id: 3,
        position: 3,
        block: {
            name: "Finanzas empresarieales"
        } 
    },

]) 
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = itemCards[dragIndex];
      const hoverCard = itemCards[hoverIndex];
      setItemCards(
        update(itemCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
      setItemCards((itemCards) => {
        return itemCards.map((card) => {
          if (card == hoverCard) {
            card.position = dragIndex;
          }
          if (card == dragCard) {
            card.position = hoverIndex;
          }

          return card;
        });
      });
    },
    [itemCards]
  );
  const renderItemCard = (card, index) => {
    return (
      <CardItemDrag
        key={card.id}
        index={index}
        id={card.id}
        moveCard={moveCard}
        item={card.item}
      />
    );
  };
  return (
    <div className="mt-5">
    <Filters title="Bloque 1: Administración y finanzas" back="Volver"/>
    <div className="row">
      <div className="col-md-6">
        <AdminForm>
          <Row className="my-4">
            <Col
              lg={{ span: 4 }}
              className="text-center d-lg-flex justify-content-end align-items-center"
            >
              <span className="m-0 font-weight-normal">Nombre</span>
            </Col>

            <Col lg={{ offset: 1, span: 6 }}>
              <input type="text" name="name" placeholder="Nombre" />

            </Col>
          </Row>
          <Row className="video-upload mb-4">
            <Col
              lg={{ span: 4 }}
              className="text-center d-lg-flex justify-content-end align-items-center"
            >
              <span className="font-weight-normal">Imagen</span>
            </Col>
            <Col lg={{ offset: 1, span: 6 }}>
              <label htmlFor="img-upload" className="w-100">
                <img
                  controls
                  style={{
                    width: "100%",
                    padding: "5px",
                  }}
                  src={
                    "../../../../../../static/assets/img/no-foto.png"
                  }
                  alt=""
                  className="my-3 border rounded"
                />
              </label>

              {/* <label htmlFor="img-upload" css={ButtonStyle} className="w-100">Subir imágen</label> */}
            </Col>
          </Row>

          {/* <Row className="mb-4">
                        <Col lg={{ span: 4 }} className="text-center d-lg-flex justify-content-end align-items-center">
                            <span className="m-0 font-weight-normal">Descripción</span>

                        </Col>


                        <Col lg={{ offset: 1, span: 6 }}>
                            <textarea name="" id="" cols="30" rows="10" placeholder="Descripción"></textarea>
                        </Col>
                    </Row> */}
        </AdminForm>
      </div>
      <div className="col-md-6 col-xl-5">
        <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
          <span>Contenido</span>
          <div className="d-flex align-items-center cursor-pointer">
            <span>Añadir elemento</span>
             <IconContext.Provider
                value={{
                    size: 16,
                    className: "global-class-name mr-2",
                }}
                >
                <MdAdd />
              </IconContext.Provider>
        </div>
        
        </div>

      {itemCards.map((card, i) => renderItemCard(card, i))}

 
   
      </div>
    </div>
    </div>
  );
};
const VideosForm = styled.form`
  position: absolute;
  z-index: 10000;
  background: #fff;
  width: 100%;
`;
const PlaylistVideo = styled.div`
  padding: 1rem;
  &:hover {
    background: #ececec;
  }
`;
const AddVideoList = styled.div`
  max-height: 40vh;
  overflow: auto;
  border: 1px solid #ccc;
`;
export default BlocksItems;
