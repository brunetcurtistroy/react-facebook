import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/progress-setting/progress-set/get-screen-data",
    searchData: "/api/progress-setting/progress-set/search-data",
    updateData: "/api/progress-setting/progress-set/update",
};

const ProgressSetService = {
  async getScreenData() {
    return axios.get(apiPaths.getScreenData);
  },

  async searchData(params) {
    return axios.get(apiPaths.searchData, {params});
  },

  async updateData(params) {
    return axios.put(apiPaths.updateData, {data:params});
  }
};
  
export default ProgressSetService;