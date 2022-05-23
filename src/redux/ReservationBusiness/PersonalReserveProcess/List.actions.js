import ListService from "services/ReservationBusiness/PersonalReserveProcess/ListService";
import { message } from "antd";

const ListAction = {
    GetScreenData() {
    return ListService.GetScreenData()
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default ListAction;