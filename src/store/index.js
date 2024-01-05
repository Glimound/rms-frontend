import { clientsService, officeSpacesService, researchLaboratoriesService, collaboratorsService, researchAchievementsService } from '@/services/apiServices'
import { qualityMonitorsService, secretariesService, scientificResearchersService, researchProjectsService } from '@/services/apiServices'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    recordCounts: 0,
    tmpPage: 1,
    tmpPageSize: 10,

    officeSpaces: [],
    officeSpace: {},
    labNameOptions: [],

    clients: [],
    client: {},

    collaborators: [],
    collaborator: {},

    qualityMonitors: [],
    qualityMonitor: {},

    secretary: {},
    secretaries: [],
    labNameWithNoSecretaryOptions: [],

    scientificResearchers: [],
    scientificResearcher: {},

    researchAchievements: [],
    researchAchievement: {},
    projectOptions: [],
    ownResearcherOptions: [],

    researchLaboratories: [],
    researchLaboratory: {},
    secretaryOptions: [],
    officeSpaceOptions: [],
    freeResearcherOptions: [],
    labOwnResearcherOptions: [],

    researchProjects: [],
    researchProject: {},
    clientOptions: [],
    qualityMonitorOptions: [],
    collaboratorOptions: [],
    researcherOptions: [],
    subtopicResearcherOptions: []
  },
  getters: {
  },
  mutations: {
    setRecordCounts(state, recordCounts) {
      state.recordCounts = recordCounts
    },
    setTmpPage(state, tmpPage) {
      state.tmpPage = tmpPage
    },
    setTmpPageSize(state, tmpPageSize) {
      state.tmpPageSize = tmpPageSize
    },

    setOfficeSpaces(state, officeSpaces) {
      state.officeSpaces = officeSpaces
    },
    setOfficeSpace(state, officeSpace) {
      state.officeSpace = officeSpace
    },
    setLabNameOptions(state, labNameOptions) {
      state.labNameOptions = labNameOptions
    },

    setClients(state, clients) {
      state.clients = clients
    },
    setClient(state, client) {
      state.client = client
    },

    setCollaborators(state, collaborators) {
      state.collaborators = collaborators
    },
    setCollaborator(state, collaborator) {
      state.collaborator = collaborator
    },

    setQualityMonitors(state, qualityMonitors) {
      state.qualityMonitors = qualityMonitors
    },
    setQualityMonitor(state, qualityMonitor) {
      state.qualityMonitor = qualityMonitor
    },

    setSecretary(state, secretary) {
      state.secretary = secretary
    },
    setSecretaries(state, secretaries) {
      state.secretaries = secretaries
    },
    setLabNameWithNoSecretaryOptions(state, labNameWithNoSecretaryOptions) {
      state.labNameWithNoSecretaryOptions = labNameWithNoSecretaryOptions
    },

    setScientificResearchers(state, scientificResearchers) {
      state.scientificResearchers = scientificResearchers
    },
    setScientificResearcher(state, scientificResearcher) {
      state.scientificResearcher = scientificResearcher
    },

    setResearchAchievements(state, researchAchievements) {
      state.researchAchievements = researchAchievements
    },
    setResearchAchievement(state, researchAchievement) {
      state.researchAchievement = researchAchievement
    },
    setProjectOptions(state, projectOptions) {
      state.projectOptions = projectOptions
    },
    setOwnResearcherOptions(state, ownResearcherOptions) {
      state.ownResearcherOptions = ownResearcherOptions
    },

    setResearchLaboratories(state, researchLaboratories) {
      state.researchLaboratories = researchLaboratories
    },
    setResearchLaboratory(state, researchLaboratory) {
      state.researchLaboratory = researchLaboratory
    },
    setSecretaryOptions(state, secretaryOptions) {
      state.secretaryOptions = secretaryOptions
    },
    setOfficeSpaceOptions(state, officeSpaceOptions) {
      state.officeSpaceOptions = officeSpaceOptions
    },
    setFreeResearcherOptions(state, freeResearcherOptions) {
      state.freeResearcherOptions = freeResearcherOptions
    },
    setLabOwnResearcherOptions(state, labOwnResearcherOptions) {
      state.labOwnResearcherOptions = labOwnResearcherOptions
    },

    setResearchProjects(state, researchProjects) {
      state.researchProjects = researchProjects
    },
    setResearchProject(state, researchProject) {
      state.researchProject = researchProject
    },
    setClientOptions(state, clientOptions) {
      state.clientOptions = clientOptions
    },
    setQualityMonitorOptions(state, qualityMonitorOptions) {
      state.qualityMonitorOptions = qualityMonitorOptions
    },
    setCollaboratorOptions(state, collaboratorOptions) {
      state.collaboratorOptions = collaboratorOptions
    },
    setResearcherOptions(state, researcherOptions) {
      state.researcherOptions = researcherOptions
    },
    setSubtopicResearcherOptions(state, subtopicResearcherOptions) {
      state.subtopicResearcherOptions = subtopicResearcherOptions
    }
  },
  actions: {
    getAllOfficeSpaces(context, obj) {
      return new Promise((resolve) => {
        officeSpacesService.getAllOfficeSpaces(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setOfficeSpaces', data.data.officeSpaceList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      }) 
    },
    getOfficeSpace(context, id) {
      return new Promise((resolve) => {
        officeSpacesService.getOfficeSpace(id).then(({data}) => {
          context.commit('setOfficeSpace', data.data)
          resolve()
        })
      })
    },
    getLabNameOptions(context, str) {
      return new Promise((resolve) => {
        researchLaboratoriesService.getLabNameOptions(str).then(({data}) => {
          context.commit('setLabNameOptions', data)
          resolve()
        })
      })
    },

    getAllClients(context, obj) {
      return new Promise((resolve) => {
        clientsService.getAllClients(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setClients', data.data.clientList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getClient(context, name) {
      return new Promise((resolve) => {
        clientsService.getClient(name).then(({data}) => {
          context.commit('setClient', data.data)
          resolve()
        })
      })
    },

    getAllCollaborators(context, obj) {
      return new Promise((resolve) => {
        collaboratorsService.getAllCollaborators(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setCollaborators', data.data.collaboratorList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getCollaborator(context, name) {
      return new Promise((resolve) => {
        collaboratorsService.getCollaborator(name).then(({data}) => {
          context.commit('setCollaborator', data.data)
          resolve()
        })
      })
    },

    getAllQualityMonitors(context, obj) {
      return new Promise((resolve) => {
        qualityMonitorsService.getAllQualityMonitors(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setQualityMonitors', data.data.qualityMonitorList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getQualityMonitor(context, name) {
      return new Promise((resolve) => {
        qualityMonitorsService.getQualityMonitor(name).then(({data}) => {
          context.commit('setQualityMonitor', data.data)
          resolve()
        })
      })
    },

    getAllSecretaries(context, obj) {
      return new Promise((resolve) => {
        secretariesService.getAllSecretaries(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setSecretaries', data.data.secretaryList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getSecretary(context, id) {
      return new Promise((resolve) => {
        secretariesService.getSecretary(id).then(({data}) => {
          context.commit('setSecretary', data.data)
          resolve()
        })
      })
    },
    getLabNameWithNoSecretaryOptions(context, str) {
      return new Promise((resolve) => {
        researchLaboratoriesService.getLabNameWithNoSecretaryOptions(str).then(({data}) => {
          context.commit('setLabNameWithNoSecretaryOptions', data)
          resolve()
        })
      })
    },

    getAllScientificResearchers(context, obj) {
      return new Promise((resolve) => {
        scientificResearchersService.getAllScientificResearchers(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setScientificResearchers', data.data.scientificResearcherList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getScientificResearcher(context, id) {
      return new Promise((resolve) => {
        scientificResearchersService.getScientificResearcher(id).then(({data}) => {
          context.commit('setScientificResearcher', data.data)
          resolve()
        })
      })
    },

    getAllResearchAchievements(context, obj) {
      return new Promise((resolve) => {
        researchAchievementsService.getAllResearchAchievements(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setResearchAchievements', data.data.researchAchievementList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getResearchAchievement(context, id) {
      return new Promise((resolve) => {
        researchAchievementsService.getResearchAchievement(id).then(({data}) => {
          context.commit('setResearchAchievement', data.data)
          resolve()
        })
      })
    },
    getProjectOptions(context, str) {
      return new Promise((resolve) => {
        researchProjectsService.getProjectOptions(str).then(({data}) => {
          context.commit('setProjectOptions', data)
          resolve()
        })
      })
    },
    getOwnResearcherOptions(context, obj) {
      return new Promise((resolve) => {
        researchProjectsService.getOwnResearcherOptions(obj.str, obj.projectId).then(({data}) => {
          context.commit('setOwnResearcherOptions', data)
          resolve()
        })
      })
    },

    getAllResearchLaboratories(context, obj) {
      return new Promise((resolve) => {
        researchLaboratoriesService.getAllResearchLaboratories(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setResearchLaboratories', data.data.researchLaboratoryList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getResearchLaboratory(context, id) {
      return new Promise((resolve) => {
        researchLaboratoriesService.getResearchLaboratory(id).then(({data}) => {
          context.commit('setResearchLaboratory', data.data)
          resolve()
        })
      })
    },
    getSecretaryOptions(context, str) {
      return new Promise((resolve) => {
        secretariesService.getSecretaryOptions(str).then(({data}) => {
          context.commit('setSecretaryOptions', data)
          resolve()
        })
      })
    },
    getOfficeSpaceOptions(context, str) {
      return new Promise((resolve) => {
        officeSpacesService.getOfficeSpaceOptions(str).then(({data}) => {
          context.commit('setOfficeSpaceOptions', data)
          resolve()
        })
      })
    },
    getFreeResearcherOptions(context, str) {
      return new Promise((resolve) => {
        scientificResearchersService.getFreeResearcherOptions(str).then(({data}) => {
          context.commit('setFreeResearcherOptions', data)
          resolve()
        })
      })
    },
    getLabOwnResearcherOptions(context, obj) {
      return new Promise((resolve) => {
        scientificResearchersService.getLabOwnResearcherOptions(obj.str, obj.labName).then(({data}) => {
          context.commit('setLabOwnResearcherOptions', data)
          resolve()
        })
      })
    },

    getAllResearchProjects(context, obj) {
      return new Promise((resolve) => {
        researchProjectsService.getAllResearchProjects(obj.page, obj.pageSize).then(({data}) => {
          context.commit('setResearchProjects', data.data.researchProjectList)
          context.commit('setRecordCounts', data.data.count)
          resolve()
        })
      })
    },
    getResearchProject(context, id) {
      return new Promise((resolve) => {
        researchProjectsService.getResearchProject(id).then(({data}) => {
          context.commit('setResearchProject', data.data)
          resolve()
        })
      })
    },
    getClientOptions(context, str) {
      return new Promise((resolve) => {
        clientsService.getClientOptions(str).then(({data}) => {
          context.commit('setClientOptions', data)
          resolve()
        })
      })
    },
    getQualityMonitorOptions(context, str) {
      return new Promise((resolve) => {
        qualityMonitorsService.getQualityMonitorOptions(str).then(({data}) => {
          context.commit('setQualityMonitorOptions', data)
          resolve()
        })
      })
    },
    getCollaboratorOptions(context, str) {
      return new Promise((resolve) => {
        collaboratorsService.getCollaboratorOptions(str).then(({data}) => {
          context.commit('setCollaboratorOptions', data)
          resolve()
        })
      })
    },
    getResearcherOptions(context, str) {
      return new Promise((resolve) => {
        scientificResearchersService.getResearcherOptions(str).then(({data}) => {
          context.commit('setResearcherOptions', data)
          resolve()
        })
      })
    }
  },
  modules: {
  }
})
