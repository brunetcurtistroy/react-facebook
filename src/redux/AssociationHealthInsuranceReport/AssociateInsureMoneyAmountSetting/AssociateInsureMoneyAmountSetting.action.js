import { message } from "antd";
import AssociateInsureMoneyAmountSettingSevice from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/AssociateInsureMoneyAmountSettingSevice";

const AssociateInsureMoneyAmountSettingAction = {
  getScreenData() {
    return AssociateInsureMoneyAmountSettingSevice.getScreenData()
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

  paramsBtn(data) {
    return AssociateInsureMoneyAmountSettingSevice.paramsBtn(data)
  },

  inputBtn(data) {
    return AssociateInsureMoneyAmountSettingSevice.inputBtn(data)
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
  
  updateOrCreate(data) {
    return AssociateInsureMoneyAmountSettingSevice.updateOrCreate(data)
  },

  deleteRecord(data) {
    return AssociateInsureMoneyAmountSettingSevice.deleteRecord(data)
  }
}

export default AssociateInsureMoneyAmountSettingAction;