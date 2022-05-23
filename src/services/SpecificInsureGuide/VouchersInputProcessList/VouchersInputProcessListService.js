import axios from "configs/axios";

const APP_LIST = {
  displayButton:"/api/vouchers-input-process-list/display-button", 
};

const VouchersInputProcessListService = {
  async displayButton(data) {
    return axios.post(APP_LIST.displayButton, data );
  }, 
};

export default VouchersInputProcessListService;
