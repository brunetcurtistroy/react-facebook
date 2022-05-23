import { SetInfoMaintainType } from './SetInfoMaintain.type';
import SetInfoMaintainService from "services/basicInfo/SetInfoMaintain/SetInfoMaintainService";
import { danger } from '../../alert/alert.actions';
import { message } from "antd";
import { download_file } from "helpers/CommonHelpers";

const dispatchDangerError = (dispatch, error) => {
  dispatch(
    danger(
      error.response
        ? error.response.data
          ? error.response.data.message
          : "処理が失敗しました"
        : "エラーが発生しました"
    )
  );
};

export const getInfoMaintain = () => {
  return dispatch => {
    return SetInfoMaintainService.getInfoMaintain().then(res => {
      dispatch(setInfoMaintain(res.data));
    }).catch(err => {
      dispatchDangerError(dispatch, err);
    })
  }
}

export const setInfoMaintain = infoMaintains => {
  return { type: SetInfoMaintainType.SET_INFO_MAINTAIN, infoMaintains };
}

const SetInfoMaintainAction = {
  getListSetIdentify() {
    return SetInfoMaintainService.getListSetIdentify()
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  getSetInfoTableDataSubSet(data) {
    return SetInfoMaintainService.getSetInfoTableDataSubSet(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  changeDivision(data) {
    return SetInfoMaintainService.changeDivision(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  deleteData(data) {
    return SetInfoMaintainService.deleteData(data) 
  },

  cloneSetManagementInfo(data) {
    return SetInfoMaintainService.cloneSetManagementInfo(data)
      // .then((res) => {
      //     return res?.data;
      // })
      // .catch((err) => {
      //   message.error(err.response.data.message);
      //   console.log(err)
      // });
  },

  btnf09(data) {
    return SetInfoMaintainService.btnf09(data)
  },

  outbtnf09(data) {
    return SetInfoMaintainService.outbtnf09(data)
      .then(res => {
        download_file(res)
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

}

export default SetInfoMaintainAction;