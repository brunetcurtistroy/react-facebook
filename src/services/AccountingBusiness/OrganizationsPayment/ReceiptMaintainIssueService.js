import axios from "configs/axios";

const APP_LIST = {
  screenData:
    "/api/organizations-payment/receipt-maintain-issue/get-screen-data",
  display:
    "/api/organizations-payment/receipt-maintain-issue/event-display-btn",
  individual:
    "/api/organizations-payment/receipt-maintain-issue/individual-designation",
  receiptHistory:
    "/api/organizations-payment/receipt-maintain-issue/receipt-history-display",
  specifiedOffice:
    "/api/organizations-payment/receipt-maintain-issue/specified-office",
  selectAll: "/api/organizations-payment/receipt-maintain-issue/sts-select-all",
  w1Target: "/api/organizations-payment/receipt-maintain-issue/w1-target",
  userAction1: "/api/organizations-payment/receipt-maintain-issue/user-action-1",
  edittingDivition: "/api/organizations-payment/receipt-maintain-issue/editing-division-change",
  edittingDivitionYes: "/api/organizations-payment/receipt-maintain-issue/editing-division-change-yes",
  f11Action1: "/api/organizations-payment/receipt-maintain-issue/delete-f11-1",
  f11Action2: "/api/organizations-payment/receipt-maintain-issue/delete-f11-2",
  Designated:"/api/organizations-payment/receipt-maintain-issue/designated-insurer"
};

const ReceiptMaintainIssueService = {
  async screenDataService() {
    return axios.get(APP_LIST.screenData);
  },
  async displayService(data) {
    return axios.post(APP_LIST.display, data);
  },
  async individualService(params) {
    return axios.get(APP_LIST.individual, {params});
  },
  async receiptHistoryService() {
    return axios.get(APP_LIST.receiptHistory);
  },
  async specifiedOfficeService(params) {
    return axios.get(APP_LIST.specifiedOffice, {params});
  },
  async selectAllService(data) {
    return axios.post(APP_LIST.selectAll, data);
  },
  async w1TargetService(data) {
    return axios.post(APP_LIST.w1Target, data);
  },
  async userAction1Service(data) {
    return axios.post(APP_LIST.userAction1, data);
  },
  async edittingDivitionService(data) {
    return axios.post(APP_LIST.edittingDivition, data);
  },
  async edittingDivitionYesService(data) {
    return axios.post(APP_LIST.edittingDivitionYes, data);
  },
  async f11Action1Service(data) {
    return axios.post(APP_LIST.f11Action1, data);
  },
  async f11Action2Service() {
    return axios.post(APP_LIST.f11Action2);
  },
  async DesignatedService(params) {
    return axios.get(APP_LIST.Designated, {params});
  },
};

export default ReceiptMaintainIssueService;
