import { clientsService, officeSpacesService, researchLaboratoriesService, collaboratorsService } from '@/services/apiServices'
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
    collaborator: {}
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
    }
  },
  modules: {
  }
})
