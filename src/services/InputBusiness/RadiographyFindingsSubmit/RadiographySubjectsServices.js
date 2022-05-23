import axios from "configs/axios";

const apiPaths = {
  radiographySubjects: "/api/radiography-findings-submit/radiography-subjects"
}

const RadiographySubjectsServices = {
    async radiographySubjectService(params) {
        return axios.get(apiPaths.radiographySubjects, {params});
      },
}

export default RadiographySubjectsServices;