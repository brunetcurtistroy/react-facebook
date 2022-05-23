import axios from "configs/axios";

const APP_LIST = {
  executeButton:"/api/init-interview-target-determine-process/init-interview-target-determine-process", 
  run_f12:"/api/init-interview-target-determine-process/list-process/run-f12"
};

const InitInterviewTargetDetermineProcessService = {
  async executeButton(params){ 
    return axios.get(APP_LIST.executeButton , {params});
  } ,
  async run_f12(){ 
    return axios.post(APP_LIST.run_f12 );
  } 
};

export default InitInterviewTargetDetermineProcessService;
