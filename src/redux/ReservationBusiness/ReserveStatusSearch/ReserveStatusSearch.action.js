import ReserveStatusSearchService from "services/ReservationBusiness/ReserveStatusSearch/ReserveStatusSearchService";
import { message } from "antd";

const ReserveStatusSearchAction = {
  getPeriodTimeInquiryAPIAction() {
    return ReserveStatusSearchService.getPeriodTimeInquiryAPIService()
      .then((res) => {
        if (res.data) {
          return res.data;
        }
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default ReserveStatusSearchAction;
