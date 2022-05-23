import axios from "configs/axios";

const APP_LIST = {
  getInit:"/api/user-param-maintain",
  save:"/api/user-param-maintain/save"
};

const UserParamMaintainService = {
  async getInit() {
    return axios.get(APP_LIST.getInit );
  },
  async save(data) {
    return axios.post(APP_LIST.save,  {data:data  }  );
  }
};

export default UserParamMaintainService;
