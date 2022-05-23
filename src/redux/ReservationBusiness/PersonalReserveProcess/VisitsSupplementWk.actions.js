import VisitsSupplementWkService from "services/ReservationBusiness/PersonalReserveProcess/VisitsSupplementWkService";
import { message } from "antd";

const VisitsSupplementWkAction = {
  GetIndex(data) {
    return VisitsSupplementWkService.getIndex(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  UpdateContent(data) {
    return VisitsSupplementWkService.updateContent(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default VisitsSupplementWkAction;