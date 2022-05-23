import axios from 'configs/axios';

const API_LIST = {
  getMainInit: '/api/document-manage-maintain/document-manage-maintain',
  getDetailSub: '/api/document-manage-maintain/document-manage-maintain/detail-sub',
  delete: '/api/document-manage-maintain/document-manage-maintain/delete',
  saveAndUpdate: '/api/document-manage-maintain/document-manage-maintain/save-and-update',
  deleteDetailSub: '/api/document-manage-maintain/document-manage-maintain/delete-other-options'
};

const DocumentManageMaintainService = {
  async getMainInit(params) {
    return axios.get(API_LIST.getMainInit, { params });
  },
  async getDetailSub(params) {
    return axios.get(API_LIST.getDetailSub, { params });
  },
  async delete(params) {
    return axios.delete(API_LIST.delete, { params });
  },
  async saveAndUpdate(data) {
    return axios.post(API_LIST.saveAndUpdate, data);
  },
  async deleteDetailSub(params) {
    return axios.delete(API_LIST.deleteDetailSub, { params });
  },
};

export default DocumentManageMaintainService;
