import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useDrag, useDrop } from "react-dnd";
import { IconContext } from "react-icons";
import { ItemTypes } from "../ItemTypes/ItemTypes";
import {
  FaEdit,
  FaFileAlt,
  FaFileVideo,
  FaGripLines,
  FaTrash,
  FaVideo,
} from "react-icons/fa";
import { MdAdd, MdEdit, MdKeyboardArrowDown, MdModeEdit } from "react-icons/md";
import { GrCirclePlay, GrDocumentText, GrFormAdd } from "react-icons/gr";
import { ButtonCustom } from "../ui/ButtonCustom";

// import VideoList from "./VideoList";
const CardItemDrag = ({
  moveCard,
  id,
  index,
  item,
  handleDeleteTrackVideo,
}) => {
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
  return (
    <PlaylistVideo style={{ opacity }} ref={ref} moveCard={moveCard}>
      <div className="d-flex justify-content-between align-items-center">
        <div className="d-flex align-items-center">
          {item.type_choices == "LE" && "Lección"} {index + 1}:{" "}
          {item.type_choices == "LE" && item.content.type_choices == "VI" && (
            <IconContext.Provider
              value={{
                size: 14,
                className: "global-class-name mx-2 cursor-pointer",
              }}
            >
              <GrCirclePlay />
            </IconContext.Provider>
          )}
          {item.type_choices == "LE" && item.content.type_choices == "TE" && (
            <IconContext.Provider
              value={{
                size: 14,
                className: "global-class-name mx-2 cursor-pointer",
              }}
            >
              <GrDocumentText />
            </IconContext.Provider>
          )}
          {item.name}
          <div className="item-actions">
            <IconContext.Provider
              value={{
                size: 14,
                className: "global-class-name ml-4 cursor-pointer",
              }}
            >
              {" "}
              <FaEdit />
            </IconContext.Provider>
            <IconContext.Provider
              value={{
                size: 14,
                className: "global-class-name ml-4 cursor-pointer",
              }}
            >
              {" "}
              <FaTrash onClick={() => handleDeleteTrackVideo(id)} />
            </IconContext.Provider>
          </div>
        </div>
        <div className="d-flex align-items-center">
          <IconContext.Provider
            value={{
              size: 22,
              className: "global-class-name mr-3 cursor-pointer",
            }}
          >
            <MdKeyboardArrowDown />
          </IconContext.Provider>
          <IconContext.Provider
            value={{
              size: 22,
              className: "global-class-name",
            }}
          >
            <FaGripLines />
          </IconContext.Provider>
        </div>
      </div>
      <hr />
      <div className="item-content">
        <div className="d-flex justify-content-center align-items-center">
          {item.type_choices == "LE" && item.content.type_choices == "VI" && (
            <IconContext.Provider
              value={{
                size: 50,
                className: "global-class-name",
              }}
            >
              <FaFileVideo />
            </IconContext.Provider>
          )}
          {item.type_choices == "LE" && item.content.type_choices == "TE" && (
            <IconContext.Provider
              value={{
                size: 50,
                className: "global-class-name",
              }}
            >
              <FaFileAlt />
            </IconContext.Provider>
          )}
        </div>
        <div>
          {item.type_choices == "LE" && item.content.type_choices == "VI" && (
            <>
              <div>
                crea wallapop con php, poo, mvc, javascript, ajax, mysql....mp4
              </div>

              <div>00:00</div>
            </>
          )}
          <div className="d-flex align-items-center cursor-pointer">
            <IconContext.Provider
              value={{
                size: 14,
                className: "global-class-name mr-2 cursor-pointer",
              }}
            >
              {" "}
              <FaEdit />
            </IconContext.Provider>
            Editar contenido
          </div>
        </div>
      </div>
      <hr />
      <div>
        <div className="mb-3">
          <ButtonCustom>
            <IconContext.Provider
              value={{
                size: 22,
                className: "global-class-name mr-2 cursor-pointer",
                color: "#fff",
              }}
            >
              {" "}
              <MdAdd style={{ color: "#fff" }} />
            </IconContext.Provider>
            Descripción
          </ButtonCustom>
        </div>
        <div>
          <ButtonCustom>
            <IconContext.Provider
              value={{
                size: 22,
                className: "global-class-name mr-2 cursor-pointer",
                color: "#fff",
              }}
            >
              {" "}
              <MdAdd style={{ color: "#fff" }} />
            </IconContext.Provider>
            Recursos
          </ButtonCustom>
        </div>
      </div>
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
`;
export default CardItemDrag;
