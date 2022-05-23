import { message } from "antd";
import SetInfoBatchProcessService from "services/basicInfo/SetInfoMaintain/SetInfoBatchProcessService";

const SetInfoBatchProcessAction = {  
    searchInfo(data) {
      return SetInfoBatchProcessService.searchInfo(data)
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

    GetNameInspectCode(data) {
      return SetInfoBatchProcessService.GetNameInspectCode(data)
    }
  }
  
  export default SetInfoBatchProcessAction;