import axios from "configs/axios";
const APP_LIST = {
    paramIndicationNameObtainingSu:"/api/print-param-maintain/old-item/paramIndicationNameObtainingSu",
    getScreenData:"/api/print-param-maintain/old-item/",
    saveData: "/api/print-param-maintain/old-item/save-and-update",
    deleteData: "/api/print-param-maintain/old-item/delete",
    instructiondivisionchange: "/api/print-param-maintain/old-item/instruction-division-change",
};
const OldItemService = {
    async paramIndicationNameObtainingSu(data) {
      return axios.get(APP_LIST.paramIndicationNameObtainingSu, data );
    },
    async getScreenData(params) {
      return axios.get(APP_LIST.getScreenData,{ params });
    },
    async saveData(params) {
      return axios.post(APP_LIST.saveData, params);
    },
    async deleteData(params) {
        return axios.delete(APP_LIST.deleteData, { params });
    },
    async instructiondivisionchange(params) {
      return axios.post(APP_LIST.instructiondivisionchange, params);
    },
  };
  
  export default OldItemService;