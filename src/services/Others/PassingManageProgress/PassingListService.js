import axios from 'configs/axios';

const API_LIST = {
  getScreenData: '/api/passing-manage-progress/passing-list',
};

const PassingListService = {
  async getScreenData() {
    return axios.get(API_LIST.getScreenData);
  },
};

export default PassingListService;
