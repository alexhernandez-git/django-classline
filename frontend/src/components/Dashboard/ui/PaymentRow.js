import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import {
  ButtonCustomError,
  ButtonCustom,
} from "src/components/ui/ButtonCustom";
import moment from "moment";
import { useSelector } from "react-redux";
const PaymentRow = (props) => {
  console.log("props", props);
  const {
    amount_paid,
    currency,
    customer_email,

    program,
    status,
    created,
  } = props.payment;

  const [optionsOpen, setOptionsOpen] = useState(false);
  const authCommercialsReducer = useSelector(
    (state) => state.authCommercialsReducer
  );
  const optionsRef = useRef();
  const dotsRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleShowPassword = () => {
    setShowPassword((showPassword) => (showPassword ? false : true));
  };

  return (
    <tr className="position-relative">
      <td>{amount_paid / 100}</td>
      <td>{currency}</td>
      <td>{customer_email}</td>
      <td>{program}</td>
      <td>{moment(created).format("DD/MM/YY")}</td>
      <td>{status}</td>
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
export default PaymentRow;
