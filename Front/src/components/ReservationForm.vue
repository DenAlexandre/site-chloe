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
                <input type="time" class="form-control" v-model="form.heure" required />
              </div>

              <!-- Nombre de personnes -->
              <div class="mb-3">
                <label class="form-label">Nombre de personnes</label>
                <select class="form-select" v-model.number="form.nbr_personne" required>
                  <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
                </select>
              </div>

              <!-- Téléphone -->
              <div class="mb-3">
                <label class="form-label">Téléphone *</label>
                <input
                  type="tel"
                  class="form-control"
                  v-model="form.phone_number"
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

const form = reactive(
{
  "name" : "Denis", 
  "nbr_personne" : 2, 
  "phone_number" : "0612121212", 
  "date" : "2025-07-14",
  "heure" : "10:03:00"
}
)

const message = ref('')
const success = ref(false)


async function submitReservation() {
  try {

    const response = await axios.post(API_POST, form, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      console.log('Réponse du serveur :', response.data);
    })
    .catch(error => {
      console.error('Erreur lors de la requête :', error);
    });




    message.value = 'Réservation envoyée avec succès !'
    success.value = true

    // Reset form
    form.date = ''
    form.heure = ''
    form.nbr_personne = 1
    form.phone_number = ''

  } catch (err) {
    console.error(err)
    message.value = 'Une erreur est survenue lors de la réservation.'
    success.value = false
  }
}
</script>
