import { AlertActionTypes } from "./alert.types";

export const success = (message) => {
  return {
    type: AlertActionTypes.SUCCESS,
    payload: message
  };
};

export const warning = (message) => {
  return {
    type: AlertActionTypes.WARNING,
    payload: message
  };
};

export const danger = (message) => {
  return {
    type: AlertActionTypes.DANGER,
    payload: message
  };
};

export const clear = () => {
  return {
    type: AlertActionTypes.CLEAR,
    payload: null,
  };
};
