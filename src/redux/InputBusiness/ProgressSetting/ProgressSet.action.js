import { message } from "antd";
import ProgressSetService from "services/InputBusiness/ProgressSetting/ProgressSetService";

const ProgressSetAction = {
  getScreenData() {
    return ProgressSetService.getScreenData()
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

  searchData(data) {
    return ProgressSetService.searchData(data)
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

  updateData(data) {
    return ProgressSetService.updateData(data)
  }
}

export default ProgressSetAction;