import axios from "configs/axios";

const APP_LIST = {
    register:"/api/xml-param-maintain/copying-process/register"
}; 
const CopyingProcessService = {
  async Gegister(data){
    return axios.post(APP_LIST.register , data);
  } 
};

export default CopyingProcessService;
