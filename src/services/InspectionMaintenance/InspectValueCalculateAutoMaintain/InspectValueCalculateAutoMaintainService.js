import axios from 'configs/axios';

const API_LIST = {
    getDataSearch: '/api/inspect-value-calculate-auto-maintain/inspect-value-calculate-auto-maintain/inspect-value-calculated-autoally',
    input: '/api/associate-insure-param-maintain/input',
    getParamCreate: '/api/associate-insure-param-maintain/param-create',
    save:'/api/associate-insure-param-maintain/save'
};

const InspectValueCalculateAutoMaintainService = {
  async getDataSearch(params) {
    return axios.get(API_LIST.getDataSearch, {params} );
  }, 
};

export default InspectValueCalculateAutoMaintainService;
