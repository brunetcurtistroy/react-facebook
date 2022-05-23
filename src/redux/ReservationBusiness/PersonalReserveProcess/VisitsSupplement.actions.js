import VisitsSupplementService from "services/ReservationBusiness/PersonalReserveProcess/VisitsSupplementService";
import { message } from "antd";

const VisitsSupplementAction = {
  GetIndex(data) {
    return VisitsSupplementService.getIndex(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  UpdateContent(data) {
    return VisitsSupplementService.updateContent(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default VisitsSupplementAction;