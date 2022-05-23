import axios from "configs/axios";

const API_LIST = {
  GetScreenData: "/api/personal-reserve-process/list",
};

const ListService = {
  async GetScreenData () {
    return axios.get(API_LIST.GetScreenData  );
  },
};

export default ListService;
