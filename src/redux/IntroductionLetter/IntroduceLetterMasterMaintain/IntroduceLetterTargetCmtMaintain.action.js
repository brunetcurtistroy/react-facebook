import { message } from "antd";
import IntroduceLetterTargetCmtMaintainService from "services/IntroductionLetter/IntroduceLetterMasterMaintain/IntroduceLetterTargetCmtMaintainService"


const IntroduceLetterTargetCmtMaintainAction = {
  getMaintain(data) {
    return IntroduceLetterTargetCmtMaintainService.getMaintain(data)
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
  getInspectMaintain(data) {
    return IntroduceLetterTargetCmtMaintainService.getInspectMaintain(data)
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
  userAction1(data) {
    return IntroduceLetterTargetCmtMaintainService.userAction1(data)
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
  deleteDataInspect(data) {
    return IntroduceLetterTargetCmtMaintainService.deleteDataInspect(data)
  },
  deleteMaintain(data) {
    return IntroduceLetterTargetCmtMaintainService.deleteMaintain(data)
  },
  saveDataInspect(data) {
    return IntroduceLetterTargetCmtMaintainService.saveDataInspect(data)
  },
  saveMaintain(data) {
    return IntroduceLetterTargetCmtMaintainService.saveMaintain(data)
  }
}

export default IntroduceLetterTargetCmtMaintainAction;