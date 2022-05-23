import axios from 'configs/axios';

const apiPaths = {
  getScreenData: '/api/print-param-maintain/printer-design-screen-reserve-related/get-screen-data',
  print: '/api/print-param-maintain/printer-design-screen-reserve-related/print',
};

const PrinterDesignReserveRelatedService = {
  async onScreenData(params) {
    return axios.get(apiPaths.getScreenData, { params });
  },
  async onPrint(params) {
    return axios.get(apiPaths.print, { params, responseType: 'blobl' })
  }
};

export default PrinterDesignReserveRelatedService;
