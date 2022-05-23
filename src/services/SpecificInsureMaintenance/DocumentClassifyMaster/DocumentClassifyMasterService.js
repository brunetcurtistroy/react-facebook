import axios from "configs/axios";

const apiPaths = {
    getDataClassifyMaster: "/api/document-classify-master/document-classify-master",
    getDataSentenceMaster: "/api/document-classify-master/document-classify-master/sentence-master",
    saveAndUpdateClassifyMaster: "/api/document-classify-master/document-classify-master/save-and-update",
    deleteItemClassifyMaster: "/api/document-classify-master/document-classify-master/delete",
    deleteItemSentenceMaster: "/api/document-classify-master/document-classify-master/delete-sentence-master",
};

const DocumentClassifyMasterService = {
  async getDataClassifyMaster() {
    return axios.get(apiPaths.getDataClassifyMaster);
  },

  async getDataSentenceMaster(params) {
    return axios.get(apiPaths.getDataSentenceMaster, {params});
  },

  async saveAndUpdateClassifyMaster(params) {
    return axios.post(apiPaths.saveAndUpdateClassifyMaster, params);
  },

  async deleteItemClassifyMaster(params) {
    return axios.delete(apiPaths.deleteItemClassifyMaster, {params});
  },

  async deleteItemSentenceMaster(params) {
    return axios.delete(apiPaths.deleteItemSentenceMaster, {params});
  },
};
  
export default DocumentClassifyMasterService;