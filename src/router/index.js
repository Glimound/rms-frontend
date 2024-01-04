import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '@/views/contentView/HomeView'
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
    name: 'home',
    component: HomeView,
    meta: {
      title: '主页'
    }
  },
  {
    path: '/client',
    name: 'client',
    component: ClientView,
    meta: {
      title: '委托方管理'
    }
  },
  {
    path: '/collaborator',
    name: 'collaborator',
    component: CollaboratorView,
    meta: {
      title: '合作方管理'
    }
  },
  {
    path: '/office-space',
    name: 'officeSpace',
    component: OfficeSpaceView,
    meta: {
      title: '办公场地管理'
    }
  },
  {
    path: '/quality-monitor',
    name: 'qualityMonitor',
    component: QualityMonitorView,
    meta: {
      title: '质量监测方管理'
    }
  },
  {
    path: '/research-project',
    name: 'researchProject',
    component: ResearchProjectView,
    meta: {
      title: '科研项目管理'
    }
  },
  {
    path: '/research-achievement',
    name: 'researchAchievement',
    component: ResearchAchievementView,
    meta: {
      title: '科研成果管理'
    }
  },
  {
    path: '/research-laboratory',
    name: 'researchLaboratory',
    component: ResearchLaboratoryView,
    meta: {
      title: '研究室管理'
    }
  },
  {
    path: '/scientific-researcher',
    name: 'scientificResearcher',
    component: ScientificResearcherView,
    meta: {
      title: '科研人员管理'
    }
  },
  {
    path: '/secretary',
    name: 'secretary',
    component: SecretaryView,
    meta: {
      title: '秘书管理'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
