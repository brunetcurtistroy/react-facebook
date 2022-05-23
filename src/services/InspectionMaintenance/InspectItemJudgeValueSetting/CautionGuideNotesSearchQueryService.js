import axios from 'configs/axios'; 
const API_LIST = { 
    getScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/caution-guide-notes-search-query', 
    getDataDetail : '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/caution-guide-notes-search-query/table-list',  
}

const CautionGuideNotesSearchQueryService = {
  async GetScreenData(){
    return axios.get(API_LIST.getScreenData);
  },
  async GetDataDetail(params) {
    return axios.get(API_LIST.getDataDetail, {params} );
  },  
};

export default CautionGuideNotesSearchQueryService;