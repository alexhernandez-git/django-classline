import React, { useRef, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { useDrag, useDrop } from "react-dnd";
import { IconContext } from "react-icons";
import { ItemTypes } from "../ItemTypes/ItemTypes";
import {
  FaAlignLeft,
  FaEdit,
  FaFileAlt,
  FaFileVideo,
  FaGripLines,
  FaPlus,
  FaTimes,
  FaTrash,
  FaVideo,
} from "react-icons/fa";
import {
  MdAdd,
  MdEdit,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdModeEdit,
} from "react-icons/md";
import { SiAddthis } from "react-icons/si";
import { GrCirclePlay, GrTextAlignFull } from "react-icons/gr";
import { ButtonCustom } from "../ui/ButtonCustom";
import { AdminForm } from "../ui/AdminForm";
import CardItemContent from "./CardItemContent";

import { useDispatch } from "react-redux";
import { setIsItemFree } from "src/redux/actions/courses/items";

// import VideoList from "./VideoList";
const CardItemDrag = ({
  moveCard,
  id,
  index,
  item,
  card,
  newItem,
  setNewItem,
  handleCreateItem,
  handleRemoveItem,
  itemCards,
  handleEditItem,
}) => {
  const dispatch = useDispatch();
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.CARD,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });
  const [{ isDragging }, drag] = useDrag({
    item: { type: ItemTypes.CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const [isOpen, setIsOpen] = useState(false);
  const handleToggleOpen = () => {
    setIsOpen(!isOpen);
  };
  const [addContent, setAddContent] = useState(false);
  const handleAddContent = (e) => {
    e.preventDefault();
    setAddContent(true);
    setIsOpen(true);
  };
  const handleCloseAddContent = (e) => {
    e.preventDefault();
    setAddContent(false);
    setIsOpen(false);
  };
  const [isNameEdit, setIsNameEdit] = useState(false);

  const [newName, setNewName] = useState(item.name);

  const handleCancelEditItem = () => {
    setNewName(item.name);
    setIsNameEdit(false);
  };
  useEffect(() => {
    handleCancelEditItem();
  }, [itemCards]);
  const handleThisEditItem = (e, id, name) => {
    e.preventDefault();
    handleEditItem(id, name);
  };
  const [isFree, setIsFree] = useState(item.is_free ? item.is_free : false);
  const handleChangeIsItemFree = (e) => {
    e.preventDefault();
    dispatch(setIsItemFree(item.code, e.target.checked));
    setIsFree(e.target.checked);
  };
  return (
    <PlaylistVideo style={{ opacity }} ref={ref} moveCard={moveCard}>
      {card?.is_new ? (
        <>
          {!newItem.name && !newItem.type_choices ? (
            <div className="d-flex align-items-center justify-content-around">
              <div
                className="cursor-pointer d-flex align-items-center"
                onClick={() => setNewItem({ ...newItem, type_choices: "LE" })}
              >
                <IconContext.Provider
                  value={{
                    size: 20,
                    className: "global-class-name mx-2 cursor-pointer",
                  }}
                >
                  <SiAddthis />
                </IconContext.Provider>
                <span className="font-weight-bold">Lección</span>
              </div>
              {/* <div
                className="cursor-pointer d-flex align-items-center"
                onClick={() => setNewItem({ ...newItem, type_choices: "TX" })}
              >
                <IconContext.Provider
                  value={{
                    size: 20,
                    className: "global-class-name mx-2 cursor-pointer",
                  }}
                >
                  <SiAddthis />
                </IconContext.Provider>
                <span className="font-weight-bold">Test</span>
              </div> */}
            </div>
          ) : (
            <AdminForm>
              {newItem.type_choices == "LE" ? (
                <>
                  <form onSubmit={(e) => handleCreateItem(e)}>
                    <div className="new-element-div">
                      <label htmlFor="">Nueva lección</label>
                      <input
                        type="text"
                        name=""
                        id=""
                        autoFocus
                        value={newItem.name}
                        onChange={(e) =>
                          setNewItem({ ...newItem, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="d-flex justify-content-end mt-3">
                      <ButtonCustom type="submit">Crear</ButtonCustom>
                    </div>
                  </form>
                </>
              ) : (
                <></>
              )}
            </AdminForm>
          )}
        </>
      ) : (
        <>
          {isNameEdit ? (
            <>
              {item.type_choices == "LE" && "Lección"} {index + 1}:{" "}
              <AdminForm>
                <div className="my-3">
                  <input
                    type="text"
                    value={newName}
                    autoFocus
                    onChange={(e) => setNewName(e.target.value)}
                  />
                </div>
                <div className="d-sm-flex mt-2 justify-content-end">
                  <ButtonCustom
                    className="mr-2"
                    onClick={(e) => handleThisEditItem(e, item.code, newName)}
                  >
                    Editar
                  </ButtonCustom>
                  <ButtonCustom onClick={handleCancelEditItem}>
                    Cancelar
                  </ButtonCustom>
                </div>
              </AdminForm>
            </>
          ) : (
            <>
              <div className="d-sm-flex justify-content-between align-items-center">
                <div className="d-flex justify-content-between">
                  <div className="d-flex align-items-center">
                    {item.type_choices == "LE" && "Lección"} {index + 1}:{" "}
                    {item.type_choices == "LE" &&
                      item?.content?.type_choices == "VI" && (
                        <IconContext.Provider
                          value={{
                            size: 14,
                            className: "global-class-name mx-2 cursor-pointer",
                          }}
                        >
                          <GrCirclePlay />
                        </IconContext.Provider>
                      )}
                    {item.type_choices == "LE" &&
                      item?.content?.type_choices == "TX" && (
                        <IconContext.Provider
                          value={{
                            size: 14,
                            className: "global-class-name mx-2 cursor-pointer",
                          }}
                        >
                          <GrTextAlignFull />
                        </IconContext.Provider>
                      )}
                    {/* {item.type_choices == "LE" &&
                    item?.content?.type_choices == "FI" && (
                      <IconContext.Provider
                      value={{
                        size: 14,
                        className: "global-class-name mx-2 cursor-pointer",
                      }}
                      >
                      <GrDocumentText />
                      </IconContext.Provider>
                    )} */}
                    {item.name}
                    <div className="item-actions">
                      <IconContext.Provider
                        value={{
                          size: 14,
                          className: "global-class-name ml-4 cursor-pointer",
                        }}
                      >
                        {" "}
                        <FaEdit onClick={() => setIsNameEdit(true)} />
                      </IconContext.Provider>
                      <IconContext.Provider
                        value={{
                          size: 14,
                          className: "global-class-name ml-4 cursor-pointer",
                        }}
                      >
                        {" "}
                        <FaTrash
                          onClick={(e) => handleRemoveItem(e, item.code)}
                        />
                      </IconContext.Provider>
                    </div>
                  </div>
                  <IconContext.Provider
                    value={{
                      size: 22,
                      className:
                        "global-class-name mr-3 cursor-pointer d-block d-sm-none",
                    }}
                  >
                    {isOpen ? (
                      <MdKeyboardArrowUp onClick={handleToggleOpen} />
                    ) : (
                      <MdKeyboardArrowDown onClick={handleToggleOpen} />
                    )}
                  </IconContext.Provider>
                </div>
                <div className="d-flex align-items-center">
                  {item?.content?.type_choices != "VI" &&
                  item?.content?.type_choices != "TX" ? (
                    <div className="mr-3">
                      {addContent ? (
                        <>
                          <ButtonCustom
                            className="align-items-center"
                            onClick={(e) => {
                              handleCloseAddContent(e);
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                size: 12,
                                className: "global-class-name mr-2",
                              }}
                            >
                              <FaTimes />
                            </IconContext.Provider>
                            Cerrar
                          </ButtonCustom>
                        </>
                      ) : (
                        <>
                          <ButtonCustom
                            className="align-items-center"
                            onClick={(e) => {
                              handleAddContent(e);
                            }}
                          >
                            <IconContext.Provider
                              value={{
                                size: 12,
                                className: "global-class-name mr-2",
                              }}
                            >
                              <FaPlus />
                            </IconContext.Provider>
                            Contenido
                          </ButtonCustom>
                        </>
                      )}
                    </div>
                  ) : (
                    <>
                      <div className="d-flex justify-content-center align-items-center mr-3">
                        <CheckboxCustom>
                          <input
                            name={`free-content-${item.id}`}
                            id={`free-content-${item.id}`}
                            type="checkbox"
                            checked={isFree}
                            onChange={(e) => handleChangeIsItemFree(e)}
                          />
                          <span className="checkmark"></span>
                        </CheckboxCustom>
                        <label htmlFor={`free-content-${item.id}`}>
                          <small>Contenido gratuito</small>
                        </label>
                      </div>

                      <IconContext.Provider
                        value={{
                          size: 22,
                          className:
                            "global-class-name mr-3 cursor-pointer d-none d-sm-block",
                        }}
                      >
                        {isOpen ? (
                          <MdKeyboardArrowUp onClick={handleToggleOpen} />
                        ) : (
                          <MdKeyboardArrowDown onClick={handleToggleOpen} />
                        )}
                      </IconContext.Provider>
                    </>
                  )}
                  {/* <IconContext.Provider
                value={{
                  size: 22,
                  className: "global-class-name",
                }}
                >
                <FaGripLines />
              </IconContext.Provider> */}
                </div>
              </div>
            </>
          )}
          {isOpen && (
            <CardItemContent
              addContent={addContent}
              item={item}
              setAddContent={setAddContent}
            />
          )}
        </>
      )}
    </PlaylistVideo>
  );
};

const PlaylistVideo = styled.div`
  padding: 1rem;
  background: #fff;
  margin: 1rem 0;
  border: 1px solid #ccc;
  border-radius: 0.5rem;
  .item-actions {
    display: none;
  }
  .item-content {
    display: grid;
    grid-template-columns: 100px 1fr;
  }
  &:hover {
    .item-actions {
      display: flex;
    }
  }
  .new-element-div {
    display: flex;
    align-items: center;
    label {
      min-width: 140px;
      margin-bottom: 0;
    }
  }
`;
export const CheckboxCustom = styled.label`
  display: block;
  position: relative;
  top: -7.7px;
  padding-left: 26px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  input {
    position: absolute;
    opacity: 0;
    cursor: pointer;
    height: 0;
    width: 0;
  }
  .checkmark {
    position: absolute;
    top: 0;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 0.5rem;
  }
  &:hover input ~ .checkmark {
    background-color: #ccc;
  }
  input:checked ~ .checkmark {
    background-color: #000;
  }
  .checkmark:after {
    content: "";
    position: absolute;
    display: none;
  }
  input:checked ~ .checkmark:after {
    display: block;
  }
  .checkmark:after {
    left: 6px;
    top: 4.5px;
    width: 8px;
    height: 8px;
    border: solid white;
    border-width: 0 3px 3px 0;
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
    -ms-transform: rotate(45deg);
    transform: rotate(45deg);
  }
`;
export default CardItemDrag;
