import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/input-new",
    update: "/api/associate-insure-money-amount-setting/input-new",
};

const InputNewService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },

  async update(params) {
    return axios.put(apiPaths.update, params);
  }
};
  
export default InputNewService;
