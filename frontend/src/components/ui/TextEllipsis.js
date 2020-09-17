import { css } from "@emotion/core";

export const textEllipsis = css`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  min-width: 30px;
  text-align: right;
`;
