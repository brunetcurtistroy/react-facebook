import axios from 'configs/axios';

const apiPaths = {
    getScreenData: '/api/caution-guide-matter-cmt-maintain/cmt-register-copy', 
    CopyComment: '/api/caution-guide-matter-cmt-maintain/cmt-register-copy/copy', 
    DeleteComment : '/api/caution-guide-matter-cmt-maintain/cmt-register-copy/delete', 
    RegisterComment : '/api/caution-guide-matter-cmt-maintain/cmt-register-copy/register', 
    UpdateComment: '/api/caution-guide-matter-cmt-maintain/cmt-register-copy/update',  
}; 
const CmtRegisterCopyService = {
    async getScreenData(params) {
        return axios.get(apiPaths.getScreenData, { params });
    },
    async CopyComment(data) {
        return axios.post(apiPaths.CopyComment, data );
    },
    async DeleteComment(data) {
        return axios.delete(apiPaths.DeleteComment, {data} );
    },
    async RegisterComment(data) {
        return axios.post(apiPaths.RegisterComment, data );
    },
    async UpdateComment(data) {
        return axios.put(apiPaths.UpdateComment, data );
    },
     
};

export default CmtRegisterCopyService;
