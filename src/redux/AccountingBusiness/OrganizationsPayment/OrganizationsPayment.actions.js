import OrganizationsPaymentService from "services/AccountingBusiness/OrganizationsPayment/OrganizationsPaymentService";
import { message } from "antd";

const OrganizationsPaymentAction = {
  DisplayBtnAction(data) {
    return OrganizationsPaymentService.DisplayService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  getScreenAction() {
    return OrganizationsPaymentService.getScreenService()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  selectAllAction(data) {
    return OrganizationsPaymentService.selectAllService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  selectOneAction(data) {
    return OrganizationsPaymentService.selectOneService(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
      });
  },
  f10Action(data) {
    return OrganizationsPaymentService.f10Service()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
  f11Action(data) {
    return OrganizationsPaymentService.f11Service()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        // message.error(err.response.data.message);
      });
  },
};
export default OrganizationsPaymentAction;
