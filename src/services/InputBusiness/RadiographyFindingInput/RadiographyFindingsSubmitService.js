import axios from "configs/axios";

const apiPaths = {
    Retrieval : "/api/radiography-findings-submit/radiography-findings-submit/retrieval", //Get
    GetScreenData: "/api/radiography-findings-submit/set-info-search-multiple-choice/get-screen-data", //Get
    GetSubDisplayTableOpt: "/api/radiography-findings-submit/set-info-search-multiple-choice/sub-display-table-opt",
    Check: "/api/radiography-findings-submit/same-surname-same-name-same-birth-date-select-screen/same-sur-name-same-name-same-date-bir-fc",
    WS1878009_RadiographyInspectSelect: "/api/radiography-findings-submit/radiography-inspect-select",
    WS1881003_RadiographyContentsOfQuery: '/api/radiography-findings-submit/radiography-contents-of-query'
};

const RadiographyFindingsSubmitService = {
  async getRetrival(params) {
    return axios.post(apiPaths.Retrieval, params);
  },
  async getRadiographyInspectSelect(params) {
    return axios.get(apiPaths.WS1878009_RadiographyInspectSelect, {params});
  },
  async getRadiographyContentsOfQuery(params) {
    return axios.get(apiPaths.WS1881003_RadiographyContentsOfQuery, {params});
  },
};

  
export default RadiographyFindingsSubmitService;
