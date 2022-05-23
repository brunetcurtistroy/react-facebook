import { message } from "antd";
import MedicalInstitutionsMasterService from "services/IntroductionLetter/IntroduceLetterMasterMaintain/MedicalInstitutionsMaster"
const MedicalInstitutionsMasterAction = {
  GetListData(data) {
    return MedicalInstitutionsMasterService.GetListData(data)
      .then(res => {
        if (res) {
          return res.data
        }
      }).catch(err => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },
  deleteData(data) {
    return MedicalInstitutionsMasterService.deleteData(data)
  },
  saveData(data) {
    return MedicalInstitutionsMasterService.saveData(data)
  },

}

export default MedicalInstitutionsMasterAction;
