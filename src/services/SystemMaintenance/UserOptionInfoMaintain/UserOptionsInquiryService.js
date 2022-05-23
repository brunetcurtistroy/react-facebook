import axios from 'configs/axios';

const apiPaths = {
    getScreenDataUserOptionsInquiry: '/api/user-option-info-maintain/user-options-inquiry/get-data',
};

const UserOptionsInquiryService = {
    async getScreenDataUserOptionsInquiryService(params) {
        return axios.get(apiPaths.getScreenDataUserOptionsInquiry, {params});
    },
};

export default UserOptionsInquiryService;