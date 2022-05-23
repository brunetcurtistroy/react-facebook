import axios from 'configs/axios'; 
const API_LIST = {
    getInit: '/api/inspect-value-calculate-auto-maintain/copy',
    CopyRegister : '/api/inspect-value-calculate-auto-maintain/copy/copy-register',
}

const CopyService = {
  async getInit(params) {
    return axios.get(API_LIST.getInit, {params} );
  },
  async CopyRegister(params) {
    return axios.put(API_LIST.CopyRegister,  params  );
  }, 
};

export default CopyService;
