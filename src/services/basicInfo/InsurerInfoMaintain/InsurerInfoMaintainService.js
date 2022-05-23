import axios from "configs/axios";
import ApiPaths from "../../../constants/ApiPaths";

const api_get_detail_insurer = "/api/insurers/";
const apiPaths = {
  get_publishs: '/api/addresses/postal-codes/public',
  get_cities: '/api/addresses/postal-codes/public/city',
  get_areas: '/api/addresses/postal-codes/public/city/area',
  insurer_info_search_query: '/api/insurer-info-maintain/insurer-info-search-query',
  getPublicScreen: '/api/insurer-info-maintain/postal-code-search-engine/get-screen-data',
  getNameZipCode: '/api/insurer-info-maintain/insurer-info-maintain/get-name-zip-code',
}

const InsurerInfoMaintainService = {
  async getSituations() {
    console.log(ApiPaths.SITUATIONS.LIST);
    return axios.get(ApiPaths.SITUATIONS.LIST);
  },
  async getIndustries() {
    return axios.get(ApiPaths.INDUSTRIES.LIST);
  },
  async getDistricts() {
    return axios.get(ApiPaths.DISTRICTS.LIST);
  },
  async getDetailInsurerService(insurerId) {
    return axios.get(api_get_detail_insurer + insurerId);
  },
  async getPublicScreen() {
    return axios.get(apiPaths.getPublicScreen);
  },
  async getPublics() {
    return axios.get(apiPaths.get_publishs);
  },
  async getCities(params) {
    return axios.get(apiPaths.get_cities, { params });
  },
  async getAreas(params) {
    return axios.get(apiPaths.get_areas, { params });
  },
  async getInsurerInfos(params) {
    return axios.get(apiPaths.insurer_info_search_query, { params });
  },
  async getNameZipCodeService(params) {
    return axios.get(apiPaths.getNameZipCode, { params });
  },
};

export default InsurerInfoMaintainService;
