import MoreDetailService from "services/ReservationBusiness/PersonalReserveProcess/MoreDetailService";
import { message } from "antd";

const MoreDetailAction = {
  getMoreDetailAPIAction(data) {
    return MoreDetailService.getMoreDetailService(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default MoreDetailAction;