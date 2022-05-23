import axios from "configs/axios";

const API_LIST = {
  onFormatSelect: '/api/introduce-letter-extract/format-select',
  onConfirm: '/api/introduce-letter-extract/format-select/confirm',
};

const FormatSelectService = {
  async onFormatSelect() {
    return axios.get(API_LIST.onFormatSelect);
  },
  async onConfirm(params) {
    return axios.get(API_LIST.onConfirm, { params })
  }
};

export default FormatSelectService;
