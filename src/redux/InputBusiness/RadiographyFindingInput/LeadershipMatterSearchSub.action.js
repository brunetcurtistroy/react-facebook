import { message } from "antd";
import LeadershipMatterSearchSubService from "services/InputBusiness/RadiographyFindingInput/LeadershipMatterSearchSubService";

const LeadershipMatterSearchSubAction = {  
    getScreenDataAction(data) {
      return LeadershipMatterSearchSubService.getScreenDataService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    getListGuideItemInfoTableDisplayAction(data) {
        return LeadershipMatterSearchSubService.getListGuideItemInfoTableDisplayService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      selectDataDisplayAction(data) {
        return LeadershipMatterSearchSubService.selectDataDisplayService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      getListGuideItemInfoTableDisplayCategoryAction(data) {
        return LeadershipMatterSearchSubService.getListGuideItemInfoTableDisplayCategoryService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      }
  }
  
  export default LeadershipMatterSearchSubAction;