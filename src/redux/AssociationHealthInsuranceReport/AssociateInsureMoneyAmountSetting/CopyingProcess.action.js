import { message } from "antd";
import CopyingProcessService from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/CopyingProcessService";

const CopyingProcessAction = {
  getScreenData(data) {
    return CopyingProcessService.getScreenData(data)
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

  copyProcess(data) {
    return CopyingProcessService.copyProcess(data)
  }
}

export default CopyingProcessAction;