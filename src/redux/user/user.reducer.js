import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
  user: "",
  loggedIn: false,
  hospitalCode: "",
  subMenus: {
    select_Keys: "9",
    open_Keys: "sub2"
  },
  component: ''
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        loggedIn: action.payload.loggedIn,
        hospitalCode: action.payload.hospitalCode
      };

    case UserActionTypes.SET_HOSPITAL_CODE:
      return {
        ...state,
        hospitalCode: action.payload
      };

    case UserActionTypes.LOG_OUT_USER:
      return {
        ...INITIAL_STATE
      };

    case UserActionTypes.GET_MENU_LIST:
      return {
        ...state,
        menuList: action.payload
      };

    case UserActionTypes.SET_SUB_MENUS:
      return {
        ...state,
        subMenus: action.payload
      };

    case UserActionTypes.GET_USER_PROFILE:
      return {
        ...state,
        userProfile: action.payload
      };

    case UserActionTypes.SET_DISPLAY_COMPONENT:
      return {
        ...state,
        component: action.component
      };

    default:
      return state;
  }
};

export default userReducer;
