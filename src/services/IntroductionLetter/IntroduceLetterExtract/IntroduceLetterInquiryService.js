import axios from "configs/axios";

const API_LIST = {
    introduceLetterInquiry: "/api/introduce-letter-extract/introduce-letter-inquiry",


};

const IntroduceLetterInquiryService = {
    async introduceLetterInquiry(params) {
        return axios.get(API_LIST.introduceLetterInquiry, { params });
    },



};

export default IntroduceLetterInquiryService;