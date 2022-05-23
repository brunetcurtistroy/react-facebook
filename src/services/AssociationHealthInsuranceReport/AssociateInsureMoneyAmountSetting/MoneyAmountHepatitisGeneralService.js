import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/money-amount-hepatitis-general",
    updateRecord: "/api/associate-insure-money-amount-setting/money-amount-hepatitis-general",
};

const MoneyAmountHepatitisGeneralService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },

  async updateRecord(params) {
    return axios.put(apiPaths.updateRecord, params);
  }
};
  
export default MoneyAmountHepatitisGeneralService;