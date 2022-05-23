import { message } from "antd";
import RadiographyFindingInputSubService from "services/InputBusiness/RadiographyFindingInput/RadiographyFindingInputSubService";

const RadiographyFindingInputSubAction = {  
    getScreenDataRadiographyFindingInputSubAction(data) {
      return RadiographyFindingInputSubService.screenDataRadiographyFindingInputSubService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    getListDataFindingsContentAction(data) {
        return RadiographyFindingInputSubService.listDataFindingsContentService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      getListDataPreviousFindingsContentAction(data) {
        return RadiographyFindingInputSubService.listDataPreviousFindingsContentService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      postLastTimeDoBtnAction(data) {
        return RadiographyFindingInputSubService.lastTimeDoBtnService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
          });
      },
      postLastTimeDoBtnYesAction(data) {
        return RadiographyFindingInputSubService.lastTimeDoBtnYesService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      postSettingBtnAction(data) {
        return RadiographyFindingInputSubService.settingBtnService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      getChangeSiteAndFindingsCodeAction(data) {
        return RadiographyFindingInputSubService.changeSiteAndFindingsCodeService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      saveFindingsContentAction(data) {
        return RadiographyFindingInputSubService.saveFindingsContentService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
          });
      },
      deleteFindingsContentAction(data) {
        return RadiographyFindingInputSubService.deleteFindingsContentService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      f12Action(data) {
        return RadiographyFindingInputSubService.f12Service(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
  }
  
  export default RadiographyFindingInputSubAction;