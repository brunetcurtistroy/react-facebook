import { message } from "antd";
import HistoryInputSubService from "services/InputBusiness/NotInputCheckCategory/HistoryInputSubService";

const HistoryInputSubAction = {
  getScreenData(data) {
    return HistoryInputSubService.GetScreenData(data)
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
  getListData(data) {
    return HistoryInputSubService.ListData(data)
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
  saveData(data) {
    return HistoryInputSubService.SaveData(data)
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
deleteData(data) {
    return HistoryInputSubService.DeletData(data).then()
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

export default HistoryInputSubAction;