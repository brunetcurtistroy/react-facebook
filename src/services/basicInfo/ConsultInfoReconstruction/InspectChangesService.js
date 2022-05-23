import axios from 'configs/axios';

const API_LIST = { 
    GetListData: '/api/consult-info-reconstruction/inspect-changes/',
    InspectQuery_F12:'/api/consult-info-reconstruction/inspect-changes/f12'
};

const InspectChangesService = { 
  async GetListData(params) {
    return axios.get(API_LIST.GetListData, {params});
  },
  async InspectQuery_F12(params) {
    return axios.get(API_LIST.InspectQuery_F12, {params});
  },
};

export default InspectChangesService;