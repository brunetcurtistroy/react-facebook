import { message } from "antd";
import RadiographyFindingsSubmitService from "services/InputBusiness/RadiographyFindingInput/RadiographyFindingsSubmitService";

const RadiographyFindingsSubmitAction = {  
    getRetrival(data) {
      return RadiographyFindingsSubmitService.getRetrival(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    getRadiographyInspectSelect(data) {
      return RadiographyFindingsSubmitService.getRadiographyInspectSelect(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    getRadiographyContentsOfQuery(data) {
      return RadiographyFindingsSubmitService.getRadiographyContentsOfQuery(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
  }
  
  export default RadiographyFindingsSubmitAction;