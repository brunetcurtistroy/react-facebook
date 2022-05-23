import { message } from "antd";
import PrinterConfirmService from "services/IntroductionLetter/IntroduceLetterMasterMaintain/PrinterConfirmService"
const PrinterConfirmAction = {
  getScreenData() {
    return PrinterConfirmService.getScreenData()
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  print(data) {
    return PrinterConfirmService.print(data)
  },
  review(data) {
    return PrinterConfirmService.review(data)
  },

}

export default PrinterConfirmAction;
