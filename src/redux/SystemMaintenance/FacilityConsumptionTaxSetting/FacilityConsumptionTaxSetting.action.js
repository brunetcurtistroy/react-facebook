import { message } from "antd";
import FacilityConsumptionTaxSettingService from "services/SystemMaintenance/FacilityConsumptionTaxSetting/FacilityConsumptionTaxSettingService";

const FacilityConsumptionTaxSettingAction = {
  GetTreeData() {
    return FacilityConsumptionTaxSettingService.getTreeData()
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  GetFacilityInfo(data) {
    return FacilityConsumptionTaxSettingService.getFacilityInfo(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  GetScreenDataFacilityInfo() {
    return FacilityConsumptionTaxSettingService.getScreenDataFacilityInfo() 
    .then((res) => {
      return res?.data;
    })
    .catch((err) => {
      const res = err.response;
      if (!res || !res.data || !res.data.message) {
        message.error("エラーが発生しました");
        return;
      }
      message.error(res.data.message);
    });
  },

  UpdateFacilityInfo(data) {
    return FacilityConsumptionTaxSettingService.updateFacilityInfo(data) 
  },

  GetDateList(data) {
    return FacilityConsumptionTaxSettingService.getDateList(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  AddNewDateFacility(data) {
    return FacilityConsumptionTaxSettingService.addNewDateFacility(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  UpdateDateFacility(data) {
    return FacilityConsumptionTaxSettingService.updateDateFacility(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  DeleteDateFacility(data) {
    return FacilityConsumptionTaxSettingService.deleteDateFacility(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  AddNewDateConsumptionTax(data) {
    return FacilityConsumptionTaxSettingService.addNewDateConsumptionTax(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  UpdateDateConsumptionTax(data) {
    return FacilityConsumptionTaxSettingService.updateDateConsumptionTax(data) 
  },

  DeleteDateConsumptionTax(data) {
    return FacilityConsumptionTaxSettingService.deleteDateConsumptionTax(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  GetConsumptionTax(data) {
    return FacilityConsumptionTaxSettingService.getConsumptionTax(data)
      .then((res) => {
        return res?.data;
      })
      .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
          message.error("エラーが発生しました");
          return;
        }
        message.error(res.data.message);
      });
  },

  UpdateConsumptionTax(data) {
    return FacilityConsumptionTaxSettingService.updateConsumptionTax(data) 
  }
}

export default FacilityConsumptionTaxSettingAction;