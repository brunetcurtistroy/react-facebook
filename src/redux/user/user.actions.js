import UserService from "../../services/UserService";
import { history } from "constants/BrowserHistory";
import { UserActionTypes } from "./user.types";

import { danger } from "../alert/alert.actions";

const dispatchDangerError = (dispatch, error) => {
  let msg;
  const res = error.response;
  if (res) {
    const resData = res.data;
    if (resData) {
      const resErrors = resData.errors;
      if (resErrors) {
        for (let i in resErrors) {
          for (let j in resErrors[i]) {
            msg = resErrors[i][j];
          }
        }
      } else {
        msg = resData.message;
      }
    } else {
      msg = "処理が失敗しました";
    }
  }
  dispatch(danger(msg || "エラーが発生しました"));
};

export const loginUserInfo = (userInfo) => {
  return (dispatch) => {
    return UserService.login(userInfo)
      .then((res) => {
        let dataLogin = {
          loggedIn: true,
          user: res.data.user,
          hospitalCode: userInfo.hospital
        };
        dispatch({
          type: UserActionTypes.SET_USER,
          payload: dataLogin
        });
        history.push("/");
      })
      .catch((error) => {
        dispatchDangerError(dispatch, error);
      });
  };
};

export const logoutUserInfo = (hospitalCode) => {
  return (dispatch) => {
    return UserService.logout()
      .then(() => {
        dispatch({
          type: UserActionTypes.LOG_OUT_USER
        });
        history.push("/login/" + hospitalCode);
      })
      .catch((error) => {
        dispatchDangerError(dispatch, error);
      });
  };
};

export const createUserAction = (user) => {
  return (dispatch) => {
    return UserService.createUserService(user)
      .then((res) => {
        if (res.status === 200) {
          history.push("/user-info/user-register");
        }
      })
      .catch((error) => {
        dispatchDangerError(dispatch, error);
      });
  };
};

export const setHospital = (hospitalCode) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.SET_HOSPITAL_CODE,
      payload: hospitalCode
    });
  };
};

export const modifyUserpasswordAction = (user) => {
  return (dispatch) => {
    return UserService.modifyUserPasswordService(user);
  };
};

export const getUserProfileAction = (userId) => {
  return (dispatch) => {
    UserService.getUserProfileService(userId)
      .then((res) => {
        console.log("getUserProfileAction", res.data);
        dispatch({
          type: UserActionTypes.GET_USER_PROFILE,
          payload: res.data
        });
      })
      .catch((error) => {
        dispatch(danger(error.response.data.message));
      });
  };
};

export const updateUserProfileAction = (userId, user) => {
  return (dispatch) => {
    UserService.updateUserProfileService(userId, user)
      .then((res) => {
        if (res.status === 200) {
          history.push("/user-info/user-register");
        }
      })
      .catch((error) => {
        dispatch(danger(error.response.data.message));
      });
  };
};

export const setSubMenus = (objMenu) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.SET_SUB_MENUS,
      payload: objMenu
    });
  };
};
// Get a screen ID for testing
export const setDisplayComponent = (componentName) => {
  return (dispatch) => {
    dispatch({
      type: UserActionTypes.SET_DISPLAY_COMPONENT,
      component: componentName
    });
  };
};
