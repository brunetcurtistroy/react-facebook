import axios from "configs/axios";

const API_LIST = {
  getIndex: "/api/personal-reserve-process/visits-supplement-wk",
  updateContent:"/api/personal-reserve-process/visits-supplement-wk/update-content"
};

const VisitsSupplementWkService = {
  async getIndex(params) {
    return axios.get(API_LIST.getIndex , {params});
  },
  async updateContent(data) {
    return axios.put(API_LIST.updateContent , data);
  },
};

export default VisitsSupplementWkService;