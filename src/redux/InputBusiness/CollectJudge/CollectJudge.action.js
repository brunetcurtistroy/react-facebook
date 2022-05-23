import CollectJudgeService from "services/InputBusiness/CollectJudge/CollectJudgeService";
import { message } from "antd";

const CollectJudgeAction = {
  getScreenData() {
    return CollectJudgeService.getScreenDataService()
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

  getDataBySearch(data) {
    return CollectJudgeService.getDataBySearchService(data)
  },

  verification(data) {
    return CollectJudgeService.verification(data)
  }

};

export default CollectJudgeAction;