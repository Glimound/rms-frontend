import Vue from 'vue'
import VueRouter from 'vue-router'
import NullContentView from '@/views/contentView/NullContentView'
import ClientView from '@/views/contentView/ClientView'
import CollaboratorView from '@/views/contentView/CollaboratorView'
import OfficeSpaceView from '@/views/contentView/OfficeSpaceView'
import QualityMonitorView from '@/views/contentView/QualityMonitorView'
import ResearchProjectView from '@/views/contentView/ResearchProjectView'
import ResearchAchievementView from '@/views/contentView/ResearchAchievementView'
import ResearchLaboratoryView from '@/views/contentView/ResearchLaboratoryView'
import ScientificResearcherView from '@/views/contentView/ScientificResearcherView'
import SecretaryView from '@/views/contentView/SecretaryView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'nullContent',
    component: NullContentView
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView
  },
  {
    path: '/collaborator',
    name: 'collaborator',
    component: CollaboratorView
  },
  {
    path: '/office-space',
    name: 'officeSpace',
    component: OfficeSpaceView
  },
  {
    path: '/quality-monitor',
    name: 'qualityMonitor',
    component: QualityMonitorView
  },
  {
    path: '/research-project',
    name: 'researchProject',
    component: ResearchProjectView
  },
  {
    path: '/research-achievement',
    name: 'researchAchievement',
    component: ResearchAchievementView
  },
  {
    path: '/research-laboratory',
    name: 'researchLaboratory',
    component: ResearchLaboratoryView
  },
  {
    path: '/scientific-researcher',
    name: 'scientificResearcher',
    component: ScientificResearcherView
  },
  {
    path: '/secretary',
    name: 'secretary',
    component: SecretaryView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
