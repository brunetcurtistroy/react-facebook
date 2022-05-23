import axios from 'configs/axios';

const API_LIST = {
    getInit: '/api/associate-insure-param-maintain',
    input: '/api/associate-insure-param-maintain/input',
    getParamCreate: '/api/associate-insure-param-maintain/param-create',
    save:'/api/associate-insure-param-maintain/save'
};

const AssociateInsureParamMaintainService = {
  async getInit() {
    return axios.get(API_LIST.getInit);
  },
  async input(params) {  
    return axios.get(API_LIST.input, {params});
  },
  async getParamCreate(params) {
    return axios.post(API_LIST.getParamCreate,{params});
  },
  async save(data) {
    return axios.post(API_LIST.save,{data: data});
  },
  
};

export default AssociateInsureParamMaintainService;
