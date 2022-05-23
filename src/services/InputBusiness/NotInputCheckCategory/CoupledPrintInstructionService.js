import axios from 'configs/axios';

const apiPaths = {
  GetScreenData: '/api/not-input-check-category/coupled-print-instruction',
  PrintF12: '/api/not-input-check-category/coupled-print-instruction/f12',
};

const CoupledPrintInstructionService = {
  async GetScreenData(params) {
    return axios.get(apiPaths.GetScreenData, { params });
  },
  async PrintF12(params) {
    return axios.post(apiPaths.PrintF12, params );
  },

};

export default CoupledPrintInstructionService;
