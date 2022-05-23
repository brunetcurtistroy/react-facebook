import axios from "configs/axios";

const API_LIST = {
  GetListData: "/api/e-medical-records-single-transmission/another-day-inspect-set",
  Change: "/api/e-medical-records-single-transmission/another-day-inspect-set/change",
  SettingBtn: "/api/e-medical-records-single-transmission/another-day-inspect-set/setting-btn",
  InspectContent: "/api/e-medical-records-single-transmission/another-day-inspect-set/inspect-content",
  ChangeData: "/api/e-medical-records-single-transmission/another-day-inspect-set/inspect-content/change-w1-enabled-disabled"
};
const AnotherDayInspectSetService = {
  async GetListData(params) {
    return axios.get(API_LIST.GetListData, {params});
  },
  async Change(params) {
    return axios.post(API_LIST.Change, {
      W1_character_key: params?.W1_character_key,
      W1_enabled_disabled: params?.W1_enabled_disabled,
    });
  },
  async SettingBtn(params) {
    return axios.post(API_LIST.SettingBtn, { 
      ExamDateChar: params?.ExamDateChar,
      ReserveNum:  params?.ReserveNum,
      W1_course_level: params.W1_course_level });
  },
  async InspectContent(params) {
    return axios.get(API_LIST.InspectContent, { params });
  },
  async ChangeData(params) {
    return axios.post(API_LIST.ChangeData, { 
      id: params?.id,
      W1_enabled_disabled: params?.W1_enabled_disabled });
  },

};

export default AnotherDayInspectSetService;