import axios from "configs/axios";

const apiPaths = {
    getDataTable: '/api/counter/inspect-change-query-sub',
}

const InspectChangeQuerySubService = {
    async getDataTable(params) {
        return axios.get(apiPaths.getDataTable, {params})
    }
}

export default InspectChangeQuerySubService;