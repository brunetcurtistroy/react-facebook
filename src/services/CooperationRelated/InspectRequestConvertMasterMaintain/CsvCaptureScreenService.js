import axios from 'configs/axios';

const apiPaths = {
    captureF12CsvCaptureScreen: '/api/inspect-request-convert-master-maintain/csv-capture-screen/capture-f12',
};

const CsvCaptureScreenService = {
    async captureF12CsvCaptureScreenService(params) {
        return axios.post(apiPaths.captureF12CsvCaptureScreen, params);
    },
};

export default CsvCaptureScreenService;