import axios from "configs/axios";

const API_LIST = {
  GetScreenData: "/api/reserve-status-search/hourly-reserve-list/get-screen-data",
  TimeZoneList: "/api/reserve-status-search/hourly-reserve-list/time-zone-list",
  ExamineeList: "/api/reserve-status-search/hourly-reserve-list/examinee-list",
  user_action3: "/api/reserve-status-search/hourly-reserve-list/user-action-3",

};

const HourlyReserveListService = {
  async GetScreenData(params) { 
    return axios.get(API_LIST.GetScreenData, {params});
  },

  async TimeZoneList(params) {
    return axios.get(API_LIST.TimeZoneList, {params});
  },

  async ExamineeList(params) {
    return axios.get(API_LIST.ExamineeList, {params});
  },

  async user_action3(params) {
    return axios.post(API_LIST.user_action3, params);
  },
};

export default HourlyReserveListService;
