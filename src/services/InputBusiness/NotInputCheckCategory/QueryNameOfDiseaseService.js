import axios from 'configs/axios';

const apiPaths = {
    getDataScreen: '/api/not-input-check-category/query-name-of-disease',
};

const QueryNameOfDiseaseService = {
  async getDataScreen(params) {
    return axios.get(apiPaths.getDataScreen, { params });
  },

};

export default QueryNameOfDiseaseService;
