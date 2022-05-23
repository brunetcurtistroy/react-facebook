import { message } from "antd";
import InputNewService from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/InputNewService";

const InputNewAction = {
  getScreenData(data) {
    return InputNewService.getScreenData(data)
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

  update(data) {
    return InputNewService.update(data)
  }
}

export default InputNewAction;