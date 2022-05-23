import { message } from "antd";
import NonMoneyAmountAddedService from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/NonMoneyAmountAddedService";

const NonMoneyAmountAddedAction = {
  getScreenData(data) {
    return NonMoneyAmountAddedService.getScreenData(data)
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

  updateRecord(data) {
    return NonMoneyAmountAddedService.updateRecord(data)
  }
}

export default NonMoneyAmountAddedAction;