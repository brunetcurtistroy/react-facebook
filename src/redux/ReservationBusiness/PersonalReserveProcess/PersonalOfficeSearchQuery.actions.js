import PersonalOfficeSearchQueryService from "services/ReservationBusiness/PersonalReserveProcess/PersonalOfficeSearchQueryService";
import { message } from "antd";

const PersonalOfficeSearchQueryAction = {
  GetIndex(data) {
    return PersonalOfficeSearchQueryService.getIndexService(data)
      .then((res) => {
          return res?.data;
      })
      .catch((err) => {
        message.error(err.response.data.message);
        console.log(err.response.data.message);
      });
  },
};

export default PersonalOfficeSearchQueryAction;