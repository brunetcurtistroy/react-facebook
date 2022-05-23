import { message } from "antd";
import StyleQueryService from "services/InputBusiness/NotInputCheckCategory/StyleQueryService";

const StyleQueryAction = {
    GetListData(data) {
    return StyleQueryService.GetListData(data)
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

export default StyleQueryAction;
