import axios from "configs/axios";

const API_LIST = {
  category: '/api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/category',
  closeScreen: '/api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/close-screen',
  f11: '/api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/f11',
  getScreenData: '/api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/get-screen-data',
  inspect: '/api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/inspect',
  subdisplaytable: '/api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/subdisplaytable',
  selectAll: '/api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/sub-display-table/select-all',
  selectOne: 'api/introduce-letter-master-maintain/inspect-item-search-query-multiple-choice/sub-display-table/select-one',

};

const InspectItemSearchQueryMultipleChoiceService = {
  async category(params) {
    return axios.get(API_LIST.category, {params})
  },
  async closeScreen(params) {
    return axios.get(API_LIST.closeScreen, {params})
  },
  async selectAll(params) {
    return axios.post(API_LIST.selectAll, params)
  },
  async selectOne(params) {
    return axios.post(API_LIST.selectOne, params)
  },
  async f11(params) {
    return axios.get(API_LIST.f11, { params})
  },
  async getScreenData(params) {
    return axios.get(API_LIST.getScreenData, { params})
  },
  async inspect(params) {
    return axios.get(API_LIST.inspect, { params})
  },
  async subdisplaytable(params) {
    return axios.get(API_LIST.subdisplaytable, { params})
  }



};

export default InspectItemSearchQueryMultipleChoiceService