import IdConsultDateModifyService from "services/CooperationRelated/OcrCaptureStartUp/IdConsultDateModifyService";
import { message } from "antd";
const IdConsultDateModifyAction = {
  dataConsultHistorySubAction(params) {
    return IdConsultDateModifyService.dataConsultHistorySubService(params)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  getScreenDataAction(params) {
    return IdConsultDateModifyService.getScreenDataService(params)
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
  updateAction(params) {
    return IdConsultDateModifyService.updateService(params)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  user_Action_4Action(params) {
    return IdConsultDateModifyService.user_Action_4Service(params);
  },
};

export default IdConsultDateModifyAction;
