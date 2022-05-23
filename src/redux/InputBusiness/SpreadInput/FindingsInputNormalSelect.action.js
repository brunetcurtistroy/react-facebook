import { message } from "antd";
import FindingsInputNormalSelectService from "services/InputBusiness/SpreadInput/FindingsInputNormalSelectService";

const FindingsInputNormalSelectAction = {  
    GetScreenDataAction(data) {
      return FindingsInputNormalSelectService.GetScreenDataService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    ConfirmBtnAction(data) {
        return FindingsInputNormalSelectService.ConfirmBtnService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      SitFidingInputThisTimeAction(data) {
        return FindingsInputNormalSelectService.SitFidingInputThisTimeService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      SiteFindingsQueryPreviousAction(data) {
        return FindingsInputNormalSelectService.SiteFindingsQueryPreviousService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      SaveDataAction(data) {
        return FindingsInputNormalSelectService.SaveDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      DeleteDataAction(data) {
        return FindingsInputNormalSelectService.DeleteDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      LastTimeDoBtnAction(data) {
        return FindingsInputNormalSelectService.LastTimeDoBtnService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      ChangeCategoryJudgeAction(data) {
        return FindingsInputNormalSelectService.ChangeCategoryJudgeService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
  }
  
  export default FindingsInputNormalSelectAction;
