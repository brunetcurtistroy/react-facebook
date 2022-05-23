import axios from "configs/axios";

const APP_LIST = {
  getInit : "/api/xml-param-maintain/input",
  getOptionInput : "/api/xml-param-maintain/input/option-input",
  save: "/api/xml-param-maintain/input/save-and-update", 
  delete :"/api/xml-param-maintain/input/delete", 
  deleteOption :"/api/xml-param-maintain/input/delete-option-input",
  saveOption:"/api/xml-param-maintain/input/save-and-update-option-input"
};

const InputService = {
  async getInit(params){
    return axios.get(APP_LIST.getInit ,{params});
  },
  async getOptionInput(params){
    return axios.get(APP_LIST.getOptionInput ,{params});
  },
  async save(data){
    return axios.post(APP_LIST.save, data);
  }, 
  async delete(data){
    return axios.delete(APP_LIST.delete, {data});
  },
  async deleteOption(data){
    return axios.delete(APP_LIST.deleteOption, {data});
  },
  async saveOption(data){
    return axios.post(APP_LIST.saveOption, data);
  },
}; 
export default InputService;
