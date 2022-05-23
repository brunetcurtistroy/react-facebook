import axios from "configs/axios";

const API_LIST = {
  index: "/api/inspect-item-convert-internal/inspect-cmt-convert-internal/",
  save: "/api/inspect-item-convert-internal/inspect-cmt-convert-internal/save",
  delete: "/api/inspect-item-convert-internal/inspect-cmt-convert-internal/delete",
};

const InspectCmtConvertInternalService = {
  async index() {
    return axios.get(API_LIST.index);
  },
  async save(params) {
    return axios.post(API_LIST.save, params);
  },
  async delete(params) {
    return axios.post(API_LIST.delete, params);
  }

};

export default InspectCmtConvertInternalService;
