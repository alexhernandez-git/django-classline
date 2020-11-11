import { Link, useParams, useLocation, useHistory } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes/ItemTypes";
import { IconContext } from "react-icons";
import { FaGripLines } from "react-icons/fa";
const BlockCard = ({ moveCard, id, index, block, blockCards, noMove }) => {
  const { pathname } = useLocation();
  const history = useHistory();
  const { program, course } = useParams();
  // const { code, title, picture, videos, podcasts,are_videos,are_podcasts, pack_price } = props.course;
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK_CARD,
    hover(item, monitor) {
      if (!ref.current || noMove) {
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
    item: { type: ItemTypes.BLOCK_CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  const handleLinkTo = () => {
    if (noMove) {
      history.push(
        `/academy/${program}/admin/course/${course}/block/${block.code}`
      );
    }
  };
  return (
    <PackContent
      style={{ opacity, cursor: noMove ? "pointer" : "grab" }}
      moveCard={moveCard}
      ref={ref}
      onClick={handleLinkTo}
      className="mb-4"
    >
      <div className="header-block">
        <div></div>
        <span>Bloque {index + 1}</span>
        {noMove && <div></div>}

        {!noMove && (
          <IconContext.Provider
            value={{
              size: 20,
              className: "global-class-name",
            }}
          >
            <FaGripLines />
          </IconContext.Provider>
        )}
      </div>
      <div className="d-flex div-content">
        <div className="div-img">
          <img
            height="100%"
            src={
              block.picture ? block.picture : "/static/assets/img/img4x3.png"
            }
            alt=""
          />
        </div>
        <div className="div-info" css={textEllipsis}>
          <div css={textEllipsis}>
            <span>{block.name}</span>
          </div>
          <div css={textEllipsis}>
            <small>{block.description}</small>
          </div>
          <div>
            <small>Items: {block.items}</small>
          </div>
        </div>
      </div>
    </PackContent>
  );
};

const PackContent = styled.div`
  width: 100%;
  /* cursor: grab; */
  display: block;
  max-height: 20rem;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  &:hover img {
    transform: scale(1.03);
  }
  .div-content {
    background-color: white;
  }
  .div-img {
    height: 10rem;
    overflow: hidden;
    min-width: 13.33rem;
  }
  img {
    height: 100%;
  }
  .div-info {
    margin: 1rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .header-block {
    display: flex;
    justify-content: space-between;
    padding: 1rem;
  }
`;
export default BlockCard;
