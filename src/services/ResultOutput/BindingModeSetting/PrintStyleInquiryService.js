import axios from 'configs/axios';

const apiPaths = {
    GetListData: '/api/binding-mode-setting/print-style-inquiry/get-list-data',
    Configuration: '/api/binding-mode-setting/print-style-inquiry/configuration',
};

const PrintStyleInquiryService = {
    async GetListData(params) {
        return axios.get(apiPaths.GetListData, {params});
    },
    async Configuration(params) {
        return axios.get(apiPaths.Configuration, {params});
    },

};

export default PrintStyleInquiryService;
