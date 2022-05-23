import axios from 'configs/axios';

const API_LIST = {
  f12_copy: '/api/document-manage-maintain/copy-WS0638007/f12'
};

const Copy0638007Service = {
  async copyDataService(data) {
    return axios.post(API_LIST.f12_copy, data);
  }
};

export default Copy0638007Service;
