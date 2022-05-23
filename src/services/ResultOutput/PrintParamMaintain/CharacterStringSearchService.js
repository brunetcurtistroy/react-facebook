import axios from "configs/axios";

const APP_LIST = {
  searchRunEnter:"/api/print-param-maintain/character-string-search/search-run-enter",
  RunSearch:"/api/print-param-maintain/character-string-search/search-run-enter",
};
const CharacterStringSearchService = {
    async searchRunEnter(data) {
      return axios.get(APP_LIST.searchRunEnter ,data);
    },
    async RunSearch(params) {
      return axios.post(APP_LIST.RunSearch, params);
    },
  };
  
  export default CharacterStringSearchService;