import axios from 'configs/axios';

const API_LIST = {
  CopyExec: '/api/contract-info-maintain/condition-copy/CopyExec',
};

const ConditionCopyService = {
  async CopyExec(data) {
    return axios.post(API_LIST.CopyExec, data);
  },
};

export default ConditionCopyService;
