import PreviousCourseAcquisitionSubService from "services/ReservationBusiness/PersonalReserveProcess/PreviousCourseAcquisitionSubService";
import { message } from "antd";

const PreviousCourseAcquisitionSubAction = {
    GetListData(data) {
    return PreviousCourseAcquisitionSubService.GetListData(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  ContractInspectContentSelect(data) {
    return PreviousCourseAcquisitionSubService.ContractInspectContentSelect(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  DbClick(data) {
    return PreviousCourseAcquisitionSubService.DbClick(data)
  },
};

export default PreviousCourseAcquisitionSubAction;