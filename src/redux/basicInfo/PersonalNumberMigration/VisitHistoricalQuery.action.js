import VisitHistoricalQueryService from "services/basicInfo/PersonalNumberMigration/VisitHistoricalQueryService";
import { message } from "antd";

const VisitHistoricalQueryAction = {
  getVisitHistoricalQueryAPIAction(data) {
    return VisitHistoricalQueryService.getVisitHistoricalQueryService(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default VisitHistoricalQueryAction;