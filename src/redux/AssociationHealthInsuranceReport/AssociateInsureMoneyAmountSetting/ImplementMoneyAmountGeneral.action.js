import { message } from "antd";
import ImplementMoneyAmountGeneralService from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/ImplementMoneyAmountGeneralService";

const ImplementMoneyAmountGeneralAction = {
  getScreenData(data) {
    return ImplementMoneyAmountGeneralService.getScreenData(data)
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
    return ImplementMoneyAmountGeneralService.updateRecord(data)
  }
}

export default ImplementMoneyAmountGeneralAction;