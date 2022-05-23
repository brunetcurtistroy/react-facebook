import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/implement-money-amount-general",
    updateRecord: "/api/associate-insure-money-amount-setting/implement-money-amount-general",
};

const ImplementMoneyAmountGeneralService = {
  async getScreenData(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },

  async updateRecord(params) {
    return axios.put(apiPaths.updateRecord, params);
  },
};
  
export default ImplementMoneyAmountGeneralService;
