import axios from "configs/axios";

const apiPaths = {
    getScreenData : '/api/personal-number-migration/getScreenData',
    buttonF12: '/api/personal-number-migration/f12',
    officeSpecialMaintainSaveButton: '/api/personal-number-migration/office-special-maintain/save-button',
    getOfficeSpecialDisplay: '/api/personal-number-migration/office-special-display',
    getDataOfficeSpecialMaintain: '/api/personal-number-migration/office-special-maintain',
    deleteDataOfficeSpecialMaintain: '/api/personal-number-migration/office-special-maintain/delete',
};

const PersonalNumberMigrationService = {
  // WS0401001_PersonalNumberMigration
  async getScreenDataService (params) {
    return axios.get(apiPaths.getScreenData, {params});
  },
  async buttonF12Service (params) {
    return axios.post(apiPaths.buttonF12, params);
  },

  // WS0252001_OfficeSpecialMaintain
  async getDataOfficeSpecialMaintainService (params) {
    return axios.get(apiPaths.getDataOfficeSpecialMaintain, {params});
  },
  async officeSpecialMaintainSaveButtonService (params) {
    return axios.post(apiPaths.officeSpecialMaintainSaveButton, params);
  },
  async deleteDataOfficeSpecialMaintainService (params) {
    return axios.delete(apiPaths.deleteDataOfficeSpecialMaintain, {params});
  },
  
  // WS0251003_OfficeSpecialDisplay
  async getOfficeSpecialDisplayService (params) {
    return axios.get(apiPaths.getOfficeSpecialDisplay, {params});
  },
};
export default PersonalNumberMigrationService;