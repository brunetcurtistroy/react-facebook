import axios from "configs/axios";

const pathPersonal = {
  getDataGeneration: "/api/personal-info-maintain-directly/personal-info-maintain/display-data-generation",
  // registerPersonal: "/api/personal-info-maintain-directly/personal-info-maintain/data-register",
  updatePersonal: "/api/personal-info-maintain-directly/personal-info-maintain/data-insert",
  getInitCreatePersonal: '/api/personal-info-maintain-directly/personal-info-maintain/initial-display-create',
  getPersonalInfoSearch: "/api/personal-info-maintain-directly/personal-info-search-query",
  getPersonalInfoSearchOffice: "/api/personal-info-maintain-directly/personal-info-search-query/office",
  deleteAffiliation: '/api/personal-info-maintain-directly/personal-info-maintain/affiliation-delete/',
  getVariousNamesList: '/api/personal-info-maintain-directly/extension/get-screen-data',
  setAddressToDefault: '/api/personal-info-maintain-directly/personal-info-maintain/address-provisions',
  specialDeletePersonalInfoMaintain: '/api/personal-info-maintain-directly/personal-info-maintain/special-delete',
  getDataScreenPersonalInfoMain: '/api/personal-info-maintain-directly/personal-info-maintain/get-screen-data',
  eventF11PersonalInfoMain: '/api/personal-info-maintain-directly/personal-info-maintain/delete-f11-1',
  eventF11DeleteDataPersonalInfoMain: '/api/personal-info-maintain-directly/personal-info-maintain/delete-f11-2',
  getNameZipCode: '/api/personal-info-maintain-directly/personal-info-maintain/get-name-w5-postal-cd',
};

const PersonalInfoMaintainService = {
  async getInitialDisplayCreatePersonalService() {
    return axios.get(pathPersonal.getInitCreatePersonal);
  },

  async getDataGenerationService(id) {
    return axios.get(pathPersonal.getDataGeneration + `?personal_number_id=${id}`);
  },

  async registerPersonalService(personal) {
    return axios.post(pathPersonal.updatePersonal, personal);
  },

  async updatePersonalService(personal) {
    return axios.post(pathPersonal.updatePersonal, personal);
  },

  async getPersonalInfoSearchService(params) {
    return axios.get(pathPersonal.getPersonalInfoSearch, { params });
  },

  async getPersonalInfoSearchOfficeService(params) {
    return axios.get(pathPersonal.getPersonalInfoSearchOffice, { params });
  },

  async deleteAffiliationService(id) {
    return axios.delete(pathPersonal.deleteAffiliation + id)
  },

  async getVariousNamesListService() {
    return axios.get(pathPersonal.getVariousNamesList)
  },

  async setAddressToDefaultService(params) {
    return axios.put(pathPersonal.setAddressToDefault, params)
  },

  async specialDeletePersonalInfoMaintainService(params) {
    return axios.delete(pathPersonal.specialDeletePersonalInfoMaintain, { params })
  },

  async getDataScreenPersonalInfoMainService() {
    return axios.get(pathPersonal.getDataScreenPersonalInfoMain)
  },

  async eventF11PersonalInfoMain(params) {
    return axios.delete(pathPersonal.eventF11PersonalInfoMain, { params })
  },

  async eventF11DeleteDataPersonalInfoMain(params) {
    return axios.delete(pathPersonal.eventF11DeleteDataPersonalInfoMain, { params })
  },
  async getNameZipCodeService(params) {
    return axios.get(pathPersonal.getNameZipCode, { params });
  },
}

export default PersonalInfoMaintainService;
