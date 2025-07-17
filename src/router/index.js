import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'
import ContactPage from '../views/ContactPage.vue'
import ReservationForm from '../components/ReservationForm.vue' 

const routes = [
  { path: '/', component: Home },
  { path: '/gallery', component: Gallery },
  { path: '/contact', component: ContactPage },
  { path: '/reservation', name : 'Reservation' ,component: ReservationForm },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
