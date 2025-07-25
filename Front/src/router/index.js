import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Gallery from '../views/Gallery.vue'
import ImageCarouselForm from '../components/ImageCarousel.vue' 
import ReservationForm from '../components/ReservationForm.vue' 
import ReservationTable from '../components/ReservationTable.vue' 
import ContactPage from '../views/ContactPage.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/contact', component: ContactPage },
  { path: '/reservation', name : 'Reservation' ,component: ReservationForm },
  { path: '/gallery', name : 'Caroussel' ,component: ImageCarouselForm },
  { path: '/admin', name : 'Admin' ,component: ReservationTable },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
