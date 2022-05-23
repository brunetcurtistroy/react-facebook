import { SetInfoMaintainType } from "./SetInfoMaintain.type";

const INITIAL_STATE = {
  infoMaintains: []
};

const SetInfoMaintainReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SetInfoMaintainType.SET_INFO_MAINTAIN:
      return {
        ...state,
        infoMaintains: action.infoMaintains
      };

    default:
      return state;
  }
};

export default SetInfoMaintainReducer;
