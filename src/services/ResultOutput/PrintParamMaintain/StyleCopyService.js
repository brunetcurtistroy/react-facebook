import axios from "configs/axios";
const APP_LIST = {
    copyExec:"/api/print-param-maintain/style-copy/copy-exec",
};
const StyleCopyService = {
    async CopyExec(params) {
      return axios.post(APP_LIST.copyExec, params );
    },
  };
  
  export default StyleCopyService;