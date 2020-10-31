import React, { useRef } from "react";
import styled from "@emotion/styled";
import { useDrag, useDrop } from "react-dnd";
import { IconContext } from "react-icons";
import { ItemTypes } from "../ItemTypes/ItemTypes";
import { FaGripLines, FaTrash } from "react-icons/fa";

import VideoList from "./VideoList";
const CardVideoDrag = ({
  moveCard,
  id,
  index,
  video,
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
    <PlaylistVideo
      style={{ opacity }}
      className="d-flex justify-content-between align-items-center"
      ref={ref}
      moveCard={moveCard}

    >
      <IconContext.Provider
        value={{
          size: 22,
          className: "global-class-name mr-2",
        }}
      >
        {" "}
        <FaGripLines 
        />
      </IconContext.Provider>

      <VideoList video={video} />
      <IconContext.Provider
        value={{
          size: 22,
          className: "global-class-name mr-2 cursor-pointer",
        }}
      >
        {" "}
        <FaTrash onClick={() => handleDeleteTrackVideo(id)} />
      </IconContext.Provider>
    </PlaylistVideo>
  );
};
const PlaylistVideo = styled.div`
  padding: 1rem;
  &:hover {
    background: #ececec;
  }
`;
export default CardVideoDrag;
