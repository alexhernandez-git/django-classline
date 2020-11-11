import styled from "@emotion/styled";
import update from "immutability-helper";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import {
  createBlock,
  updateBlocksOrder,
} from "../../redux/actions/courses/blocks";
import { ButtonCustom } from "../ui/ButtonCustom";
import BlockCard from "./BlockCard";
import { textEllipsis } from "src/components/ui/TextEllipsis";

const BlocksCourse = () => {
  const blocksReducer = useSelector((state) => state.blocksReducer);
  const courseReducer = useSelector((state) => state.courseReducer);
  const { program, course } = useParams();
  const dispatch = useDispatch();

  const [blockCards, setBlockCards] = useState([]);
  useEffect(() => {
    if (!blocksReducer.isLoading) {
      setBlockCards(blocksReducer.blocks);
    }
  }, [blocksReducer.isLoading, blocksReducer.blocks]);
  const handleUpdateBlocksOrder = (e) => {
    e.preventDefault();
    dispatch(updateBlocksOrder());
    setSortEdit(false);
  };

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = blockCards[dragIndex];
      const hoverCard = blockCards[hoverIndex];
      setBlockCards(
        update(blockCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
      setBlockCards((blockCards) => {
        return blockCards.map((card) => {
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
    [blockCards]
  );
  const renderBlockCard = (card, index) => {
    return (
      <BlockCard
        key={card.id}
        index={index}
        id={card.id}
        moveCard={moveCard}
        block={card.block}
        blockCards={blockCards}
      />
    );
  };
  const handleAddBlock = () => {
    dispatch(createBlock());
  };
  const [sortEdit, setSortEdit] = useState(false);
  return (
    <>
      <div className="d-flex justify-content-end my-3">
        {sortEdit ? (
          <ButtonCustom
            className="cursor-pointer"
            onClick={(e) => handleUpdateBlocksOrder(e)}
          >
            Guardar Orden
          </ButtonCustom>
        ) : (
          <div className="cursor-pointer" onClick={() => setSortEdit(true)}>
            Ordenar Bloques
          </div>
        )}
      </div>
      {sortEdit ? (
        blockCards.map((card, i) => renderBlockCard(card, i))
      ) : (
        <>
          <GridBlocks>
            {blockCards.map((card, i) => (
              <Link
                to={`/academy/${program}/admin/course/${course}/block/${card.block.code}`}
              >
                <PackContent>
                  <BlockText className="d-flex justify-content-center p-2">
                    <span>Bloque {i + 1}</span>
                  </BlockText>
                  <PackImage className="">
                    <div className="video-content">
                      <img
                        className="rounded"
                        src={
                          card.block.picture
                            ? card.block.picture
                            : "/static/assets/img/img4x3.png"
                        }
                        alt="video"
                      />
                    </div>
                  </PackImage>
                  <PackInfo>
                    <div className="video-text">
                      <div className="py-2 d-flex justify-content-between">
                        <span css={textEllipsis}>
                          {card.block.name ? card.block.name : "Nuevo bloque"}
                        </span>
                      </div>
                      <div className="text-grey">
                        <div>
                          <small css={textEllipsis}>
                            Lecciones: {card.block.items}
                          </small>
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
            ))}
            <AddBlock onClick={handleAddBlock}>Añadir Bloque</AddBlock>
          </GridBlocks>
        </>
      )}
    </>
  );
};
export const GridBlocks = styled.div`
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
export const AddBlock = styled.div`
  cursor: pointer;
  width: 100%;
  display: block;
  padding: 1rem;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  height: fit-content;
`;
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
const BlockText = styled.div``;
export default BlocksCourse;
