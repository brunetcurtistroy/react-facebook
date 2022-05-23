import { message } from "antd";
import PrintStyleInquiryService from "services/ResultOutput/BindingModeSetting/PrintStyleInquiryService.js";

const PrintStyleInquiryAction = {
  GetListData(data) {
    return PrintStyleInquiryService.GetListData(data)
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
  },
  Configuration(data) {
    return PrintStyleInquiryService.Configuration(data)
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
  },
}

export default PrintStyleInquiryAction;
