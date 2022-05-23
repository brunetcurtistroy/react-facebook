import axios from 'configs/axios';

const API_LIST = {
    DisplayList: '/api/determine-level-modify/determine-level-modify-master-coercive/get-screen-data-display-list',
    ListUpdate:   '/api/determine-level-modify/determine-level-modify-master-coercive/save-data-display-list',
    delete: '/api/determine-level-modify/determine-level-modify-master-coercive/delete-data-display-list',
    getScreenData:'/api/determine-level-modify/determine-level-modify-master-coercive/get-screen-data',
    getColor:'/api/determine-level-modify/determine-level-modify-master-coercive/color-sample/get-screen-data'
};

const DetermineLevelModifyMasterCoerciveService = {
  async getScreenData() {
    return axios.get(API_LIST.getScreenData);
  }, 
  async DisplayList(params) {
    return axios.get(API_LIST.DisplayList, {params} );
  }, 
  async ListUpdate(params) {
    return axios.put(API_LIST.ListUpdate,  params );
  }, 
  async Delete(params) {
    return axios.delete(API_LIST.delete, {params} );
  }, 
  async GetColor(){
    return axios.get(API_LIST.getColor);
  }
};

export default DetermineLevelModifyMasterCoerciveService;
