import MedicalExamContentsInquirySubService from "services/ReservationBusiness/PersonalReserveProcess/MedicalExamContentsInquirySubService";
import { message } from "antd";

const MedicalExamContentsInquirySubAction = {
    GetScreenData(data) {
    return MedicalExamContentsInquirySubService.GetScreenData(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default MedicalExamContentsInquirySubAction;