import axios from 'configs/axios';

const API_LIST = { 
    GetListData: '/api/consult-info-reconstruction/condition-add-sub/select-course-list',
    ConfirmBtn:'/api/consult-info-reconstruction/condition-add-sub/select-course-list/confirm-btn'
};

const SelectCourseListService = { 
  async GetListData(params) {
    return axios.get(API_LIST.GetListData, {params});
  },
  async ConfirmBtn(params) {
    return axios.post(API_LIST.ConfirmBtn, params);
  },
};

export default SelectCourseListService;