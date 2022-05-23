import axios from "configs/axios";

const apiPaths = {
  getScreenData: "/api/radiography-finding-input/leadership-matter-search-sub/get-screen-data",
  getListGuideItemInfoTableDisplay: "/api/radiography-finding-input/leadership-matter-search-sub/guide-item-info-table-display",
  selectDataDisplay: "/api/radiography-finding-input/leadership-matter-search-sub/select-display",
  getListGuideItemInfoTableDisplayCategory: "/api/radiography-finding-input/leadership-matter-search-sub/guide-item-info-table-display-category",
};

const LeadershipMatterSearchSubService = {
  async getScreenDataService(params) {
    return axios.get(apiPaths.getScreenData, {params});
  },
  async getListGuideItemInfoTableDisplayService(params) {
    return axios.get(apiPaths.getListGuideItemInfoTableDisplay, {params});
  },
  async selectDataDisplayService(params) {
    return axios.post(apiPaths.selectDataDisplay, params);
  },
  async getListGuideItemInfoTableDisplayCategoryService(params) {
    return axios.get(apiPaths.getListGuideItemInfoTableDisplayCategory, {params});
  }
};
  
export default LeadershipMatterSearchSubService;