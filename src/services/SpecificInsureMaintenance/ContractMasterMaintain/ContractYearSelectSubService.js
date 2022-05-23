import axios from "configs/axios";

const APP_LIST = {
  getListData:"/api/contract-master-maintain/contract-master-maintain/contract-year-select-sub", 
};

const ContractYearSelectSubService = {
  async getListData() {
    return axios.get(APP_LIST.getListData );
  } 
  
};

export default ContractYearSelectSubService;