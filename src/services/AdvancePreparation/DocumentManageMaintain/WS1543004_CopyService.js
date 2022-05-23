import axios from 'configs/axios';

const API_LIST = {
  f12_coppy: '/api/document-manage-maintain/copy/f12'
};

const Copy1543004Service = {
  async copyDataService(data) {
    return axios.post(API_LIST.f12_coppy, data);
  }
};

export default Copy1543004Service;
