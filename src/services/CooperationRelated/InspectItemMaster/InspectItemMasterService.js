import axios from "configs/axios";

const apiPaths = {
  screenData: "/api/inspect-request-main/inspect-request-main/get-screen-data",
  targetList: "/api/inspect-request-main/inspect-request-main/target-list",
  displayBtn: "/api/inspect-request-main/inspect-request-main/display-btn",
  print_F11: "/api/inspect-request-main/inspect-request-main/f11",
  run_F12_Before:
    "/api/inspect-request-main/inspect-request-main/run-f12-before",
  run_F12_After: "/api/inspect-request-main/inspect-request-main/run-f12-after",
  selectAll: "/api/inspect-request-main/inspect-request-main/select-all",
  selectOne: "/api/inspect-request-main/inspect-request-main/select-one",
  selectOne_W1_urgent_specimen_flg:
    "/api/inspect-request-main/inspect-request-main/select-one-w1-urgent-specimen-flg",
};

const InspectItemMasterService = {
  async getTargetList() {
    return axios.get(apiPaths.targetList);
  },
  async getScreenData() {
    return axios.get(apiPaths.screenData);
  },
  async displayBtn(params) {
    return axios.get(apiPaths.displayBtn, { params });
  },
  async print_F11(params) {
    return axios.get(apiPaths.print_F11, { params });
  },
  async run_F12_Before(params) {
    return axios.get(apiPaths.run_F12_Before, { params });
  },
  async run_F12_After(params) {
    return axios.get(apiPaths.run_F12_After, { params });
  },
  async selectAll(params) {
    return axios.get(apiPaths.selectAll, { params });
  },
  async selectOne(params) {
    return axios.get(apiPaths.selectOne, { params });
  },
  async SelectOne_W1_urgent_specimen_flg(params) {
    return axios.get(apiPaths.selectOne_W1_urgent_specimen_flg, { params });
  },
};

export default InspectItemMasterService;
