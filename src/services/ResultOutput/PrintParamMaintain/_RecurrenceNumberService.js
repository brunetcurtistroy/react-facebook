import axios from "configs/axios";

const APP_LIST = {
    reCurrenceNumConfirmed:"/api/print-param-maintain/recurrence-number/reCurrenceNumConfirmed",
    recurrenceNumUpdate:"/api/print-param-maintain/recurrence-number/recurrenceNumUpdate"
};
const RecurrenceNumberService = {
    async reCurrenceNumConfirmed(data) {
      return axios.get(APP_LIST.reCurrenceNumConfirmed, data );
    },
    async recurrenceNumUpdate(data) {
        return axios.get(APP_LIST.recurrenceNumUpdate, data );
    },
  };
  
  export default RecurrenceNumberService;