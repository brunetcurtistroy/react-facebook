import { message } from "antd";
import PreviousGuideMatterInquiryService from "services/InputBusiness/NotInputCheckCategory/PreviousGuideMatterInquiryService";

const PreviousGuideMatterInquiryAction = {
    BeforeCallScreen(data) {
    return PreviousGuideMatterInquiryService.BeforeCallScreen(data)
    .then((res) => {
        return res?.data;
      })
  },
  AfterCallScreen(data) {
    return PreviousGuideMatterInquiryService.AfterCallScreen(data)
    .then()
    .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
        }
        message.error(res.data.message);
    });
},
}


export default PreviousGuideMatterInquiryAction;