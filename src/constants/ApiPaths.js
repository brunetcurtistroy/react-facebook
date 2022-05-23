const ApiPaths = {
  USER: {
    LOGIN: '/login',
    LOGOUT: '/logout',
    CREATE: '/api/users',
    USERS: '/api/users',
    INFO: '/api/user',
  },
  HOSPITAL: {
    LIST: '/api/hospital/list',
  },
  MENU: {
    LIST: '/api/menus/general',
  },
  MODIFY_USER_PASSWORD: {
    LIST: "/api/user/password"
  },
  SANCTUM: {
    CSRF_COOKIE: '/sanctum/csrf-cookie',
  },
  INSURER: {
    LIST: "/api/insurers",
    DETAIL: "/api/insurers/",
  },
  SITUATIONS: {
    LIST: '/api/various?node=状況区分'
  },
  DISTRICTS: {
    LIST: '/api/addresses/districts'
  },
  INDUSTRIES: {
    LIST: '/api/various?node=産業分類'
  },
  POSTAL_CODE: {
    PUBLICS: '/api/addresses/postal-codes/public',
    CITIES: '/api/addresses/postal-codes/public/city',
    AREAS: '/api/addresses/postal-codes/public/city/area',
  }
};

export default ApiPaths;
