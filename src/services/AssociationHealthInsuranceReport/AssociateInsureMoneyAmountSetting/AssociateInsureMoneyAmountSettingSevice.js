import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/associate-insure-money-amount-setting/associate-insure-money-amount-setting",
    paramsBtn: "/api/associate-insure-money-amount-setting/associate-insure-money-amount-setting/params-btn",
    inputBtn: "/api/associate-insure-money-amount-setting/associate-insure-money-amount-setting/input-btn",
    updateOrCreate: "/api/associate-insure-money-amount-setting/associate-insure-money-amount-setting",
    deleteRecord: "/api/associate-insure-money-amount-setting/associate-insure-money-amount-setting",
};

const AssociateInsureMoneyAmountSettingSevice = {
  async getScreenData() {
    return axios.get(apiPaths.getScreenData);
  },

  async paramsBtn(params) {
    return axios.post(apiPaths.paramsBtn, params);
  },

  async inputBtn(params) {
    return axios.get(apiPaths.inputBtn, {params});
  },

  async updateOrCreate(params) {
    return axios.put(apiPaths.updateOrCreate, params);
  },

  async deleteRecord(params) {
    return axios.delete(apiPaths.deleteRecord, {params});
  }
};
  
export default AssociateInsureMoneyAmountSettingSevice;
