<script setup>
import TheNavbar       from './components/TheNavbar.vue'
import HeroSection     from './components/HeroSection.vue'
import AboutSection    from './components/AboutSection.vue'
import MenuSection     from './components/MenuSection.vue'
import TerrasseSection from './components/TerrasseSection.vue'
import EventsSection   from './components/EventsSection.vue'
import TheFooter       from './components/TheFooter.vue'
</script>

<template>
  <TheNavbar />

  <main>
    <HeroSection />
    <AboutSection />
    <MenuSection />
    <TerrasseSection />
    <EventsSection />
  </main>

  <TheFooter />
</template>

<style>
/* Supprime tout padding/margin résiduel autour du layout */
#app {
  min-height: 100svh;
  display: flex;
  flex-direction: column;
}

main {
  flex: 1;
}
</style>
