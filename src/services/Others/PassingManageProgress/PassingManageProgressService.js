import axios from "configs/axios";
import ConsultInfoListService from "services/AdvancePreparation/ConsultInfoList/ConsultInfoListService";
const apiPaths = {
    getScreenData: "/api/passing-manage-progress/passing-manage-progress/getscreendata",
    getStatusList: "/api/passing-manage-progress/passing-manage-progress/statuslist",
};
const ProgressSetService = {
    async getScreenData(params) {
      return axios.get(apiPaths.getScreenData,{params});
    },
    async getStatusList(params) {
      return axios.get(apiPaths.getStatusList, {params});
  }
};

export default ProgressSetService;