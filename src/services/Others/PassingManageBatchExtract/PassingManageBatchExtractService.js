import { message } from "antd";
import axios from "configs/axios";
import ConsultInfoListService from "services/AdvancePreparation/ConsultInfoList/ConsultInfoListService";
const apiPaths = {
    getScreenData: "/api/passing-manage-batch-extract/passing-manage-batch-extract/getscreendata",
    getExtractList: "/api/passing-manage-batch-extract/passing-manage-batch-extract/getextractlist",
    getDisplaySearch: "/api/passing-manage-batch-extract/passing-manage-batch-extract/getdisplaysearch",
    getBatchExtractBtn: "/api/passing-manage-batch-extract/passing-manage-batch-extract/getbatchextractbtn",
};
const PassingManageBatchExtractService = {
    async getScreenData(params) {
      return axios.get(apiPaths.getScreenData,{params});
    },
    async getExtractList(params) {
      return axios.get(apiPaths.getExtractList,{params});
    },
    async getDisplaySearch(params){
      return axios.get(apiPaths.getDisplaySearch,{params});
    },
    async getBatchExtractBtn(params){
      return axios.get(apiPaths.getBatchExtractBtn,{params});
    }
}
export default PassingManageBatchExtractService;