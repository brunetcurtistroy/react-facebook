
import VisitsChangeConfirmService from "services/ReservationBusiness/PersonalReserveProcess/VisitsChangeConfirmService";
import { message } from "antd";
const VisitsChangeConfirmAction = {
  GetScreenData(data) {
    return VisitsChangeConfirmService.GetScreenData(data)
  },

  AcceptBtn(data) {
    return VisitsChangeConfirmService.AcceptBtn(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },

  AcceptBtn_1(data) {
    return VisitsChangeConfirmService.AcceptBtn_1(data)
  },


  AcceptBtn_2(data) {
    return VisitsChangeConfirmService.AcceptBtn_2(data)
  }
};
export default VisitsChangeConfirmAction;