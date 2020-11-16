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
import { Formik, Form as FormFormik, Field } from "formik";

import { ButtonCustom } from "../ui/ButtonCustom";
import useOutsideClick from "../../hooks/useOutsideClick";
import CardItemDrag from "./CardItemDrag";
import update from "immutability-helper";
import { useHistory, useParams } from "react-router-dom";
import {
  fetchBlock,
  removeBlock,
  saveBlock,
} from "../../redux/actions/courses/block";
import BlockPresentation from "./BlockPresentation";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import {
  createItem,
  fetchItems,
  removeItem,
  saveItem,
} from "../../redux/actions/courses/items";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";
import { Main } from "src/components/ui/Main";
import { Padding } from "src/components/ui/Padding";

const BlocksItems = (props) => {
  const dispatch = useDispatch();
  const MySwal = withReactContent(Swal);

  const inputFileVideo = useRef(null);
  const inputFileImg = useRef(null);
  const [isAddVideoOpen, setIsAddVideoOpen] = useState(false);
  const history = useHistory();
  const courseReducer = useSelector((state) => state.courseReducer);
  const blockReducer = useSelector((state) => state.blockReducer);
  const itemsReducer = useSelector((state) => state.itemsReducer);
  const { program, course, block } = useParams();
  useEffect(() => {
    console.log(courseReducer.course);
    if (!courseReducer.course) {
      history.push(`/academy/${program}/admin/course/${course}`);
    } else {
      const dispatchFetchBlock = (block) => dispatch(fetchBlock(block));
      dispatchFetchBlock(block);
    }
  }, []);
  useEffect(() => {
    if (!blockReducer.isLoading && blockReducer.block) {
      const dispatchFetchItems = () => dispatch(fetchItems());
      dispatchFetchItems();
    }
  }, [blockReducer.isLoading]);
  const addVideoRef = useRef();

  useOutsideClick(addVideoRef, () => {
    setIsAddVideoOpen(false);
  });

  const [itemCards, setItemCards] = useState([]);
  useEffect(() => {
    if (!itemsReducer.isLoading) {
      setItemCards(itemsReducer.items);
    }
  }, [itemsReducer.isLoading, itemsReducer.items]);

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
  const hanldeRemoveBlock = (e) => {
    e.preventDefault();
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(removeBlock(history));
      }
    });
  };
  const handleAddItem = () => {
    console.log(itemCards);
    let result = 0;
    if (itemCards.length > 0) {
      result = Math.max.apply(
        Math,
        itemCards.map(function (o) {
          return o.position;
        })
      );
      result + 1;
    }
    console.log(result);
    setItemCards((itemCards) => [
      ...itemCards,
      {
        is_new: true,
        position: result,
        item: {
          name: "",
          type_choices: null,
        },
        id: Math.random().toString(36).substring(7),
        code: Math.random().toString(36).substring(7),
      },
    ]);
  };
  const [newItem, setNewItem] = useState({
    name: "",
    type_choices: "",
  });
  const handleCreateItem = (e) => {
    e.preventDefault();
    dispatch(createItem(newItem));
  };
  const handleDeleteItem = (e, item) => {
    e.preventDefault();
    MySwal.fire({
      title: "Estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.value) {
        dispatch(removeItem(item));
      }
    });
  };

  const handleEditItem = (id, name) => {
    dispatch(saveItem(id, name));
  };
  useEffect(() => {
    setNewItem({
      name: "",
      type_choices: "",
    });
  }, [itemCards]);
  const renderItemCard = (card, index) => {
    return (
      <CardItemDrag
        key={card.id}
        index={index}
        id={card.id}
        moveCard={moveCard}
        item={card.item}
        card={card}
        newItem={newItem}
        setNewItem={setNewItem}
        handleCreateItem={handleCreateItem}
        handleEditItem={handleEditItem}
        handleRemoveItem={handleDeleteItem}
        itemCards={itemCards}
      />
    );
  };

  return blockReducer.isLoading ? (
    "Cargando..."
  ) : (
    <Main>
      <Padding>
        <DndProvider backend={HTML5Backend}>
          <div className="mt-5">
            <Formik
              enableReinitialize={true}
              initialValues={{
                name: blockReducer.block.name,
                description: blockReducer.block.description,
              }}
              onSubmit={(values) => {
                console.log(values);
                const dispatchSaveBlock = (block, itemCards) =>
                  dispatch(saveBlock(block, itemCards));
                dispatchSaveBlock(values, itemCards);
              }}
            >
              {(props) => {
                return (
                  <FormFormik>
                    <Filters
                      title={blockReducer.block.name}
                      back="Volver"
                      saveButton="Guardar Bloque"
                    />
                    <div className="row">
                      <div className="col-md-6">
                        <AdminForm>
                          <Row className="my-4">
                            <Col
                              lg={{ span: 4 }}
                              className="text-center d-lg-flex justify-content-end align-items-center"
                            >
                              <span className="m-0 font-weight-normal">
                                Nombre
                              </span>
                            </Col>

                            <Col lg={{ offset: 1, span: 6 }}>
                              <Field
                                type="text"
                                name="name"
                                placeholder="Nombre"
                              />
                            </Col>
                          </Row>
                          <Row className="my-4">
                            <Col
                              lg={{ span: 4 }}
                              className="text-center d-lg-flex justify-content-end align-items-center"
                            >
                              <span className="m-0 font-weight-normal">
                                Descripción
                              </span>
                            </Col>

                            <Col lg={{ offset: 1, span: 6 }}>
                              <Field
                                name="description"
                                component="textarea"
                                placeholder="Descripción"
                                style={{ height: "217px" }}
                              />
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
                      <div className="col-md-6">
                        <BlockPresentation />
                        <Row className="my-4">
                          <Col
                            lg={{ span: 4 }}
                            className="text-center d-lg-flex justify-content-end align-items-center"
                          >
                            <span className="m-0 font-weight-normal">
                              Eliminar
                            </span>
                          </Col>

                          <Col lg={{ offset: 1, span: 6 }}>
                            <ButtonCustomError onClick={hanldeRemoveBlock}>
                              Eliminar bloque
                            </ButtonCustomError>
                          </Col>
                        </Row>
                      </div>
                    </div>
                  </FormFormik>
                );
              }}
            </Formik>
            <div className="w-100">
              <div className="d-flex justify-content-between border-bottom pb-2 mb-3">
                <span>Contenido</span>
              </div>

              {itemCards.map((card, i) => renderItemCard(card, i))}
              <AddItem onClick={handleAddItem}>Añadir elemento</AddItem>
            </div>
          </div>
        </DndProvider>
      </Padding>
    </Main>
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
const AddItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 0.5rem;
  border: 1px dashed #ccc;
`;
export default BlocksItems;
