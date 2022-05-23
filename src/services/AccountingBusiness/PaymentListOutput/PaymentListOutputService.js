import axios from "configs/axios";
const API_LIST = {
  GetScreenData: "/api/payment-list-output/payment-list-output/get-screen-data",
  Printer_F12: "/api/payment-list-output/payment-list-output/f12"
};

const PaymentListOutputService = {
  async GetScreenData() {
    return axios.get(API_LIST.GetScreenData);
  },
  async Printer_F12(params) {
    return axios.get(API_LIST.Printer_F12, {params, responseType: 'blob',});
  }
};
export default PaymentListOutputService;
