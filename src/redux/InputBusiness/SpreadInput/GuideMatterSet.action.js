import { message } from "antd";
import GuideMatterSetService from "services/InputBusiness/SpreadInput/GuideMatterSetService";

const GuideMatterSetAction = {  
    GetLisstNotesSetAction(data) {
      return GuideMatterSetService.GetListGuidMatterSetService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    SaveDataAction(data) {
        return GuideMatterSetService.SaveDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      DeleteDataAction(data) {
        return GuideMatterSetService.DeleteDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
  }
  
  export default GuideMatterSetAction;