import { message } from "antd";
import IntroduceLetterTargetCmtInspectMaintainService from "services/IntroductionLetter/IntroduceLetterMasterMaintain/IntroduceLetterTargetCmtInspectMaintain"
const IntroduceLetterTargetCmtInspectMaintainAction = {
  GetScreenData(data) {
    return IntroduceLetterTargetCmtInspectMaintainService.GetScreenData(data)
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
  GetListData(data) {
    return IntroduceLetterTargetCmtInspectMaintainService.GetListData(data)
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
  deleteData(data) {
    return IntroduceLetterTargetCmtInspectMaintainService.deleteData(data)
  },
  saveData(data) {
    return IntroduceLetterTargetCmtInspectMaintainService.saveData(data)
  },

}

export default IntroduceLetterTargetCmtInspectMaintainAction;
