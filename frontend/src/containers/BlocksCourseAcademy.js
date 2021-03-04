import styled from "@emotion/styled";
import update from "immutability-helper";
import React, { useCallback, useEffect, useState } from "react";
import { DndProvider } from "react-dnd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { ButtonCustom } from "src/ui/ButtonCustom";
import { textEllipsis } from "src/components/ui/TextEllipsis";
import { Main } from "src/components/ui/Main";
import Filters from "src/components/Layout/Filters";
const BlocksCourse = () => {
  const blocksReducer = useSelector((state) => state.blocksReducer);
  const courseReducer = useSelector((state) => state.courseReducer);
  const { program, course } = useParams();
  const dispatch = useDispatch();

  const [blockCards, setBlockCards] = useState([]);

  return (
    <Main padding ref={main}>
      <ContainerWrapper>
        <Filters title={courseReducer.course.title} back />
        <div className="row">
          <div className="col-12">
            <GridBlocks>
              {blocksReducer.blocks.map((card, i) => (
                <BlocksCourseCard block={card.block} index={i} type="ACADEMY" />
              ))}
            </GridBlocks>
          </div>
        </div>
      </ContainerWrapper>
    </Main>
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
