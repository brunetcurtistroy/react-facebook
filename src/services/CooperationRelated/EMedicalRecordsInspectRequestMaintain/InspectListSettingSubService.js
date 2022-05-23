import axios from "configs/axios";

const APP_LIST = {
    getScreenDataInspectListSettingSub: "/api/e-medical-records-inspect-request-maintain/inspect-list-setting-sub/get-screen-data",
    getDataInspectListSettingSub: '/api/e-medical-records-inspect-request-maintain/inspect-list-setting-sub',
    saveAndUpdateInspectListSettingSub: '/api/e-medical-records-inspect-request-maintain/inspect-list-setting-sub/save-and-update',
    deleteInspectListSettingSub: '/api/e-medical-records-inspect-request-maintain/inspect-list-setting-sub/delete',
    localAcquisitionInspectListSettingSub: '/api/e-medical-records-inspect-request-maintain/inspect-list-setting-sub/local-acquisition',
};

const InspectListSettingSubService = {
  async getScreenDataInspectListSettingSubService(params) {
    return axios.get(APP_LIST.getScreenDataInspectListSettingSub, {params} );
  },
  async getDataInspectListSettingSubService() {
    return axios.get(APP_LIST.getDataInspectListSettingSub);
  },
  async saveAndUpdateInspectListSettingSubService(params) {
    return axios.post(APP_LIST.saveAndUpdateInspectListSettingSub, params);
  },
  async deleteInspectListSettingSubService(params) {
    return axios.delete(APP_LIST.deleteInspectListSettingSub, {params} );
  },
  async localAcquisitionInspectListSettingSubService() {
    return axios.get(APP_LIST.localAcquisitionInspectListSettingSub);
  },
};

export default InspectListSettingSubService;