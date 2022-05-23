import axios from "configs/axios";

import ApiPaths from "../constants/ApiPaths";

const InsurerService = {
  async getInsurersList(){
    return axios.get(ApiPaths.INSURER.LIST);
  },

  async getInsurerDetail(id){
    return axios.get(ApiPaths.INSURER.DETAIL + id);
  },
};

export default InsurerService;
