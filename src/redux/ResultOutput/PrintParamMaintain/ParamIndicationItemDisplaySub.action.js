import ParamIndicationItemDisplaySubService from "services/ResultOutput/PrintParamMaintain/ParamIndicationItemDisplaySubService"
import { message } from "antd";

const ParamIndicationItemDisplaySubAction = {
  getScreenData(data) {
    return ParamIndicationItemDisplaySubService.getScreenData(data)
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
    return ParamIndicationItemDisplaySubService.getListData(data)
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
  export default ParamIndicationItemDisplaySubAction;