import PaymentProcessSubService from "services/AccountingBusiness/OrganizationsPayment/PaymentProcessSubService";
import { message } from "antd";

const PaymentProcessSubAction = {
  screenDataAction(data) {
    return PaymentProcessSubService.screenDataService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        //   message.error(err.response.data.message);
      });
  },
  displayBtnAction(data) {
    return PaymentProcessSubService.changeService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  individualAction(data) {
    return PaymentProcessSubService.comfirmService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
}

export default PaymentProcessSubAction;
