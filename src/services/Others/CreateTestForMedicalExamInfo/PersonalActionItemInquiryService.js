import axios from 'configs/axios';

const API_LIST = {
    getTreeData: '/api/create-test-for-medical-exam-info/personal-action-item-inquiry',
    categoryWriting: '/api/create-test-for-medical-exam-info/personal-action-item-inquiry/category-writing',
    inspectCodeWriting: '/api/create-test-for-medical-exam-info/personal-action-item-inquiry/inspect-code-writing',
    existsCategoryCode: '/api/create-test-for-medical-exam-info/personal-action-item-inquiry/exists-confirm-category-code',
};

const PersonalActionItemInquiryService = {
  async GetTreeData() {
    return axios.get(API_LIST.getTreeData);
  },

  async CategoryWriting(params) {
    return axios.put(API_LIST.categoryWriting, {params});
  },

  async InspectCodeWriting(params) {
    return axios.get(API_LIST.inspectCodeWriting, {params});
  },

  async ExistsCategoryCode(params) {
    return axios.get(API_LIST.existsCategoryCode, {params});
  },
};

export default PersonalActionItemInquiryService;