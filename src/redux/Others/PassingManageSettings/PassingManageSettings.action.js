import { message } from "antd";
import PassingManageSettingsService from "services/Others/PassingManageSettings/PassingManageSettingsService";

const PassingManageSettingsAction = {
  getPassingItemList() {
    return PassingManageSettingsService.getPassingItemList()
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
  getTerminalEntryList() {
    return PassingManageSettingsService.getTerminalEntryList()
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
  getPassingMedicalExamList() {
    return PassingManageSettingsService.getPassingMedicalExamList()
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
  getTerminalPassingList() {
    return PassingManageSettingsService.getTerminalPassingList()
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
  savePassingItemList(data) {
    return PassingManageSettingsService.savePassingItemList(data)
  },
  saveTerminalEntryList(data) {
    return PassingManageSettingsService.saveTerminalEntryList(data)
  },
  savePassingMedicalExamList(data) {
    return PassingManageSettingsService.savePassingMedicalExamList(data)
  },
  saveTerminalPassingList(data) {
    return PassingManageSettingsService.saveTerminalPassingList(data)
  },

  deletePassingItemList(data) {
    return PassingManageSettingsService.deletePassingItemList(data)
  },
  deleteTerminalEntryList(data) {
    return PassingManageSettingsService.deleteTerminalEntryList(data)
  },
  deletePassingMedicalExamList(data) {
    return PassingManageSettingsService.deletePassingMedicalExamList(data)
  },
  deleteTerminalPassingList(data) {
    return PassingManageSettingsService.deleteTerminalPassingList(data)
  },

  // saveAndUpdatePassingManageSettings(data) {
  //   return PassingManageSettingsService.saveAndUpdatePassingManageSettings(data)
  // },
  // deletePassingManageSettings(data){
  //   return PassingManageSettingsService.deletePassingManageSettings(data)
  // }
}
export default PassingManageSettingsAction;
