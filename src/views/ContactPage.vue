<template>
  <div class="contact-page">
    <h2>Chloé Restau</h2>
    <p class="address">{{ address }}</p>

    <div id="map" style="height: 400px; margin-bottom: 30px;"></div>

    <h2>Contactez-nous</h2>
    <form @submit.prevent="handleSubmit" class="contact-form">
      <div>
        <label for="name">Nom :</label>
        <input id="name" v-model="form.name" required />
      </div>

      <div>
        <label for="email">Email :</label>
        <input id="email" type="email" v-model="form.email" required />
      </div>

      <div>
        <label for="message">Message :</label>
        <textarea id="message" v-model="form.message" rows="4" required></textarea>
      </div>

      <button type="submit">Envoyer</button>
    </form>
  </div>
</template>

<script>
import L from 'leaflet'
import axios from 'axios'
import 'leaflet/dist/leaflet.css'

// Patch icônes Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

export default {
  name: 'ContactPage',
  data() {
    return {
      address: '10 rue de la Paix, 75002 Paris, France',
      form: {
        name: '',
        email: '',
        message: '',
      },
      map: null,
      marker: null,
    }
  },
  mounted() {
    this.geocodeAddress()
  },
  methods: {
    async geocodeAddress() {
      try {
        const res = await axios.get('https://nominatim.openstreetmap.org/search', {
          params: {
            q: this.address,
            format: 'json',
            limit: 1,
          },
        })

        if (res.data && res.data.length > 0) {
          const { lat, lon } = res.data[0]
          this.initMap(lat, lon)
        } else {
          console.error('Adresse non trouvée')
        }
      } catch (err) {
        console.error('Erreur de géocodage', err)
      }
    },
    initMap(lat, lon) {
      this.map = L.map('map').setView([lat, lon], 16)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap',
      }).addTo(this.map)

      this.marker = L.marker([lat, lon]).addTo(this.map)
        .bindPopup(this.address)
        .openPopup()
    },
    handleSubmit() {
      // Pour démo : simplement une alerte
      alert(`Message envoyé par ${this.form.name} (${this.form.email}) :\n${this.form.message}`)

      // Réinitialise le formulaire
      this.form.name = ''
      this.form.email = ''
      this.form.message = ''
    },
  },
}
</script>

<style scoped>
.contact-page {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}
.address {
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 10px;
}
.contact-form {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}
button {
  padding: 10px;
  background-color: #2e86de;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
button:hover {
  background-color: #1b4f72;
}
</style>
