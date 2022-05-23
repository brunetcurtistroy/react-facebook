import { message } from "antd";
import GuideMatterSettingSpreadService from "services/InputBusiness/SpreadInput/GuideMatterSettingSpreadService";

const GuideMatterSettingSpreadAction = {  
    GetListGuideMatterSettingSpreadAction(data) {
      return GuideMatterSettingSpreadService.GetListGuideMatterSettingSpreadService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    SaveDataAction(data) {
        return GuideMatterSettingSpreadService.SaveDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      DeleteDataAction(data) {
        return GuideMatterSettingSpreadService.DeleteDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
  }
  
  export default GuideMatterSettingSpreadAction;