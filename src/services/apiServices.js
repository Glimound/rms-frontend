import axios from "axios";

const axiosClient = axios.create({
  baseURL: 'http://localhost:8080/api/',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
})

export const ApiService = {
  get(resource) {
    return axiosClient.get(resource)
  },
  query(resource, params) {
    return axiosClient.get(resource, {
      params: params
    })
  },
  post(resource, data) {
    return axiosClient.post(resource, data)
  },
  put(resource, data) {
    return axiosClient.put(resource, data)
  },
  delete(resource) {
    return axiosClient.delete(resource)
  }
}

export const secretariesService = {
  getSecretary(id) {
    return ApiService.get(`/secretaries/${id}`)
  },
  getAllSecretaries(page, pageSize) {
    return ApiService.query('/secretaries', {
      page: page,
      pageSize: pageSize
    })
  },
  updateSecretary(id, data) {
    return ApiService.put(`/secretaries/${id}`, data)
  },
  createSecretary(data) {
    return ApiService.post('/secretaries', data)
  },
  deleteSecretary(id) {
    return ApiService.delete(`/secretaries/${id}`)
  },
  getSecretaryOptions(str) {
    return ApiService.get(`/secretaries/secretary-options/${str}`)
  }
}

export const researchLaboratoriesService = {
  getResearchLaboratory(name) {
    return ApiService.get(`/research-laboratories/${name}`)
  },
  getAllResearchLaboratories(page, pageSize) {
    return ApiService.query('/research-laboratories', {
      page: page,
      pageSize: pageSize
    })
  },
  updateResearchLaboratory(name, data) {
    return ApiService.put(`/research-laboratories/${name}`, data)
  },
  createResearchLaboratory(data) {
    return ApiService.post('/research-laboratories', data)
  },
  deleteResearchLaboratory(name) {
    return ApiService.delete(`/research-laboratories/${name}`)
  },
  getLabNameOptions(str) {
    return ApiService.get(`/research-laboratories/lab-name-options/${str}`)
  },
  getLabNameWithNoSecretaryOptions(str) {
    return ApiService.get(`/research-laboratories/lab-name-with-no-secretary-options/${str}`)
  }
}

export const officeSpacesService = {
  getOfficeSpace(id) {
    return ApiService.get(`/office-spaces/${id}`)
  },
  getAllOfficeSpaces(page, pageSize) {
    return ApiService.query('/office-spaces', {
      page: page,
      pageSize: pageSize
    })
  },
  updateOfficeSpace(id, data) {
    return ApiService.put(`/office-spaces/${id}`, data)
  },
  createOfficeSpace(data) {
    return ApiService.post('/office-spaces', data)
  },
  deleteOfficeSpace(id) {
    return ApiService.delete(`/office-spaces/${id}`)
  },
  getOfficeSpaceOptions(str) {
    return ApiService.get(`/office-spaces/office-space-options/${str}`)
  }
}

export const scientificResearchersService = {
  getScientificResearcher(id) {
    return ApiService.get(`/scientific-researchers/${id}`)
  },
  getAllScientificResearchers(page, pageSize) {
    return ApiService.query('/scientific-researchers', {
      page: page,
      pageSize: pageSize
    })
  },
  updateScientificResearcher(id, data) {
    return ApiService.put(`/scientific-researchers/${id}`, data)
  },
  createScientificResearcher(data) {
    return ApiService.post('/scientific-researchers', data)
  },
  deleteScientificResearcher(id) {
    return ApiService.delete(`/scientific-researchers/${id}`)
  },
  getFreeResearcherOptions(str) {
    return ApiService.get(`/scientific-researchers/free-researcher-options/${str}`)
  },
  getLabOwnResearcherOptions(str, labName) {
    return ApiService.query(`/scientific-researchers/lab-own-researcher-options/${str}`, {
      labName: labName
    })
  },
  getResearcherOptions(str) {
    return ApiService.get(`/scientific-researchers/researcher-options/${str}`)
  }
}

export const clientsService = {
  getClient(name) {
    return ApiService.get(`/clients/${name}`)
  },
  getAllClients(page, pageSize) {
    return ApiService.query('/clients', {
      page: page,
      pageSize: pageSize
    })
  },
  updateClient(name, data) {
    return ApiService.put(`/clients/${name}`, data)
  },
  createClient(data) {
    return ApiService.post('/clients', data)
  },
  deleteClient(name) {
    return ApiService.delete(`/clients/${name}`)
  },
  getClientOptions(str) {
    return ApiService.get(`/clients/client-options/${str}`)
  }
}

export const collaboratorsService = {
  getCollaborator(name) {
    return ApiService.get(`/collaborators/${name}`)
  },
  getAllCollaborators(page, pageSize) {
    return ApiService.query('/collaborators', {
      page: page,
      pageSize: pageSize
    })
  },
  updateCollaborator(name, data) {
    return ApiService.put(`/collaborators/${name}`, data)
  },
  createCollaborator(data) {
    return ApiService.post('/collaborators', data)
  },
  deleteCollaborator(name) {
    return ApiService.delete(`/collaborators/${name}`)
  },
  getCollaboratorOptions(str) {
    return ApiService.get(`/collaborators/collaborator-options/${str}`)
  }
}

export const qualityMonitorsService = {
  getQualityMonitor(name) {
    return ApiService.get(`/quality-monitors/${name}`)
  },
  getAllQualityMonitors(page, pageSize) {
    return ApiService.query('/quality-monitors', {
      page: page,
      pageSize: pageSize
    })
  },
  updateQualityMonitor(name, data) {
    return ApiService.put(`/quality-monitors/${name}`, data)
  },
  createQualityMonitor(data) {
    return ApiService.post('/quality-monitors', data)
  },
  deleteQualityMonitor(name) {
    return ApiService.delete(`/quality-monitors/${name}`)
  },
  getQualityMonitorOptions(str) {
    return ApiService.get(`/quality-monitors/quality-monitor-options/${str}`)
  }
}

export const researchAchievementsService = {
  getResearchAchievement(id) {
    return ApiService.get(`/research-achievements/${id}`)
  },
  getAllResearchAchievements(page, pageSize) {
    return ApiService.query('/research-achievements', {
      page: page,
      pageSize: pageSize
    })
  },
  updateResearchAchievement(id, data) {
    return ApiService.put(`/research-achievements/${id}`, data)
  },
  createResearchAchievement(data) {
    return ApiService.post('/research-achievements', data)
  },
  deleteResearchAchievement(id) {
    return ApiService.delete(`/research-achievements/${id}`)
  }
}

export const researchProjectsService = {
  getResearchProject(id) {
    return ApiService.get(`/research-projects/${id}`)
  },
  getAllResearchProjects(page, pageSize) {
    return ApiService.query('/research-projects', {
      page: page,
      pageSize: pageSize
    })
  },
  updateResearchProject(id, data) {
    return ApiService.put(`/research-projects/${id}`, data)
  },
  createResearchProject(data) {
    return ApiService.post('/research-projects', data)
  },
  deleteResearchProject(id) {
    return ApiService.delete(`/research-projects/${id}`)
  },
  getProjectOptions(str) {
    return ApiService.get(`/research-projects/project-options/${str}`)
  },
  getOwnResearcherOptions(str, projectId) {
    return ApiService.query(`/research-projects/own-researcher-options/${str}`, {
      projectId: projectId
    })
  }
}