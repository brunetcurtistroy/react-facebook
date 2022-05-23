import axios from "configs/axios";

const APP_LIST = {
  getInit:"/api/xml-param-maintain/input-list",
  save:"/api/xml-param-maintain/input-list/save-and-update", 
  delete:'/api/xml-param-maintain/input-list/delete'
};

const InputListService = {
  async getInit(params){
    return axios.get(APP_LIST.getInit ,{params});
  },
  async save(data){
    return axios.post(APP_LIST.save,  data );
  },
  async Delete(data){
    return axios.delete(APP_LIST.delete,  {data} );
  },
};

export default InputListService;
