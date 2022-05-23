import axios from "configs/axios";

const APP_LIST = {
  getListData:"/api/contract-master-maintain/contract-master-maintain/get-data-inspect-item-search-query-single-039",
  getListData034:'/api/contract-master-maintain/contract-master-maintain/get-data-inspect-item-search-query-single-034' 
};

const InspectItemSearchQuerySingleService = {
  async getListData(params) {
    return axios.get(APP_LIST.getListData, {params} );
  },
  async getListData034(params) {
    return axios.get(APP_LIST.getListData034, {params} );
  }  
  
};

export default InspectItemSearchQuerySingleService;