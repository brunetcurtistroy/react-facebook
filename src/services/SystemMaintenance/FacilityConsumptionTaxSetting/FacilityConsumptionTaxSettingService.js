import axios from "configs/axios";

const apiPaths = {
    getTreeData: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting",

    getFacilityInfo: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/facility-info",
    getScreenDataFacilityInfo: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/facility-info/get-screen-data",
    updateFacilityInfo: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/facility-info/update",

    getDateList: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/date-list",
    addNewDateFacility: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/date-list/new-facility-info",
    updateDateFacility: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/date-list/modify-facility-info",
    deleteDateFacility: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/date-list/delete-facility-info",
    addNewDateConsumptionTax: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/date-list/new-consumption-tax",
    updateDateConsumptionTax: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/date-list/modify-consumption-tax",
    deleteDateConsumptionTax: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/date-list/delete-consumption-tax",

    getConsumptionTax: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/consumption-tax",
    updateConsumptionTax: "/api/facility-consumption-tax-setting/facility-consumption-tax-setting/consumption-tax/update",
};

const FacilityConsumptionTaxSettingService = {
  async getTreeData() {
    return axios.get(apiPaths.getTreeData);
  },

  async getFacilityInfo(params) {
    return axios.get(apiPaths.getFacilityInfo, {params});
  },

  async getScreenDataFacilityInfo() {
    return axios.get(apiPaths.getScreenDataFacilityInfo);
  },

  async updateFacilityInfo (params) {
    return axios.put(apiPaths.updateFacilityInfo, params);
  },

  async getDateList(params) {
    return axios.get(apiPaths.getDateList, {params});
  },
  
  async addNewDateFacility (params) {
    return axios.post(apiPaths.addNewDateFacility, params);
  },

  async updateDateFacility (params) {
    return axios.put(apiPaths.updateDateFacility, params);
  },

  async deleteDateFacility (params) {
    return axios.delete(apiPaths.deleteDateFacility, {params});
  },

  async addNewDateConsumptionTax (params) {
    return axios.post(apiPaths.addNewDateConsumptionTax, params);
  },

  async updateDateConsumptionTax (params) {
    return axios.put(apiPaths.updateDateConsumptionTax, params);
  },

  async deleteDateConsumptionTax (params) {
    return axios.delete(apiPaths.deleteDateConsumptionTax, {params});
  },

  async getConsumptionTax(params) {
    return axios.get(apiPaths.getConsumptionTax, {params});
  },

  async updateConsumptionTax (params) {
    return axios.put(apiPaths.updateConsumptionTax, params);
  },
};
  
export default FacilityConsumptionTaxSettingService;
