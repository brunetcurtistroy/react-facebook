import { message } from "antd";
import NonMoneyAmountGeneralService from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/NonMoneyAmountGeneralService";

const NonMoneyAmountGeneralAction = {
  getScreenData(data) {
    return NonMoneyAmountGeneralService.getScreenData(data)
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
    return NonMoneyAmountGeneralService.updateRecord(data)
  }
}

export default NonMoneyAmountGeneralAction;