import axios from 'configs/axios';

const apiPaths = {
  GetScreenData: '/api/not-input-check-category/print-instruction',
};

const PrintInstructionService = {
  async GetScreenData(params) {
    return axios.get(apiPaths.GetScreenData, { params });
  },

};

export default PrintInstructionService;
