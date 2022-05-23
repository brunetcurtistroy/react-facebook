import axios from "configs/axios";

const API_GENERAL_MENU = "/api/menus/general";

export const MenuService = {
  getGeneralMenu
};

function getGeneralMenu() {
  return axios.get(API_GENERAL_MENU);
}

export default MenuService;
