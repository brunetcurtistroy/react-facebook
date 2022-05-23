import axios from "configs/axios";

const apiPaths = {
    GetListData: "/api/group-bookings/previous-course-acquisition-sub",
    ContractInspectContentSelect: "/api/group-bookings/previous-course-acquisition-sub/contract-inspect-content-select",
    DbClick: " /api/group-bookings/previous-course-acquisition-sub/db-click",

};

const PreviousCourseAcquisitionSubService = {
    async GetListData(params) {
        return axios.get(apiPaths.GetListData, { params });
    },
    async ContractInspectContentSelect(params) {
        return axios.get(apiPaths.ContractInspectContentSelect, { params });
    },
    async DbClick(params) {
        return axios.post(apiPaths.DbClick,  params );
    },
};
  
export default PreviousCourseAcquisitionSubService;
