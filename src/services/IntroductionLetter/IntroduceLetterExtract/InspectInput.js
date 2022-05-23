import axios from "configs/axios";

const API_LIST = {
  getInspectInput: '/api/introduce-letter-extract/inspect-input',
  onDeleteData: '/api/introduce-letter-extract/inspect-input/delete-data',
  onGzoom: '/api/introduce-letter-extract/inspect-input/gzoom',
  onSaveData: '/api/introduce-letter-extract/inspect-input/save-data',
};

const InspectInputService = {
  async onGetInspectInput(params) {
    return axios.get(API_LIST.getInspectInput, { params });
  },
  async onDeleteData(params) {
    return axios.get(API_LIST.onDeleteData, { params });
  },
  async onGzoom(params) {
    return axios.get(API_LIST.onGzoom, { params });
  },
  async onSaveData(params) {
    return axios.get(API_LIST.onSaveData, { params });
  },
};

export default InspectInputService;
