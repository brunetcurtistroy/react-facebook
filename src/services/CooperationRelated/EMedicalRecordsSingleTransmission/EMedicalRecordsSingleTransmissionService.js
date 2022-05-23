import axios from "configs/axios";

const API_LIST = {
    GetScreenData :  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/get-screen-data", 
    GetDataIndex :  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/", 
    Cancel:  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/cancel", 
    GetListData:  "/api/e-medical-records-single-transmission/consult-select", 
    CancelBtn:  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/cancel", 
    F3:  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/f3", 
    Group:  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/group", 
    InspectContent:  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/inspect-content", 
    RetransmissBtn:  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/retransmiss", 
    Submit:  "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/submit", 
    anotherDate : "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/another-date",
    ChangePersonalNum : "/api/e-medical-records-single-transmission/e-medical-records-single-transmission/change-personal-num"
};

const EMedicalRecordsSingleTransmissionService = {
  async GetScreenData(params) { 
    return axios.get(API_LIST.GetScreenData, { params });
  },
  async GetDataIndex(params) { 
    return axios.get(API_LIST.GetDataIndex, { params });
  }, 
  async Cancel(params) { 
    return axios.get(API_LIST.Cancel, { params });
  },
  async GetListData(params) { 
    return axios.get(API_LIST.GetListData, { params });
  },
  async CancelBtn(params) { 
    return axios.get(API_LIST.CancelBtn, { params });
  },
  async F3(params) { 
    return axios.delete(API_LIST.F3, { params });
  },
  async Group(params) { 
    return axios.get(API_LIST.Group,{ params });
  },
  async InspectContent(params) { 
    return axios.get(API_LIST.InspectContent, { params });
  },
  async RetransmissBtn(params) { 
    return axios.get(API_LIST.RetransmissBtn, { params });
  },
  async Submit(params) { 
    return axios.get(API_LIST.Submit, { params });
  },
  async AnotherDate(params) { 
    return axios.get(API_LIST.anotherDate, { params });
  },
  async ChangePersonalNum(params) { 
    return axios.get(API_LIST.ChangePersonalNum, { params });
  },
}; 
export default EMedicalRecordsSingleTransmissionService;