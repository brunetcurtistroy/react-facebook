import axios from "configs/axios";

const APP_LIST = {
  getInit:"/api/xml-param-maintain",
  save:"/api/xml-param-maintain/save",
  delete:"/api/xml-param-maintain/delete"
};

const XmlParamMaintainService = {
  async getInit(){
    return axios.get(APP_LIST.getInit );
  },
  async save(data){
    return axios.post(APP_LIST.save,  {data : data  }  );
  },
  async delete(data){ 
    return axios.delete(APP_LIST.delete, {data} );
  }
};

export default XmlParamMaintainService;
