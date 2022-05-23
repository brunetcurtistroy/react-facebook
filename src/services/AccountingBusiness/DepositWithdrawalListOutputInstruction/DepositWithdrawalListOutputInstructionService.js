import axios from "configs/axios";

const API_LIST = {
  GetScreenData: "/api/deposit-withdrawal-list-output-instruction/deposit-withdrawal-list-output-instruction/get-screen-data",
  Output_csv: "/api/deposit-withdrawal-list-output-instruction/deposit-withdrawal-list-output-instruction/csv",
  Print_F12: "/api/deposit-withdrawal-list-output-instruction/deposit-withdrawal-list-output-instruction/print",
};

const DepositWithdrawalListOutputInstructionService = {
  async GetScreenData() {
    return axios.get(API_LIST.GetScreenData);
  },
  async Output_csv(params) {
    return axios.get(API_LIST.Output_csv, {params});
  },
  async Print_F12(params) {
    return axios.get(API_LIST.Print_F12, { params, responseType: 'blob', });
  }
};

export default DepositWithdrawalListOutputInstructionService;
