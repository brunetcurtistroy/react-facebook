import DispensingProcessSubService from "services/AccountingBusiness/OrganizationsPayment/DispensingProcessSubService";
import { message } from "antd";

const DispensingProcessSubAction = {
  screenDataAction() {
    return DispensingProcessSubService.screenDataService()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        //   message.error(err.response.data.message);
      });
  },
  changeAction(data) {
    return DispensingProcessSubService.changeService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  comfirmAction(data) {
    return DispensingProcessSubService.comfirmService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
}

export default DispensingProcessSubAction;
