import { message } from "antd";
import JudgeSelectQuerySubService from "services/InputBusiness/RadiographyFindingInput/JudgeSelectQuerySubService";

const RadiographyFindingInputAction = {  
    getListDataAction(data) {
      return JudgeSelectQuerySubService.getListDataService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    }
  }
  
  export default RadiographyFindingInputAction;