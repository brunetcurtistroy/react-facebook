import { message } from "antd";
import FindingsHistoryListService from "services/InputBusiness/RadiographyFindingInput/FindingsHistoryListService";

const FindingsHistoryListAction = {  
    getListDataAction(data) {
      return FindingsHistoryListService.getListDataService()
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  }
  
  export default FindingsHistoryListAction;