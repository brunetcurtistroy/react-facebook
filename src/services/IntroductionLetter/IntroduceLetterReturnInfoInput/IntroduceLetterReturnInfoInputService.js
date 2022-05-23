import axios from "configs/axios";

const API_LIST = {
  introduceLetterReturnInfoInput:
    "/api/introduce-letter-return-info-input/introduce-letter-return-info-input",
  askInput: '/api/introduce-letter-return-info-input/ask-input',
  returnInfoInput: '/api/introduce-letter-return-info-input/return-info-input',
};

const IntroduceLetterReturnInfoInputService = {
  async filterIntroduceLetterReturnInfoInputService(params) {
    console.log(params);
    return axios.get(API_LIST.introduceLetterReturnInfoInput, { params });
  },
  async fetchAskInputService(params) {
    return axios.get(API_LIST.askInput, { params })
  },
  async fetchReturnInfoInputService(params) {
    return axios.get(API_LIST.returnInfoInput, {params})
  }
};

export default IntroduceLetterReturnInfoInputService;
