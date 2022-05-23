import { OfficeInfoMaintainType } from "./OfficeInfoMaintain.type";

const INITIAL_STATE = {
  officeInfos: []
};

const OfficeInfoMaintainDirectlyReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case OfficeInfoMaintainType.SET_OFFICE_INFO:
      return {
        ...state,
        officeInfos: action.officeInfos
      };

    default:
      return state;
  }
};

export default OfficeInfoMaintainDirectlyReducer;
