import axios from "configs/axios";

const API_LIST = {
  index: "/api/inspect-item-convert-internal/inspect-name-convert-in-maintain-ta/",
  save: "/api/inspect-item-convert-internal/inspect-name-convert-in-maintain-ta/save",
  delete: "/api/inspect-item-convert-internal/inspect-name-convert-in-maintain-ta/delete",
};

const InspectNameConvertInMaintainTaService = {
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

export default InspectNameConvertInMaintainTaService;
