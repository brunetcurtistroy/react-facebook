import InspectValueConvertlnternalService from "services/CooperationRelated/InspectItemConvertInternal/InspectValueConvertlnternalService";
import { message } from "antd";

const InspectValueConvertlnternalAction = {
  getListDataAction() {
    return InspectValueConvertlnternalService.getListDataService()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  postDataAction(data) {
    return InspectValueConvertlnternalService.postDataService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  saveDataAction(data) {
    return InspectValueConvertlnternalService.saveDataService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  deleteDataAction(data) {
    return InspectValueConvertlnternalService.deleteDataService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },

};
export default InspectValueConvertlnternalAction;

