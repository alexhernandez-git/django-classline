import React, { useState, useRef, useEffect } from "react";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaEyeSlash, FaEye } from "react-icons/fa";

import { ButtonCustomError, ButtonCustom } from "../ui/ButtonCustom";
import moment from "moment";
const AccountRow = (props) => {
  console.log("accountRow", props);
  const {
    username,
    password,
    last_login,
    first_name,
    last_name,
    first_password,
    password_changed,
  } = props.account.user;
  const { id, created } = props.account;

  const [optionsOpen, setOptionsOpen] = useState(false);

  const optionsRef = useRef();
  const dotsRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const handleToggleShowPassword = () => {
    setShowPassword((showPassword) => (showPassword ? false : true));
  };
  const handleWindowClick = (e) => {
    if (dotsRef.current.contains(e.target)) {
      if (optionsOpen) {
        setOptionsOpen(false);
      } else {
        setOptionsOpen(true);
      }
    } else {
      if (!optionsRef.current.contains(e.target)) {
        setOptionsOpen(false);
      }
    }
  };
  useEffect(() => {
    const handleClick = (e) => {
      handleWindowClick(e);
    };
    window.addEventListener("mousedown", handleClick);

    return () => {
      window.removeEventListener("mousedown", handleClick);
    };
  });
  return (
    <tr className="position-relative">
      <td>{username}</td>
      <td>
        {password_changed ? (
          "El usuario ha cambiado la contraseña"
        ) : (
          <>
            {showPassword ? first_password : first_password.replace(/./g, "#")}
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
      </td>
      <td>
        {first_name} {last_name}
      </td>
      <td>{moment(created).format("DD/MM/YY")}</td>
      <td>
        <Actions>
          <div ref={dotsRef} className="cursor-pointer">
            <IconContext.Provider
              value={{
                size: 23,
              }}
            >
              <BsThreeDotsVertical
              // onClick={() => setOptionsOpen(true)}
              />
            </IconContext.Provider>
          </div>
          <div ref={optionsRef}>
            {optionsOpen && (
              <div className="options position-absolute rounded shadow p-3 bg-white">
                <ButtonCustomError
                  className="w-100"
                  onClick={() => props.handleDeleteAccount(id)}
                >
                  Eliminar
                </ButtonCustomError>
              </div>
            )}
          </div>
        </Actions>
      </td>
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
export default AccountRow;
