import { message } from "antd";
import NotInputCheckCategoryService from "services/InputBusiness/NotInputCheckCategory/NotInputCheckCategoryService";

const NotInputCheckCategorytAction = {
  getScreenData() {
    return NotInputCheckCategoryService.GetScreenData()
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

  StatusList(data) {
    return NotInputCheckCategoryService.StatusList(data)
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
  f10(data) {
    return NotInputCheckCategoryService.f10(data)
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
  exportExcel(data) {
    return NotInputCheckCategoryService.ExportExcel(data)
        .then((res) => {
            return res;
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
  detailF7(data) {
    return NotInputCheckCategoryService.detailF7(data) 
  },

  detailF7After(data) {
    return NotInputCheckCategoryService.detailF7After(data) 
  },
}

export default NotInputCheckCategorytAction;
