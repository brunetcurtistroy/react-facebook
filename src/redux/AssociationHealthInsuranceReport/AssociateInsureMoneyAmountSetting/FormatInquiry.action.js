import { message } from "antd";
import FormatInquirySevice from "services/AssociationHealthInsuranceReport/AssociateInsureMoneyAmountSetting/FormatInquiryService";

const FormatInquiryAction = {
  getScreenData() {
    return FormatInquirySevice.getScreenData()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  }
}

export default FormatInquiryAction;