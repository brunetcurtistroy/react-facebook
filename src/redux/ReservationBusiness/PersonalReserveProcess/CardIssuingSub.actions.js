import   CardIssuingSubService  from "services/ReservationBusiness/PersonalReserveProcess/CardIssuingSubService";
import { message } from "antd";

const CardIssuingSubAction = {
  GetIndex(data) {
    return CardIssuingSubService.getIndexService(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  SupplementarySet(data) {
    return CardIssuingSubService.SupplementarySet(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default CardIssuingSubAction;