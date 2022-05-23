import { message } from "antd";
import NotesSetService from "services/InputBusiness/SpreadInput/NotesSetService";

const NotesSetAction = {  
    GetLisstNotesSetAction(data) {
      return NotesSetService.GetLisstNotesSetService(data)
        .then((res) => {
            return res?.data;
        })
        .catch((err) => {
          message.error(err.response.data.message);
        });
    },
    SaveDataAction(data) {
        return NotesSetService.SaveDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
      DeleteDataAction(data) {
        return NotesSetService.DeleteDataService(data)
          .then((res) => {
              return res?.data;
          })
          .catch((err) => {
            message.error(err.response.data.message);
          });
      },
  }
  
  export default NotesSetAction;