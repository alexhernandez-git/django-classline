import styled from "@emotion/styled";
import update from "immutability-helper";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import {
  createBlock,
  updateBlocksOrder,
} from "../../redux/actions/courses/blocks";
import { ButtonCustom } from "../ui/ButtonCustom";
import BlockCard from "./BlockCard";

const BlocksCourse = () => {
  const blocksReducer = useSelector((state) => state.blocksReducer);
  const dispatch = useDispatch();
  const [blockCards, setBlockCards] = useState([]);
  console.log(blockCards);
  useEffect(() => {
    if (!blocksReducer.isLoading) {
      setBlockCards(blocksReducer.blocks);
    }
  }, [blocksReducer.isLoading, blocksReducer.blocks]);
  useEffect(() => {
    console.log(blockCards);
    if (!blocksReducer.isLoading && blockCards != blocksReducer.blocks) {
      // const timeoutId = setTimeout(() => {
      //   console.log("entra");
      // }, 1000);
      // return () => clearTimeout(timeoutId);
      console.log("entra");
      dispatch(updateBlocksOrder());
    }
  }, [blockCards]);
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
  return (
    <>
      <GridBlocks>
        {blockCards.map((card, i) => renderBlockCard(card, i))}
        <AddBlock onClick={handleAddBlock}>Añadir Bloque</AddBlock>
      </GridBlocks>
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
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px dashed #ccc;
  height: fit-content;
`;
export default BlocksCourse;
