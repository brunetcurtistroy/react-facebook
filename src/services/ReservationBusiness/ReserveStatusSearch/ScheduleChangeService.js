import axios from "configs/axios";

const API_LIST = {
  GlobalEvents: "/api/reserve-status-search/schedule-change/global-event",
  DeleteLine: "/api/reserve-status-search/schedule-change/delete-line",
};

const ScheduleChangeService = {
  async getGlobalEventsService(params) {
    console.log(params);
    return axios.get(API_LIST.GlobalEvents, { params });
  },
  async deleteLineService(params) {
    console.log(params);
    return axios.delete(API_LIST.DeleteLine, { params });
  },
};

export default ScheduleChangeService;
