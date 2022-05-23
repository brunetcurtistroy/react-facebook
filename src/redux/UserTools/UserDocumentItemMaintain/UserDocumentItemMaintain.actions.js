import UserDocumentItemMaintainService from "services/UserTools/UserDocumentItemMaintain/UserDocumentItemMaintainService"
import { message } from "antd";

const UserDocumentItemMaintainAction = {
    getInitTreeData() {
        return UserDocumentItemMaintainService.getInitTreeData()
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    getListTableBySearch(data) {
        return UserDocumentItemMaintainService.getListTableBySearch(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    save(data) {
        return UserDocumentItemMaintainService.save(data)
            .then((res) => {
                return res?.data;
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    },
    delete(data) {
        return UserDocumentItemMaintainService.delete(data)
            .then((res) => { 
            })
            .catch((err) => {
                message.error(err.response.data.message);
                console.log(err.response.data.message);
            });
    }
   
}
export default UserDocumentItemMaintainAction;