import axios from "configs/axios"; 
const API_LIST = {
  getIndex: "/api/personal-reserve-process/card-issuing-sub",
  SupplementarySet: "/api/personal-reserve-process/card-issuing-sub/supplementary-set"
};

const CardIssuingSubService = {
  async getIndexService(params) {
    return axios.get(API_LIST.getIndex , {params});
  },
  async SupplementarySet(data) {
    return axios.post(API_LIST.SupplementarySet , data);
  },
};

export default CardIssuingSubService;