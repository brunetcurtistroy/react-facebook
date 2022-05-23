import DispatchManageService from "services/ResultOutput/DispatchManage/DispatchManageService";
import { message } from "antd";

const DispatchManageAction = {
  getScreenData(data) {
    return DispatchManageService.getScreenData(data)
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

  changePersonalId(data) {
    return DispatchManageService.changePersonalId(data)
  },

  personalConfirm(data) {
    return DispatchManageService.personalConfirm(data)
  },

  personalConfirm_2(data) {
    return DispatchManageService.personalConfirm_2(data)
  },

  getDataSub(data) {
    return DispatchManageService.getDataSub(data)
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

  updateDataSub(data) {
    return DispatchManageService.updateDataSub(data)
  },

  deleteRecord(data) {
    return DispatchManageService.deleteRecord(data)
  },

  CsvOutput(data) {
    return DispatchManageService.CsvOutput(data)
  },

  ReadingInfoUpdate(data) {
    return DispatchManageService.ReadingInfoUpdate(data)
  }
};

export default DispatchManageAction;