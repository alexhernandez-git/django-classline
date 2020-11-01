import { Link, useParams, useLocation } from "react-router-dom";
import styled from "@emotion/styled";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import { useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import { ItemTypes } from "../ItemTypes/ItemTypes";
const BlockCard = ({ moveCard, id, index, block }) => {
  const { pathname } = useLocation();
  const { program, course } = useParams();
  console.log(block);
  // const { code, title, picture, videos, podcasts,are_videos,are_podcasts, pack_price } = props.course;
  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: ItemTypes.BLOCK_CARD,
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
    item: { type: ItemTypes.BLOCK_CARD, id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  const opacity = isDragging ? 0 : 1;
  drag(drop(ref));
  return (
    <Link to={`/academy/${program}/admin/course/${course}/block/${block.name}`}>
      <PackContent style={{ opacity }} moveCard={moveCard} ref={ref}>
        <BlockText className="d-flex justify-content-center p-2">
          <span>Bloque {index + 1}</span>
        </BlockText>

        <PackImage className="">
          <div className="video-content">
            <img
              className="rounded"
              src={"../../../../static/assets/img/img4x3.png"}
              alt="video"
            />
          </div>
        </PackImage>
        <PackInfo>
          <div className="video-text">
            <div className="py-2 d-flex justify-content-between">
              <span css={textEllipsis}>
                {block.name ? block.name : "Nuevo bloque"}
              </span>
            </div>
            <div className="text-grey">
              <div>
                <small css={textEllipsis}>Lecciones: 5</small>
              </div>
              {/* <div>
                    <small css={textEllipsis}>Playlists: 2</small>
                  </div>
                  <div>
                    <small css={textEllipsis}>Recursos: 8</small>
                  </div>  */}
            </div>
          </div>
        </PackInfo>
      </PackContent>
    </Link>
  );
};

const PackContent = styled.div`
  width: 100%;
  /* cursor: grab; */
  display: block;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
  &:hover img {
    transform: scale(1.03);
  }
`;

const PackImage = styled.span`
  width: 100%;
  display: block;
  overflow: hidden;

  img {
    transition: 0.5s ease;
    width: 100%;
  }

  .video-content {
    position: relative;
  }
`;
const PackInfo = styled.div`
  .video-text {
    align-items: center;
    bottom: 0;
    width: 100%;
    padding: 1rem;
    height: 20%;
    background: #fff;
    z-index: 500;
  }
`;
const BlockText = styled.div`
  cursor: grab;
`;
export default BlockCard;
