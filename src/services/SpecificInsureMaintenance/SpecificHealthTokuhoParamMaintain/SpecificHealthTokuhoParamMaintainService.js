import axios from "configs/axios";

const APP_LIST = {
  getInit:"/api/specific-health-tokuho-param-maintain",
  save:"/api/specific-health-tokuho-param-maintain/save",
  saveAndUpdateSpecificHealthTokuhoParamMaintain: '/api/specific-health-tokuho-param-maintain/save-and-update',
  deleteSpecificHealthTokuhoParamMaintain: '/api/specific-health-tokuho-param-maintain/delete',
  inputEventSpecificHealthTokuhoParamMaintain: '/api/specific-health-tokuho-param-maintain/input',
};

const SpecificHealthTokuhoParamMaintainService = {
  async getInit() {
    return axios.get(APP_LIST.getInit );
  },
  async save(data) {
    return axios.post(APP_LIST.save,  {data:data  }  );
  },
  async saveAndUpdateSpecificHealthTokuhoParamMaintainService(params) {
    return axios.post(APP_LIST.saveAndUpdateSpecificHealthTokuhoParamMaintain, params);
  },
  async deleteSpecificHealthTokuhoParamMaintainService(params) {
    return axios.delete(APP_LIST.deleteSpecificHealthTokuhoParamMaintain, {params});
  },
  async inputEventSpecificHealthTokuhoParamMaintainService(params) {
    return axios.post(APP_LIST.inputEventSpecificHealthTokuhoParamMaintain, params);
  },
};

export default SpecificHealthTokuhoParamMaintainService;
