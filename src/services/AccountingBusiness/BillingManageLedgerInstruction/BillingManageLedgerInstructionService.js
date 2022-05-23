import axios from "configs/axios";
const API_LIST = {
  GetScreenData: "/api/billing-manage-ledger-instruction/billing-manage-ledger-instruction/get-screen-data",
  Output_F12: "/api/billing-manage-ledger-instruction/billing-manage-ledger-instruction/output-f12"
};

const BillingManageLedgerInstructionService = {
  async GetScreenData(params) {
    return axios.get(API_LIST.GetScreenData, { params });
  },
  async Output_F12(params) {
    return axios.post(API_LIST.Output_F12, params);
  }
};
export default BillingManageLedgerInstructionService;
