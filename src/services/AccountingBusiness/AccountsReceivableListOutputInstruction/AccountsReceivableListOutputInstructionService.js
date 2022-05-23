import axios from "configs/axios";
const API_LIST = {
  GetScreenData: "/api/accounts-receivable-list-output-instruction/accounts-receivable-list-output-instruction/get-screen-data",
  Csv_F11: "/api/accounts-receivable-list-output-instruction/accounts-receivable-list-output-instruction/f11",
  Printer_F12: "/api/accounts-receivable-list-output-instruction/accounts-receivable-list-output-instruction/f12"
};

const AccountsReceivableListOutputInstructionService = {
  async GetScreenData() {
    return axios.get(API_LIST.GetScreenData);
  },
  async Csv_F11(params) {
    return axios.get(API_LIST.Csv_F11, { params, responseType: 'blob', });
  },
  async Printer_F12(params) {
    return axios.get(API_LIST.Printer_F12, { params, responseType: 'blob', });
  }
};
export default AccountsReceivableListOutputInstructionService;
