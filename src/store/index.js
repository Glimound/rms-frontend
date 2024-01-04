import { officeSpacesService, researchLaboratoriesService } from '@/services/apiServices'
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
    labNameOptions: []
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
    }
  },
  modules: {
  }
})
