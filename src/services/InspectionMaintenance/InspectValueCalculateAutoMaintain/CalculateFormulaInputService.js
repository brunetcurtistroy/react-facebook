import axios from 'configs/axios'; 
const API_LIST = {
    getListData: '/api/inspect-value-calculate-auto-maintain/calculate-formula-input',
    RegisterBtn: '/api/inspect-value-calculate-auto-maintain/calculate-formula-input/register-btn',
}

const CalculateFormulaInputService = {
  async GetListData(params) {
    return axios.get(API_LIST.getListData, {params});
  },
  async RegisterBtn(params) {
    return axios.put(API_LIST.RegisterBtn,  params  );
  }, 
};

export default CalculateFormulaInputService;
