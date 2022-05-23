import axios from "configs/axios";

const apiPaths = {
    // inspectAddDelete : "/api/set-info-maintain/inspect-add-delete",
    inspectAddDelete : "/api/set-info-maintain/inspect-add-delete/save-or-delete",
};

const InspectAddDeleteService = {
  async InspectAddDelete (params) {
    return axios.post(apiPaths.inspectAddDelete, params);
  }
};
  
export default InspectAddDeleteService;
