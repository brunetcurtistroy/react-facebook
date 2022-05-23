import axios from 'configs/axios';

const apiPaths = {
  getCourses: '/api/contract-info-batch-process/basic-course-inquiry',
};

const BasicCourseInquiryService = {
  async getCourses(params) {
    return axios.get(apiPaths.getCourses, { params });
  },
};

export default BasicCourseInquiryService;
