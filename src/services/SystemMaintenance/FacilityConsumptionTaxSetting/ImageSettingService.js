import axios from "configs/axios";

const apiPaths = {
    uploadImage: "/api/facility-consumption-tax-setting/image-setting/upload"
};

const ImageSettingService = {
  async uploadImage(params) {
    return axios.post(apiPaths.uploadImage, params);
  }
};
  
export default ImageSettingService;
