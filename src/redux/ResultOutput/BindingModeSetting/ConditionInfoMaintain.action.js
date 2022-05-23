import { message } from "antd";
import ConditionInfoMaintainService from "services/ResultOutput/BindingModeSetting/ConditionInfoMaintainService.js";

const ConditionInfoMaintainAction = {
  GetListData(data) {
    return ConditionInfoMaintainService.GetListData(data)
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
  Paste(data) {
    return ConditionInfoMaintainService.Paste(data)
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
  Details(data) {
    return ConditionInfoMaintainService.Details(data)
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
  DeleteDetail(data) {
    return ConditionInfoMaintainService.DeleteDetail(data)
  },
  DeleteParent(data) {
    return ConditionInfoMaintainService.DeleteParent(data)
  },
  CreateParent(data) {
    return ConditionInfoMaintainService.CreateParent(data)
  },
  SaveDetail(data) {
    return ConditionInfoMaintainService.SaveDetail(data)
  }
}

export default ConditionInfoMaintainAction;
