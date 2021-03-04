import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import { ButtonCustomError, ButtonCustom } from "src/components/ui/ButtonCustom";
import moment from "moment";
const CourseStudentRow = (props) => {
  const {
    username,
    password,
    last_login,
    first_name,
    last_name,
  } = props.student.user;
  const { id, created } = props.student;
  return (
    <tr className="position-relative">
      <td>{username}</td>

      <td>
        {first_name} {last_name}
      </td>
      <td>{moment(created).format("DD/MM/YY")}</td>
  
    </tr>
  );
};
const Actions = styled.div`
  z-index: 1000;
  .options {
    right: 0;
  }
  @media screen and (max-width: 768px) {
    .options {
      width: 100%;
    }
  }
`;
export default CourseStudentRow;
