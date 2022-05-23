import { message } from "antd";
import KeyItemInquiryService from "services/InputBusiness/ProgressSetting/KeyItemInquiryService";

const KeyItemInquiryAction = {
  getScreenData() {
    return KeyItemInquiryService.getScreenDataService()
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

export default KeyItemInquiryAction;