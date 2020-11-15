import styled from "@emotion/styled";
import { css } from "@emotion/core";

export const ButtonCustom = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;

  &:active {
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const ButtonCustomInitial = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;
  background: #000;
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;

  &:active {
    position: relative;
    top: 1px;
  }
`;
export const ButtonCustomGradient = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;
  background: linear-gradient(45deg, #2e6a89, #56b389);
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;

  &:active {
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
export const ButtonCustomSuccess = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;
  background: var(--success);
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;

  &:active {
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const ButtonCustomError = styled.button`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;
  background: var(--danger);
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;

  &:active {
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;

export const ButtonStyle = css`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;

  background: #000;
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;
  &:active {
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
export const ButtonStyleSuccess = css`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;

  background: var(--success);
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;

  &:active {
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
export const ButtonStyleError = css`
  cursor: pointer;
  border: 0;
  padding: 0.5rem 1rem;

  background: var(--danger);
  color: #fff;
  border-radius: 0.7rem;
  text-align: center;

  &:active {
    position: relative;
    top: 1px;
  }
  @media screen and (max-width: 576px) {
    width: 100%;
  }
`;
