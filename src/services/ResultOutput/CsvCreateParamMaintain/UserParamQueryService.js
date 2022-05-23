import axios from "configs/axios";

const APP_LIST = {
    getListData: "/api/csv-create-param-maintain/user-param-query",
};

const UserParamQueryService = {
    async getListData(params) {
        return axios.get(APP_LIST.getListData, { params });
    }
};

export default UserParamQueryService;
