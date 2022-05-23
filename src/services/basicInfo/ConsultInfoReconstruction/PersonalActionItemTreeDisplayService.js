import axios from 'configs/axios';

const API_LIST = { 
    GetListData: '/api/consult-info-reconstruction/personal-action-item-tree-display',
    NodeMovement:'/api/consult-info-reconstruction/personal-action-item-tree-display/node-movement'
};

const PersonalActionItemTreeDisplayService = { 
  async GetListData(params) {
    return axios.get(API_LIST.GetListData, {params});
  },
  async NodeMovement(params) {
    return axios.get(API_LIST.NodeMovement, {params});
  },
};

export default PersonalActionItemTreeDisplayService;