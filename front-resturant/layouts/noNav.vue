<template>
  <v-app dark id="mainApp" fluid>
<!--    <v-app-bar-->
<!--      color=#242f37-->
<!--      light-->
<!--      app-->
<!--      height="60px"-->
<!--      width="100%"-->
<!--    >-->
      <!--      <img :src="require('../assets/viva_logo.png')" height="58">-->
<!--      <v-toolbar-title style="color: #ffffff">-->
<!--        adminDashboard-->
<!--      </v-toolbar-title>-->
      <!--      <img :src="require('../static/VIVA.png')" height="45" width="90">-->
<!--    </v-app-bar>-->
    <v-main>
      <v-container>
        <nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "noNav",
  }
</script>

<style scoped>
  #mainApp {
  height: 100%;
    /*background-image:*/
  }
</style>
