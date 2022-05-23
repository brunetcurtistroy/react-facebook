import { message } from "antd";
import MoneyAmountHepatitisGeneralService from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/MoneyAmountHepatitisGeneralService";

const MoneyAmountHepatitisGeneralAction = {
  getScreenData(data) {
    return MoneyAmountHepatitisGeneralService.getScreenData(data)
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
    return MoneyAmountHepatitisGeneralService.updateRecord(data)
  }
}

export default MoneyAmountHepatitisGeneralAction;