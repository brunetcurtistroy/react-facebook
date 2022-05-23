import axios from "configs/axios";

const API_LIST = {
  getSentenceMaster: "/api/sentence-master/sentence-master",
  getSentenceMasterSub:
    "/api/sentence-master/sentence-master/sentence-master-sub",
  saveAndUpdate: "/api/sentence-master/sentence-master/save-and-update",
  deleteSentenceMasterSub:
    "/api/sentence-master/sentence-master/delete-sentence-master-sub",
};

const SentenceMasterService = {
  async getSentenceMasterService() {
    return axios.get(API_LIST.getSentenceMaster);
  },
  async getSentenceMasterSubService(params) {
    return axios.get(API_LIST.getSentenceMasterSub, { params });
  },
  async saveAndUpdateService(params) {
    return axios.post(API_LIST.saveAndUpdate, params);
  },
  async deleteSentenceMasterSubService(params) {
    return axios.delete(API_LIST.deleteSentenceMasterSub, { params });
  },
};

export default SentenceMasterService;
