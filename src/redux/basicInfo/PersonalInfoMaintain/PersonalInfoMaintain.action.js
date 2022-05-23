import PersonalInfoMaintainService from 'services/basicInfo/PersonalInfoMaintain/PersonalInfoMaintainService';
import { message } from "antd";

export const getDataGenerationAction = (personal_number_id) => {
  return PersonalInfoMaintainService.getDataGenerationService(personal_number_id)
    .then((res) => {
      //console.log(res.data);
      return res.data
    })
    .catch((err) => {
      return {}
    })
}

export const getInitialDisplayCreatePersonalAction = () => {
  return PersonalInfoMaintainService.getInitialDisplayCreatePersonalService()
    .then((res) => {
      //console.log(res.data)
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const registerPersonalAction = (personal) => {
  return PersonalInfoMaintainService.registerPersonalService(personal)
    .then((res) => {
      message.success("完了！");
      //console.log(res.data)
      return res.data
    })
    .catch((err) => {
      message.error(err.response.data.message);
      console.log(err.response.data.message);
    })
}

export const updatePersonalAction = (personal) => {
  return PersonalInfoMaintainService.updatePersonalService(personal)
    .then((res) => {
      message.success(res.data.message + '!');
      //console.log(res.data.message)
      return res.data
    })
    .catch((err) => {
      message.error(err.response.data.message);
      console.log(err.response.data.message);
    })
}

export const getPersonalInfoSearchAction = (data) => {
  return PersonalInfoMaintainService.getPersonalInfoSearchService(data)
    .then((res) => {
      // console.log(res.data)
      return res.data;
    })
    .catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
};

export const getPersonalInfoSearchOfficeAction = (data) => {
  return PersonalInfoMaintainService.getPersonalInfoSearchOfficeService(data)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
};

export const deleteAffiliationAction = (id) => {
  return PersonalInfoMaintainService.deleteAffiliationService(id)
}

export const getVariousNamesListAction = () => {
  return PersonalInfoMaintainService.getVariousNamesListService()
    .then((res) => {
      //console.log(res);
      return res.data
    })
    .catch((err) => {
      console.log(err)
    })
}

export const setAddressToDefaultAction = (params) => {
  return PersonalInfoMaintainService.setAddressToDefaultService(params)
}

export const specialDeletePersonalInfoMaintainAction = (params) => {
  return PersonalInfoMaintainService.specialDeletePersonalInfoMaintainService(params)
}

export const getDataScreenPersonalInfoMainAction = () => {
  return PersonalInfoMaintainService.getDataScreenPersonalInfoMainService()
}

export const eventF11PersonalInfoMain = (params) => {
  return PersonalInfoMaintainService.eventF11PersonalInfoMain(params)
}

export const eventF11DeleteDataPersonalInfoMain = (params) => {
  return PersonalInfoMaintainService.eventF11DeleteDataPersonalInfoMain(params)
}

export const getNameZipCodeAction = (params) => {
  return PersonalInfoMaintainService.getNameZipCodeService(params)
}