import axios from "configs/axios";
import CsrfService from "./CsrfService";

import ApiPaths from "../constants/ApiPaths";

const UserService = {
  async login(user) {
    await CsrfService.CreateCSRFCookie();
    return axios.post(ApiPaths.USER.LOGIN, user);
  },

  async logout() {
    await CsrfService.CreateCSRFCookie();
    return axios.post(ApiPaths.USER.LOGOUT);
  },

  async createUserService(user) {
    return axios.post(ApiPaths.USER.CREATE, user);
  },

  async getListHopital() {
    return axios.get(ApiPaths.HOSPITAL.LIST);
  },

  async modifyUserPasswordService (user) {
    await CsrfService.CreateCSRFCookie();
    return axios.post(ApiPaths.MODIFY_USER_PASSWORD.LIST, user);
  },
  
  async getUserList({page, limit}){
    return axios.get(ApiPaths.USER.USERS, {
      params: {
        page, limit
      }
    });
  },

  async deleteUser(id){
    return axios.delete(ApiPaths.USER.USERS + '/' + id);
  },

  async getUserProfileService(userId) {
    return axios.get(ApiPaths.USER.USERS + '/' + userId);
  },

  async updateUserProfileService(userId, user) {
    return axios.put(ApiPaths.USER.USERS + '/' + userId, user);
  },

};

export default UserService;
