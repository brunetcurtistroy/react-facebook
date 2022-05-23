import { message } from "antd";
import PassingListService from "services/Others/PassingManageProgress/PassingListService";

const PassingListAction = {
  getScreenData() {
    return PassingListService.getScreenData()
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
export default PassingListAction;
