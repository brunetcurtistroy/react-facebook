import { combineReducers } from "redux";

import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import userReducer from "./user/user.reducer";
import InsurerInfoMaintainReducer from "./basicInfo/InsurerInfoMaintain/InsurerInfoMaintain.reducer";
import OfficeInfoMaintainReducer from "./basicInfo/OfficeInfoMaintain/OfficeInfoMaintain.reducer";
import alertReducer from "./alert/alert.reducer";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import setInfoMaintainReducer from "./basicInfo/SetInfoMaintain/SetInfoMaintain.reducer";
import PersonalInfoMaintainReducer from './basicInfo/PersonalInfoMaintain/PersonalInfoMaintain.reducer';
import ContractInfoBatchProcessReducer from './basicInfo/ContractInfoBatchProcess/ContractInfoBatchProcess.reducer';
import SpecificInsureGuideSettleProcessListReducer from "./SpecificInsureGuide/SpecificInsureGuideSettleProcessList/SpecificInsureGuideSettleProcessList/SpecificInsureGuideSettleProcessList.reducer";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["userReducer"],
  stateReconciler: autoMergeLevel2
};
const rootReducer = combineReducers({
  userReducer,
  alertReducer,
  InsurerInfoMaintainReducer,
  OfficeInfoMaintainReducer,
  setInfoMaintainReducer,
  PersonalInfoMaintainReducer, 
  ContractInfoBatchProcessReducer,
  SpecificInsureGuideSettleProcessListReducer
});

export default persistReducer(persistConfig, rootReducer);
