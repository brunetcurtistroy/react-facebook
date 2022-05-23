import axios from 'configs/axios';

const apiPaths = {
    copyScreen: '/api/determine-level-modify/determine-level-modify-master-coercive/copy-screen', 
}; 
const CopyScreenService = { 
    async copyScreen(data) {
        return axios.post(apiPaths.copyScreen, data);
    }, 
}; 
export default CopyScreenService;