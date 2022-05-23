import axios from 'configs/axios'; 
const API_LIST = {
    getScreenData: '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/get-screen-data',
    UpdateData : '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/exam-list/update', 
    ExamList : '/api/inspect-item-judge-value-setting/inspect-item-judge-value-setting/exam-list', 
}

const InspectItemJudgeValueSettingService = {
  async GetScreenData() {
    return axios.get(API_LIST.getScreenData);
  },
  async UpdateData(params) {
    return axios.put(API_LIST.UpdateData, params );
  }, 
  async ExamList(params) {
    return axios.get(API_LIST.ExamList, {params} );
  },
};

export default InspectItemJudgeValueSettingService;
