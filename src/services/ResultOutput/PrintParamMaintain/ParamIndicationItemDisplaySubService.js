import axios from "configs/axios";

const APP_LIST = {
  getScreenData:"/api/print-param-maintain/param-indication-item-display-sub/get-screen-data",
  getListData:"/api/print-param-maintain/param-indication-item-display-sub/"
};
const ParamIndicationItemDisplaySubService = {
    async getScreenData(parram) {
      return axios.get(APP_LIST.getScreenData, { params: parram} );
    },
    async getListData(parram) {
      return axios.get(APP_LIST.getListData, { params: parram} );
    },
    
  };
  
  export default ParamIndicationItemDisplaySubService;