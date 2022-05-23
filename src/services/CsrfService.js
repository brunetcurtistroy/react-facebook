import axios from 'configs/axios';
import ApiPaths from "../constants/ApiPaths";

const CsrfService = {
  CreateCSRFCookie() {
    return axios.get(ApiPaths.SANCTUM.CSRF_COOKIE);
  }
}

export default CsrfService;
