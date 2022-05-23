import axios from "configs/axios";

const apiPaths = {
    getListData : "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/inspect-content/get-list-data"
};

const InspectContentService = {
  async getListData (params) {
    return axios.get(apiPaths.getListData, {params});
  } 
};
  
export default InspectContentService;