import { AlertActionTypes } from "./alert.types";

const INITIAL_STATE = {
  type: "",
  name: "",
  message: "",
};
const alertReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AlertActionTypes.SUCCESS:
      return {
        type: AlertActionTypes.SUCCESS,
        message: action.payload
      };
    case AlertActionTypes.WARNING:
      return {
        type: AlertActionTypes.WARNING,
        message: action.payload
      };

    case AlertActionTypes.DANGER:
      return {
        type: AlertActionTypes.DANGER,
        message: action.payload
      };
    case AlertActionTypes.INFO:
      return {
        type: AlertActionTypes.DANGER,
        message: action.payload
      };
    case AlertActionTypes.CLEAR:
      return {
        ...INITIAL_STATE
      };    

    default:
      return state;
  }
};

export default alertReducer;
