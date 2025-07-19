<template>
  <div class="container my-5">
    <h2 class="mb-4">Liste des Réservations</h2>

    <div v-if="loading" class="alert alert-info">Chargement...</div>
    <div v-if="error" class="alert alert-danger">{{ error }}</div>

    <table v-if="!loading && reservations.length" class="table table-striped table-bordered">
      <thead class="table-light">
        <tr>

          <th>Nom</th>
          <th>Personnes</th>
          <th>Téléphone</th>
          <th>Heure</th>
          <th>Date</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="r in reservations" :key="r.id">

          <td>{{ r.name }}</td>
          <td>{{ r.nbr_personne }}</td>
          <td>{{ r.phone_number }}</td>
          <td>{{ r.heure }}</td>
          <td>{{ formatDate(r.date) }}</td>
          <td>
            <button class="btn btn-sm btn-danger" @click="deleteReservation(r.id)">
              Supprimer
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="!loading && !reservations.length" class="alert alert-warning">
      Aucune réservation trouvée.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const reservations = ref([])
const loading = ref(false)
const error = ref(null)

const API_GET = 'http://localhost:3000/reservations'
const API_DELETE = 'http://localhost:3000/reservation'

const fetchReservations = async () => {
  loading.value = true
  try {
    const response = await axios.get(API_GET)
    reservations.value = response.data
  } catch (err) {
    error.value = 'Erreur lors du chargement des réservations.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deleteReservation = async (id) => {
  if (!confirm('Confirmer la suppression ?')) return
  try {
    await axios.delete(`${API_DELETE}/${id}`)
    reservations.value = reservations.value.filter(r => r.id !== id)
  } catch (err) {
    error.value = 'Erreur lors de la suppression.'
    console.error(err)
  }
}

const formatDate = (datetime) => {
  return datetime?.split('T')[0] || ''
}

const formatTime = (datetime) => {
  return datetime?.split('T')[1]?.slice(0, 8) || ''
}

onMounted(fetchReservations)
</script>
