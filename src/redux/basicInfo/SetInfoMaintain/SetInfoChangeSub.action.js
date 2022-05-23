import { message } from "antd";
import SetInfoChangeSubService from "services/basicInfo/SetInfoMaintain/SetInfoChangeSubService";

const SetInfoChangeSubAction = {
  getScreenData(data) {
    return SetInfoChangeSubService.getScreenData(data)
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

  getComboboxStartDate(data) {
    return SetInfoChangeSubService.getComboboxStartDate(data)
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

  getCondition(data) {
    return SetInfoChangeSubService.getCondition(data)
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

  getLeftListData(data) {
    return SetInfoChangeSubService.getLeftListData(data)
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

  getLeftExamListData(data) {
    return SetInfoChangeSubService.getLeftExamListData(data)
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

  getLeftSetListData(data) {
    return SetInfoChangeSubService.getLeftSetListData(data)
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

  getRightListData(data) {
    return SetInfoChangeSubService.getRightListData(data)
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

  addInspectItem(data) {
    return SetInfoChangeSubService.addInspectItem(data)
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

  removeInspectItem(data) {
    return SetInfoChangeSubService.removeInspectItem(data) 
  },

  outputButton(data) {
    return SetInfoChangeSubService.outputButton(data)
  },

  updateButton(data) {
    return SetInfoChangeSubService.updateButton(data)
  },
  
  createData(data) {
    return SetInfoChangeSubService.createData(data)
  },

  changeCondition(data) {
    return SetInfoChangeSubService.changeCondition(data)
  },

  getExamName(data) {
    return SetInfoChangeSubService.getExamName(data)
  },

  historyDelete(data) {
    return SetInfoChangeSubService.historyDelete(data)
  }
}

export default SetInfoChangeSubAction;