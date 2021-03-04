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
import { useSelector, useDispatch } from "react-redux";
import {
  changeCurrentCommercial,
  fetchCommercial,
} from "../../../redux/actions/commercials";
const CostumerRow = (props) => {
  const dispatch = useDispatch();
  const {
    code,
    username,
    password,
    commercial,
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
      <td>{code}</td>
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
      <td>{commercial.commercial_level}</td>
      <td className="text-center">
        {commercial.can_create_commercials ? (
          <ButtonCustom
            onClick={() => {
              dispatch(changeCurrentCommercial(code));
              dispatch(fetchCommercial());
            }}
          >
            Ver
          </ButtonCustom>
        ) : (
          <ButtonCustom
            className="cursor-no-pointer"
            style={{ opacity: "0.4" }}
          >
            Ver
          </ButtonCustom>
        )}
      </td>
    </tr>
  );
};

export default CostumerRow;
