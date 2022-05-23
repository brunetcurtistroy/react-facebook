import axios from 'configs/axios';

const API_LIST = { 
    GetListData: '/api/consult-info-reconstruction/condition-add-sub/accepetance-number-select',
};

const AcceptanceNumberSelectService = { 
  async GetListData(params) {
    return axios.get(API_LIST.GetListData, {params});
  },
};

export default AcceptanceNumberSelectService;