import React, { useState, useEffect, useCallback } from "react";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CardVideoDrag from "./CardVideoDrag";
import update from "immutability-helper";

const DndVideoList = (props) => {
  const { videoCards, setVideoCards, handleDeleteTrackVideo } = props;

  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = videoCards[dragIndex];
      const hoverCard = videoCards[hoverIndex];
      setVideoCards(
        update(videoCards, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
      setVideoCards((videoCards) => {
        return videoCards.map((card) => {
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
    [videoCards]
  );
  const renderVideoCard = (card, index) => {
    return (
      <CardVideoDrag
        key={card.id}
        index={index}
        id={card.id}
        moveCard={moveCard}
        video={card.video}
        handleDeleteTrackVideo={handleDeleteTrackVideo}
      />
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      {videoCards.map((card, i) => renderVideoCard(card, i))}
    </DndProvider>
  );
};

export default DndVideoList;
