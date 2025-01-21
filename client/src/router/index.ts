import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import LoginView from '../views/LoginView.vue';
import RegisterView from '../views/RegisterView.vue';
import AppointmentsView from '../views/AppointmentsView.vue';
import AppointmentsFormView from '../views/AppointmentsFormView.vue';
import PatientsView from '../views/PatientsView.vue';
import PatientsFormView from '../views/PatientsFormView.vue';
import DoctorsView from '../views/DoctorsView.vue';
import DoctorsFormView from '../views/DoctorsFormView.vue';
import SpecializationsView from '../views/SpecializationsView.vue';
import SpecializationsFormView from '../views/SpecializationsFormView.vue';
import { checkIsAuth, checkIsGuest } from './protection';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    beforeEnter: checkIsGuest
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    beforeEnter: checkIsGuest
  },
  {
    path: '/appointments',
    name: 'appointments',
    component: AppointmentsView,
    beforeEnter: checkIsAuth
  },
  {
    path: '/appointmentsForm/:id?',
    name: 'appointmentsForm',
    component: AppointmentsFormView,
    beforeEnter: checkIsAuth
  },
  {
    path: '/patients',
    name: 'patients',
    component: PatientsView,
    beforeEnter: checkIsAuth
  },
  {
    path: '/patientsForm/:id?',
    name: 'patientsForm',
    component: PatientsFormView,
    beforeEnter: checkIsAuth
  },
  {
    path: '/doctors',
    name: 'doctors',
    component: DoctorsView,
    beforeEnter: checkIsAuth
  },
  {
    path: '/doctorsForm/:id?',
    name: 'doctorsForm',
    component: DoctorsFormView,
    beforeEnter: checkIsAuth
  },
  {
    path: '/specializations',
    name: 'specializations',
    component: SpecializationsView,
    beforeEnter: checkIsAuth
  },
  {
    path: '/specializationsForm/:id?',
    name: 'specializationsForm',
    component: SpecializationsFormView,
    beforeEnter: checkIsAuth
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
