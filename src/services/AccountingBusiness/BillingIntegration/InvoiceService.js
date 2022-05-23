import axios from "configs/axios"; 
const API_LIST = {
  GetScreenData: "/api/billing-integration/invoice/get-screen-data",
};

const InvoiceService = {
  async GetScreenData(params) { 
    return axios.get(API_LIST.GetScreenData, { params });
  }
}; 
export default InvoiceService;
