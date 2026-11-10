<script setup>

</script>

<template>
  <!-- Describe the project and its main features. -->
  <v-container class="about-page py-10">
    <div class="about-card">
      <p class="about-label">
        THE LANDS BETWEEN
      </p>

      <h1>About the project</h1>

      <p>
        Welcome to Elden Ring Bosses, a place to explore the enemies
        waiting for you across the Lands Between.
      </p>

      <p>
        Search for bosses, filter them by region, discover their details,
        and save your favorites.
      </p>

      <p>
        Use the interactive map to explore boss locations and mark
        the encounters you have completed.
      </p>

      <div class="about-divider" />

      <p class="about-note">
        This website was created as a school project using Vue and Vuetify.
      </p>

      <v-btn
        class="mt-4"
        to="/"
        variant="outlined"
      >
        Explore bosses
      </v-btn>
    </div>
  </v-container>
</template>

<style scoped>
.about-page {
  max-width: 900px;
}

.about-card {
  padding: 40px;
  background-color: #1c1b19;
  border: 1px solid #554a32;
  border-radius: 12px;
  color: #eee8da;
}

.about-label {
  margin-bottom: 8px;
  color: #c8aa6e;
  font-size: 0.8rem;
  letter-spacing: 0.2em;
}

.about-card h1 {
  margin-bottom: 24px;
  color: #e0c58a;
  font-size: 2.5rem;
}

.about-card p:not(.about-label) {
  margin-bottom: 16px;
  line-height: 1.7;
}

.about-divider {
  margin: 24px 0;
  border-top: 1px solid #554a32;
}

.about-note {
  color: #c9c2b5;
}

@media (max-width: 600px) {
  .about-card {
    padding: 24px;
  }
}
</style>
