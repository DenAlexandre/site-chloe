<template>
  <div>
    <header class="nav-bar">
      <div class="logo">Restaurant de Chloé</div>
      <button class="burger" @click="toggleMenu">☰</button>
      <nav :class="['nav-links', { open: isOpen }]">
        <router-link to="/" @click="closeMenu">Accueil</router-link>
        <router-link to="/gallery" @click="closeMenu">Galerie</router-link>
        <router-link to="/contact" @click="closeMenu">Contact</router-link>
        <router-link to="/admin" @click="closeMenu">Admin</router-link>
      </nav>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false
    }
  },
  methods: {
    toggleMenu() {
      this.isOpen = !this.isOpen
    },
    closeMenu() {
      this.isOpen = false
    }
  }
}
</script>

<style scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #2c3e50;
  color: white;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  position: relative;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.burger {
  display: none;
  font-size: 1.8rem;
  background: none;
  color: white;
  border: none;
  cursor: pointer;
}

.nav-links {
  display: flex;
  gap: 2rem;
}

.nav-links a {
  text-decoration: none;
  color: white;
  transition: color 0.3s;
}

.nav-links a.router-link-exact-active {
  color: #f39c12;
}

/* Responsive */
@media (max-width: 768px) {
  .burger {
    display: block;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: #2c3e50;
    flex-direction: column;
    width: 200px;
    display: none;
    padding: 1rem;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
  }

  .nav-links.open {
    display: flex;
  }

  .nav-links a {
    margin: 0.5rem 0;
  }
}
</style>
