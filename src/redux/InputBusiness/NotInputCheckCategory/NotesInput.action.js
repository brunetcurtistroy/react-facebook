import { message } from "antd";
import NotesInputService from "services/InputBusiness/NotInputCheckCategory/NotesInputService";

const NotesInputAction = {
  getListData(data) {
    return NotesInputService.ListData(data)
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
  saveData(data) {
    return NotesInputService.SaveData(data)
    .then()
    .catch((err) => {
        const res = err.response;
        if (!res || !res.data || !res.data.message) {
            message.error("エラーが発生しました");
            return;
        }
        message.error(res.data.message);
    });
},
deleteData(data) {
    return NotesInputService.DeletData(data).then()
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

export default NotesInputAction;