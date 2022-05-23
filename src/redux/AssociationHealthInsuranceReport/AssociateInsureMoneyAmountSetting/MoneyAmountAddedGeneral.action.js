import { message } from "antd";
import MoneyAmountAddedGeneralService from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/MoneyAmountAddedGeneralService";

const MoneyAmountAddedGeneralAction = {
  getScreenData(data) {
    return MoneyAmountAddedGeneralService.getScreenData(data)
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
    return MoneyAmountAddedGeneralService.updateRecord(data)
  }
}

export default MoneyAmountAddedGeneralAction;