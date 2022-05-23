import axios from "configs/axios";

const APP_LIST = {
  getListData:"/api/contract-master-maintain/contract-master-maintain/get-data-contract-compiled-query", 
};

const ContractCompiledQueryService = {
  async getListData(params) {
    console.log(params)
    return axios.get(APP_LIST.getListData,{params} );
  } 
};

export default ContractCompiledQueryService;