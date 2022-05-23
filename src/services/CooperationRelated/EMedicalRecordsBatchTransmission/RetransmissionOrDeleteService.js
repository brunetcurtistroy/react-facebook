import axios from "configs/axios";

const apiPaths = {
  btnTranmiss: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/retransmission-or-delete",
  transmissInspectResend: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/retransmission-or-delete/inspect/resend",
  transmissInspectDelete: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/retransmission-or-delete/inspect/delete",
  transmissImageResend: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/retransmission-or-delete/image/resend",
  transmissImageDelete: "/api/e-medical-records-batch-transmission/e-medical-records-transmission-history/retransmission-or-delete/image/delete",
};

const RetransmissionOrDeleteService = {
  async btnTranmiss(params) {
    return axios.put(apiPaths.btnTranmiss, params);
  },

  async transmissInspectResend(params) {
    return axios.post(apiPaths.transmissInspectResend, params);
  },

  async transmissInspectDelete(params) {
    return axios.delete(apiPaths.transmissInspectDelete, {params});
  },

  async transmissImageResend(params) {
    return axios.post(apiPaths.transmissImageResend, params);
  },

  async transmissImageDelete(params) {
    return axios.delete(apiPaths.transmissImageDelete, {params});
  }
};

export default RetransmissionOrDeleteService;