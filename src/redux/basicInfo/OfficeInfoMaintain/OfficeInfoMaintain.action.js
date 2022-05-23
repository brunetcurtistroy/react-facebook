import OfficeInfoMaintainService from "services/basicInfo/OfficeInfoMaintain/OfficeInfoMaintainService";
import { OfficeInfoMaintainType } from "./OfficeInfoMaintain.type";
import { message } from "antd";
import { danger } from "../../alert/alert.actions";

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

const OfficeInfoMaintainAction = {
  getInitialDisplayListAction() {
    return OfficeInfoMaintainService.getInitialDisplayListService()
      .then((res) => {
        if (res.data) {
          return res.data;
        }
      })
      .catch((err) => {
        message.error("画面情報の取得にはエラーが発生しました");
        console.log(err);
      });
  },
  createOfficeAction(office) {
    return OfficeInfoMaintainService.createOfficeService(office)
      .then((res) => {
        if (res.data) {
          message.success("完了！");
          return res.data;
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  getOfficeAction(officeAndBranchCode) {
    return OfficeInfoMaintainService.getOfficeService(officeAndBranchCode)
      .then((res) => {
        if (res.data) {
          // message.success("完了！");
          return res.data;
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  updateOfficeAction(office) {
    return OfficeInfoMaintainService.updateOfficeService(office)
      .then((res) => {
        if (res.data) {
          message.success("完了！");
          return res.data;
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  getInitialDisplayCreateListAction() {
    return OfficeInfoMaintainService.getInitialDisplayCreateListService()
      .then((res) => {
        if (res.data) {
          return res.data;
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  getBranchStoreGeneratedAction(officeCode) {
    return OfficeInfoMaintainService.getBranchStoreGeneratedService(officeCode)
      .then((res) => {
        if (res.data) {
          // message.success("完了！");
          return res.data;
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  getListBranchShopByOfficeCodeAction(officeCode) {
    return OfficeInfoMaintainService.getListBranchShopByOfficeCodeService(
      officeCode
    )
      .then((res) => {
        if (res.data) {
          // message.success("完了！");
          return res.data;
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export const getAllOfficeInfoRetrievalQueryAction = (params) => {
  return OfficeInfoMaintainService.getAllOfficeInfoRetrievalQueryService(params)
};

export const setOfficeInfo = (officeInfos) => {
  return { type: OfficeInfoMaintainType.SET_OFFICE_INFO, officeInfos };
};

export default OfficeInfoMaintainAction;
