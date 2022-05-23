import axios from "configs/axios";

const API_LIST = {
  InspectItemConverseSub: "/api/inspect-item-convert-internal/inspect-item-convert-internal",
  InspectValueConverse: "/api/inspect-item-convert-internal/inspect-item-convert-internal/inspect-value-converse",
  QuantityQuality: "/api/inspect-item-convert-internal/inspect-item-convert-internal/quantity-quality",
  deleteRecord: "/api/inspect-item-convert-internal/inspect-item-convert-internal/f3",
};

const InspectItemConvertInternalService = {
  async getInspectItemConverseSubService(params) {
    return axios.get(API_LIST.InspectItemConverseSub, { params });
  },

  async getInspectValueConverseService(params) {
    return axios.get(API_LIST.InspectValueConverse, { params });
  },

  async getQuantityQualityService(params) {
    return axios.get(API_LIST.QuantityQuality, { params });
  },

  async deleteRecord(params) {
    return axios.post(API_LIST.deleteRecord, params);
  },
};

export default InspectItemConvertInternalService;
