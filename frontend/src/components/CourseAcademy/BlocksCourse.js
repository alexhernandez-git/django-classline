import styled from "@emotion/styled";
import update from "immutability-helper";
import React, { useCallback, useState } from "react";
import { DndProvider } from "react-dnd";
import { ButtonCustom } from "../ui/ButtonCustom";
import BlockCard from "./BlockCard";

const BlocksCourse = () => {
  const [blockCards, setBlockCards] = useState([
    {
      id: 0,
      position: 0,
      block: {
        name: "Finanzas personales",
      },
    },
    {
      id: 1,
      position: 1,
      block: {
        name: "Criptomonedas",
      },
    },
    {
      id: 2,
      position: 2,
      block: {
        name: "Excel",
      },
    },
    {
      id: 3,
      position: 3,
      block: {
        name: "Finanzas empresarieales",
      },
    },
  ]);
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
      />
    );
  };
  return (
    <>
      <div className="d-flex justify-content-end mb-3">
        <ButtonCustom>Nuevo bloque</ButtonCustom>
      </div>
      <GridBlocks>
        {blockCards.map((card, i) => renderBlockCard(card, i))}
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
export default BlocksCourse;
