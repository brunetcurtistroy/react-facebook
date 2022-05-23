import axios from 'configs/axios';

const apiPaths = {
    getCommentLists: '/api/caution-guide-matter-cmt-maintain/caution-guide-matter-cmt-maintain', 
};


const CautionGuideMatterCmtMaintainService = {
    async getCommentLists(params) {
        return axios.get(apiPaths.getCommentLists, { params });
    },
     
};

export default CautionGuideMatterCmtMaintainService;
