import axios from "configs/axios";

const API_LIST = {
  getIndex: "/api/personal-reserve-process/visits-supplement",
  updateContent:"/api/personal-reserve-process/visits-supplement/update-content"
};

const VisitsSupplementService = {
  async getIndex(params) {
    return axios.get(API_LIST.getIndex , {params});
  },
  async updateContent(data) {
    return axios.put(API_LIST.updateContent , data);
  },
};

export default VisitsSupplementService;
