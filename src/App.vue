<template>
  <div id="app">
    <v-app>
      <v-main>
        <router-view/>
      </v-main>
    </v-app>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
@font-face {
  font-family: "Montserrat Regular";
  src: url("./assets/fonts/Montserrat-Regular.ttf");
}
@font-face {
  font-family: "Montserrat Bold";
  src: url("./assets/fonts/Montserrat-Bold.ttf");
}
#app {
  font-family: 'Montserrat Regular', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.header-title {
  font-size: 2rem;
}

.primary-title {
  font-size: 3rem;
}
.secondary-title {
  font-size: 1.2rem;
}
.header-title , .primary-title, .secondary-title {
  font-family: 'Montserrat Bold', sans-serif;
}
</style>
