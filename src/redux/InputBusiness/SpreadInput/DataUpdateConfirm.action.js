import { message } from "antd";
import DataUpdateConfirmService from "services/InputBusiness/SpreadInput/DataUpdateConfirmService";

const DataUpdateConfirmAction = {  
    DataUpdateConfirmAction(data) {
      return DataUpdateConfirmService.dataUpdateConfirmService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
  }
  
  export default DataUpdateConfirmAction;