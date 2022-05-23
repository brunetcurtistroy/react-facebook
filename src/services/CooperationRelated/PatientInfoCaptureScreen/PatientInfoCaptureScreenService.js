import axios from 'configs/axios';

const apiPaths = {
    getScreenDataPatientInfoCaptureScreen: '/api/patient-info-capture-screen/patient-info-capture-screen/get-screen-data',
    captureF12PatientInfoCaptureScreen: '/api/patient-info-capture-screen/patient-info-capture-screen/capture-f12'
};

const PatientInfoCaptureScreenService = {
    async getScreenDataPatientInfoCaptureScreenService() {
        return axios.get(apiPaths.getScreenDataPatientInfoCaptureScreen);
    },
    async captureF12PatientInfoCaptureScreenService(params) {
        return axios.post(apiPaths.captureF12PatientInfoCaptureScreen, params);
    },
};

export default PatientInfoCaptureScreenService;