import axios from "configs/axios";

const apiPaths = {
    getScreenData: "/api/specific-date-people-num-setting/specific-date-people-num-setting/get-screen-data",

    getDateList: "/api/specific-date-people-num-setting/specific-date-people-num-setting/date-list",
    deleteDateList: '/api/specific-date-people-num-setting/specific-date-people-num-setting/date-list/delete',

    getNumPeopleSet: "/api/specific-date-people-num-setting/specific-date-people-num-setting/num-people-set",
    updateNumPeopleSet: "/api/specific-date-people-num-setting/specific-date-people-num-setting/num-people-set/update",

    eventF4: "/api/specific-date-people-num-setting/specific-date-people-num-setting/non-consult-date-f4",
};

const SpecificDatePeopleNumSettingService = {
  async getScreenData() {
    return axios.get(apiPaths.getScreenData);
  },

  async getDateList(params) {
    return axios.get(apiPaths.getDateList, {params});
  },

  async deleteDateList (params) {
    return axios.delete(apiPaths.deleteDateList, {params});
  },

  async getNumPeopleSet(params) {
    return axios.get(apiPaths.getNumPeopleSet, {params});
  },

  async updateNumPeopleSet (params) {
    return axios.put(apiPaths.updateNumPeopleSet, params);
  },

  async eventF4 (params) {
    return axios.post(apiPaths.eventF4, params);
  }
};
  
export default SpecificDatePeopleNumSettingService;
