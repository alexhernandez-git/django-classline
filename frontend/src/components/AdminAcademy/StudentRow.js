import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import moment from "moment";
const StudentRow = (props) => {
  const {
    id,
    avatar,
    username,
    email,
    first_name,
    last_name,
    suscription_date,
    created_account,
  } = props.student.user;
  const { created } = props.student;
  const [optionsOpen, setOptionsOpen] = useState(false);

  const optionsRef = useRef();
  const dotsRef = useRef();

  return (
    <tr className="position-relative">
      <td>
        {first_name} {last_name}
      </td>
      {created_account ? <td>{username}</td> : <td>{email}</td>}
      <td>{moment(created).format("DD/MM/YY")}</td>
      <td className="text-center">{created_account ? "Si" : "No"}</td>
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
export default StudentRow;
