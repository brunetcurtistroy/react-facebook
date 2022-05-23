import axios from "configs/axios";

const apiPaths = {
    getListData : "/api/online-instruction/online-instruction",
};

const OnlineInstructionService = {
  async GetListData () {
    return axios.get(apiPaths.getListData);
  }
};
  
export default OnlineInstructionService;
