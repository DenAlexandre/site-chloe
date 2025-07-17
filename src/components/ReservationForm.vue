<template>
  <div class="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
    <h2 class="text-2xl font-bold mb-6 text-center">Réservation de Table</h2>

    <form @submit.prevent="submitReservation" class="space-y-4">
      <!-- Date -->
      <div>
        <label class="block mb-1 font-medium">Date</label>
        <input type="date" v-model="reservation.date" required class="input" />
      </div>

      <!-- Heure -->
      <div>
        <label class="block mb-1 font-medium">Heure</label>
        <input type="time" v-model="reservation.time" required class="input" />
      </div>

      <!-- Nombre de personnes -->
      <div>
        <label class="block mb-1 font-medium">Nombre de personnes</label>
        <select v-model.number="reservation.people" class="input">
          <option v-for="n in 10" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>

      <!-- Nom -->
      <div>
        <label class="block mb-1 font-medium">Nom complet *</label>
        <input type="text" v-model="reservation.name" required class="input" />
      </div>

      <!-- Téléphone -->
      <div>
        <label class="block mb-1 font-medium">Téléphone *</label>
        <input
          type="tel"
          v-model="reservation.phone"
          required
          pattern="^[0-9\s\+\-]{6,15}$"
          class="input"
        />
      </div>

      <!-- Message -->
      <div v-if="message" :class="{'text-green-600': success, 'text-red-600': !success}">
        {{ message }}
      </div>

      <!-- Bouton -->
      <button
        type="submit"
        class="w-full bg-blue-600 text-white text-lg font-semibold py-2 rounded hover:bg-blue-700 transition"
      >
        Réserver
      </button>
    </form>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const reservation = reactive({
  date: '',
  time: '',
  people: 1,
  name: '',
  phone: '',
})

const message = ref('')
const success = ref(false)

async function submitReservation() {
  if (!reservation.name || !reservation.phone) {
    message.value = 'Veuillez remplir les champs obligatoires.'
    success.value = false
    return
  }

  try {
    const response = await fetch('https://api.example.com/reservations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reservation),
    })

    if (!response.ok) throw new Error('Erreur serveur')

    message.value = 'Réservation envoyée avec succès !'
    success.value = true

    reservation.date = ''
    reservation.time = ''
    reservation.people = 1
    reservation.name = ''
    reservation.phone = ''
  } catch (error) {
    message.value = 'Erreur lors de la réservation.'
    success.value = false
  }
}
</script>

<style scoped>
.input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem;
  font-size: 1rem;
}
</style>
