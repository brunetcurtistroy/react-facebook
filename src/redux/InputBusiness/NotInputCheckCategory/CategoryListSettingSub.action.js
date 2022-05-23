import { message } from "antd";
import CategoryListSettingSubService from "services/InputBusiness/NotInputCheckCategory/CategoryListSettingSubService";

const CategoryListSettingSubAction = {
    getListData(data) {
        return CategoryListSettingSubService.GetListData(data)
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

    saveListData(data) {
        return CategoryListSettingSubService.SaveListData(data)
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
    GetCategorySearchQuery(data) {
        return CategoryListSettingSubService.GetCategorySearchQuery
            (data)
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
 
}

export default CategoryListSettingSubAction;