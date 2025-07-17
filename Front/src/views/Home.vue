<template>
  <div>

    <div class="image-container">
      <img src="../assets/bieres.jpg" alt="Zoom" class="zoom-image" />

   <button class="overlay-button" @click="handleClick">
      <svg
        class="icon"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
      </svg>
      Réserver une table
    </button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
function handleClick() {
   //alert("Bouton cliqué !");
   router.push({ name: 'Reservation' }) // navigation par nom de route
}
</script>


<style scoped>
.image-container {
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  height: 768px;
  margin: 2rem auto;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.3);
}
.zoom-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(1);
  animation: slowZoom 10s ease-in-out infinite alternate;
}

@keyframes slowZoom {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.5);
  }
}


.overlay-button {
  position: absolute;
  top: 60%;
  left: 30%;
  display: flex;
  align-items: center;
  gap: 8px;
  background: linear-gradient(90deg, #2563eb, #3b82f6);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 12px 20px;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;
}

.overlay-button:hover {
  transform: scale(1.05);
  background: linear-gradient(90deg, #1e40af, #2563eb);
}

.icon {
  width: 20px;
  height: 20px;
}
</style>
