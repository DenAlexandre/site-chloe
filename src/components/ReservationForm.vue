<template>
  <div class="container py-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card shadow-sm">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">Réserver une table</h2>

            <form @submit.prevent="submitReservation">
              <!-- Date -->
              <div class="mb-3">
                <label class="form-label">Date</label>
                <input type="date" class="form-control" v-model="form.date" required />
              </div>

              <!-- Heure -->
              <div class="mb-3">
                <label class="form-label">Heure</label>
                <input type="time" class="form-control" v-model="form.time" required />
              </div>

              <!-- Nombre de personnes -->
              <div class="mb-3">
                <label class="form-label">Nombre de personnes</label>
                <select class="form-select" v-model.number="form.people" required>
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>

              <!-- Téléphone -->
              <div class="mb-3">
                <label class="form-label">Téléphone *</label>
                <input
                  type="tel"
                  class="form-control"
                  v-model="form.phone"
                  required
                  pattern="^[0-9\s\+\-]{6,15}$"
                  placeholder="+33 6 12 34 56 78"
                />
              </div>

              <!-- Message -->
              <div v-if="message" :class="['alert', success ? 'alert-success' : 'alert-danger']">
                {{ message }}
              </div>

              <!-- Bouton -->
              <button type="submit" class="btn btn-primary w-100">
                Réserver maintenant
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import axios from 'axios'

const form = reactive({
  date: '',
  time: '',
  people: 1,
  phone: '',
})

const message = ref('')
const success = ref(false)

const API_URL = 'https://api.example.com/reservations' // 🔁 à remplacer

async function submitReservation() {
  try {
    const response = await axios.post(API_URL, form)
    message.value = 'Réservation envoyée avec succès !'
    success.value = true

    // Reset form
    form.date = ''
    form.time = ''
    form.people = 1
    form.phone = ''
  } catch (err) {
    console.error(err)
    message.value = 'Une erreur est survenue lors de la réservation.'
    success.value = false
  }
}
</script>
