import axios from 'configs/axios';

const API_LIST = {
  getScreenData: '/api/passing-manage-progress/terminal-list',
};

const TerminalListService = {
  async getScreenData() {
    return axios.get(API_LIST.getScreenData);
  },
};

export default TerminalListService;
