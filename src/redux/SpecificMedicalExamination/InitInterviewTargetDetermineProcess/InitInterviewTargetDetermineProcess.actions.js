import InitInterviewTargetDetermineProcessService from "services/SpecificMedicalExamination/InitInterviewTargetDetermineProcess/InitInterviewTargetDetermineProcessService";
import { message } from "antd";

const InitInterviewTargetDetermineProcessAction = {
  executeButton(data) {
    return InitInterviewTargetDetermineProcessService.executeButton(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
  run_f12() {
    return InitInterviewTargetDetermineProcessService.run_f12()
      .then((res) => { 
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  }
};

export default InitInterviewTargetDetermineProcessAction;