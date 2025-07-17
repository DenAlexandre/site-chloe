<template>
  <div class="carousel-container">
    <!-- Image actuelle -->
    <div class="image-wrapper" @click="openFullscreen(currentImage)">
      <img :src="currentImage" alt="Image actuelle" />
    </div>

    <!-- Navigation -->
    <button class="nav-button left" @click="prevImage">&#10094;</button>
    <button class="nav-button right" @click="nextImage">&#10095;</button>

    <!-- Fullscreen overlay -->
    <div v-if="fullscreenImage" class="overlay" @click.self="closeFullscreen">
      <button class="close-btn" @click="closeFullscreen">&times;</button>
      <img :src="fullscreenImage" class="fullscreen-img" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const images = [
  'https://picsum.photos/1200/500?random=1',
  'https://picsum.photos/1200/500?random=2',
  'https://picsum.photos/1200/500?random=3',
  'https://picsum.photos/1200/500?random=4',
]

const index = ref(0)
const fullscreenImage = ref(null)

const currentImage = computed(() => images[index.value])

function nextImage() {
  index.value = (index.value + 1) % images.length
}

function prevImage() {
  index.value = (index.value - 1 + images.length) % images.length
}

function openFullscreen(image) {
  fullscreenImage.value = image
  document.body.style.overflow = 'hidden'
}

function closeFullscreen() {
  fullscreenImage.value = null
  document.body.style.overflow = ''
}
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  max-width: 1000px;
  margin: auto;
  padding: 1rem 0;
}

.image-wrapper {
  cursor: pointer;
  overflow: hidden;
  border-radius: 12px;
}

.image-wrapper img {
  width: 100%;
  height: auto;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.image-wrapper:hover img {
  transform: scale(1.02);
}

.nav-button {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  font-size: 2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  z-index: 10;
}

.left {
  left: 10px;
}

.right {
  right: 10px;
}

/* Fullscreen overlay */
.overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.fullscreen-img {
  max-width: 90%;
  max-height: 90%;
  border-radius: 12px;
  box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
}

/* Close button */
.close-btn {
  position: absolute;
  top: 20px;
  right: 30px;
  font-size: 3rem;
  color: white;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 1001;
}
</style>
