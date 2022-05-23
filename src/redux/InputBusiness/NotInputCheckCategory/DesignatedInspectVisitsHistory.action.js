import { message } from "antd";
import DesignatedInspectVisitsHistoryService from "services/InputBusiness/NotInputCheckCategory/DesignatedInspectVisitsHistoryService";

const DesignatedInspectVisitsHistoryAction = {
    GetListData(data) {
    return DesignatedInspectVisitsHistoryService.GetListData(data)
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

export default DesignatedInspectVisitsHistoryAction;
