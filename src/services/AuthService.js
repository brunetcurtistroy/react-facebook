import axios from 'configs/axios';
import CsrfService from './CsrfService';
import ApiPaths from "../constants/ApiPaths";
import Variables from "../constants/Variables";

/**
 * Send login information for authenticate
 */
const AuthService = {
	async login(formData) {
		await CsrfService.CreateCSRFCookie().then(() => {
			return axios.post(ApiPaths.USE.LOGIN, formData);
		});
	},

	async logout() {
		await CsrfService.CreateCSRFCookie();
		
		axios.post(ApiPaths.USER.LOGOUT).then(() => {
			sessionStorage.setItem(Variables.SESSION_ITEM.LOGGED_IN, false);

			return true;
		}).catch((error) => {
			return false;
		});
	},

	getUserInfo() {
		return axios.get(ApiPaths.USER.INFO);
	},

	isAuthenticated() {
		return sessionStorage.getItem(Variables.SESSION_ITEM.LOGGED_IN) === 'true' || false;
	}
}

export default AuthService;
