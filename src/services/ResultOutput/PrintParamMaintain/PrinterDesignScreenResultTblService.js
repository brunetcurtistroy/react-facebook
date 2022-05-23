import axios from "configs/axios";

const APP_LIST = {
  screenDatatbl: "/api/print-param-maintain/printer-design-screen-result-tbl/get-screen-data",
  screenDatarelated: "/api/print-param-maintain/printer-design-screen-reserve-related/get-screen-data",
  print: '/api/print-param-maintain/printer-design-screen-result-tbl/print',
};
const PrinterDesignScreenResultTblService = {
  async getScreenDataTbl(params) {
    return axios.get(APP_LIST.screenDatatbl, { params });
  },
  async getScreenDatarelated(params) {
    return axios.get(APP_LIST.screenDatarelated, { params });
  },
  async onPrint(params) {
    return axios.get(APP_LIST.print, {params, responseType:'blob'})
  }
};

export default PrinterDesignScreenResultTblService;
