import { message } from "antd";
import TerminalListService from "services/Others/PassingManageProgress/TerminalListService";

const TerminalListAction = {
  getScreenData() {
    return TerminalListService.getScreenData()
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
export default TerminalListAction;
