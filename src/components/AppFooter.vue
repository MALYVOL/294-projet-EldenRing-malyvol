<template>
  <v-footer
    app
    class="app-footer"
    height="40"
  >
    {{ new Date().getFullYear() }} - Created by Volodymyr Malyshev
  </v-footer>
</template>

<style scoped>
.app-footer {
  background-color: #1c1b19;
  border-top: 1px solid #554a32;
  color: #c9c2b5;
  justify-content: center;
}

.app-footer a {
  color: #d8bb80;
}

.app-footer a:hover {
  color: #f2dfb4;
}
</style>
