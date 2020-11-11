import styled from "@emotion/styled";
import update from "immutability-helper";
import React, { useCallback, useEffect, useState } from "react";

import { Link, useParams } from "react-router-dom";

import { textEllipsis } from "src/components/ui/TextEllipsis";

const BlocksCourseCard = ({ block, index, type }) => {
  const { program, course } = useParams();

  const [sortEdit, setSortEdit] = useState(false);
  return (
    <>
      <Link
        to={
          type == "ADMIN"
            ? `/academy/${program}/admin/course/${course}/block/${block.code}`
            : `/academy/${program}/course/${course}/block/${block.code}`
        }
      >
        <PackContent>
          <BlockText className="d-flex justify-content-center p-2">
            <span>Bloque {index + 1}</span>
          </BlockText>
          <PackImage className="">
            <div className="video-content">
              <img
                className="rounded"
                src={
                  block.picture
                    ? block.picture
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
                  {block.name ? block.name : "Nuevo bloque"}
                </span>
              </div>
              <div className="text-grey">
                <div>
                  <small css={textEllipsis}>Lecciones: {block.items}</small>
                </div>
              </div>
            </div>
          </PackInfo>
        </PackContent>
      </Link>
    </>
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
const BlockText = styled.div``;
export default BlocksCourseCard;
