import { PersonalInfoMaintainType } from './PersonalInfoMaintain.type';

const initialState = {

};

const PersonalInfoMaintainReducer = ( state = initialState, action) => {
  switch (action.type) {
    case PersonalInfoMaintainType:{
      return {
        ...state,

      }
    }
  
    default:
      return state;
  }
};

export default PersonalInfoMaintainReducer;