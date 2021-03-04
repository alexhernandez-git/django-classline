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
const CostumerRow = (props) => {
  console.log("props", props);
  const {
    username,
    password,
    user_created_by,
    first_name,
    last_name,
    first_password,
    password_changed,
  } = props.account;
  const { id, created } = props.account;

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
      <td>{username}</td>
      <td>
        {user_created_by.code == authCommercialsReducer.user.code ? (
          <>
            {password_changed ? (
              "El usuario ha cambiado la contraseña"
            ) : (
              <>
                {showPassword
                  ? first_password
                  : first_password.replace(/./g, "#")}
                <span
                  className="ml-3 cursor-pointer"
                  onClick={handleToggleShowPassword}
                >
                  {showPassword ? (
                    <IconContext.Provider
                      value={{
                        size: 20,
                      }}
                    >
                      <FaEyeSlash

                      // onClick={() => setOptionsOpen(true)}
                      />
                    </IconContext.Provider>
                  ) : (
                    <IconContext.Provider
                      value={{
                        size: 20,
                      }}
                    >
                      <FaEye

                      // onClick={() => setOptionsOpen(true)}
                      />
                    </IconContext.Provider>
                  )}
                </span>
              </>
            )}
          </>
        ) : (
          "No has creado este cliente"
        )}
      </td>
      <td>
        {first_name} {last_name}
      </td>
      <td>{moment(created).format("DD/MM/YY")}</td>
      <td>{user_created_by.code}</td>
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
export default CostumerRow;
