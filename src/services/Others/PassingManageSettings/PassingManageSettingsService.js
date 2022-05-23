import axios from 'configs/axios';

const API_LIST = {
  getPassingItemList: '/api/passing-manage-settings/passing-manage-settings/passing-item-list',
  getTerminalEntryList: '/api/passing-manage-settings/passing-manage-settings/terminal-entry-list',
  getPassingMedicalExamList: '/api/passing-manage-settings/passing-manage-settings/passing-medical-exam-list',
  getTerminalPassingList: '/api/passing-manage-settings/passing-manage-settings/terminal-passing-list',

  savePassingItemList: '/api/passing-manage-settings/passing-manage-settings/save-passing-item-list',
  saveTerminalEntryList: '/api/passing-manage-settings/passing-manage-settings/save-terminal-entry-list',
  savePassingMedicalExamList: '/api/passing-manage-settings/passing-manage-settings/save-passing-medical-exam-list',
  saveTerminalPassingList: '/api/passing-manage-settings/passing-manage-settings/save-terminal-passing-list',

  deletePassingItemList: '/api/passing-manage-settings/passing-manage-settings/delete-passing-item-list',
  deleteTerminalEntryList: '/api/passing-manage-settings/passing-manage-settings/delete-terminal-entry-list',
  deletePassingMedicalExamList: '/api/passing-manage-settings/passing-manage-settings/delete-passing-medical-exam-list',
  deleteTerminalPassingList: '/api/passing-manage-settings/passing-manage-settings/delete-terminal-passing-list',


  // saveAndUpdatePassingManageSettings: '/api/passing-manage-settings/passing-manage-settings/save',
  // deletePassingManageSettings: '/api/passing-manage-settings/passing-manage-settings/delete',
};

const PassingManageSettingsService = {
  async getPassingItemList() {
    return axios.get(API_LIST.getPassingItemList);
  },
  async getTerminalEntryList() {
    return axios.get(API_LIST.getTerminalEntryList);
  },
  async getPassingMedicalExamList() {
    return axios.get(API_LIST.getPassingMedicalExamList);
  },
  async getTerminalPassingList() {
    return axios.get(API_LIST.getTerminalPassingList);
  },

  async savePassingItemList(params) {
    return axios.post(API_LIST.savePassingItemList, params);
  },
  async saveTerminalEntryList(params) {
    return axios.post(API_LIST.saveTerminalEntryList, params);
  },
  async savePassingMedicalExamList(params) {
    return axios.post(API_LIST.savePassingMedicalExamList, params);
  },
  async saveTerminalPassingList(params) {
    return axios.post(API_LIST.saveTerminalPassingList, params);
  },

  async deletePassingItemList(params) {
    return axios.post(API_LIST.deletePassingItemList, params);
  },
  async deleteTerminalEntryList(params) {
    return axios.post(API_LIST.deleteTerminalEntryList, params);
  },
  async deletePassingMedicalExamList(params) {
    return axios.post(API_LIST.deletePassingMedicalExamList, params);
  },
  async deleteTerminalPassingList(params) {
    return axios.post(API_LIST.deleteTerminalPassingList, params);
  },
  
  // async saveAndUpdatePassingManageSettings(params) {
  //   return axios.post(API_LIST.saveAndUpdatePassingManageSettings, params);
  // },
  // async deletePassingManageSettings(params) {
  //   return axios.post(API_LIST.deletePassingManageSettings, params);
  // },
};

export default PassingManageSettingsService;
