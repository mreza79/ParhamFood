<template style="height: 100vh">
  <v-app dark id="mainApp" fluid fill-height>
    <v-app-bar
      color=#242f37
      dark
      app
      height="60px"
      width="100%"
    >
      <!--      <img :src="require('../assets/viva_logo.png')" height="58">-->
      <v-toolbar-title style="color: #ffffff">
        داشبورد مدیریت
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn @click="logout()" color="transparent" style="color: #ffffff;box-shadow:none; margin-left: 10px">
        خروج
      </v-btn>
      <v-icon @click="goBack()" color="#ed1d24">mdi-arrow-left-circle</v-icon>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <nuxt/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
  export default {
    name: "bar",
    mounted() {

      this.$vuetify.rtl = true

    },
    data() {
      return {
        clipped: false,
        drawer: false,
        fixed: false,
        right: null,
        editProfileDialog: false,
        logOutDialog: false,
        snackText: null,
        snackbar: false,
        multiLine: true,
      }
    },
    methods: {
      goBack() {
        window.history.back();
      },
      async logout() {
        await this.$router.push("/")
      }
    }
  }
</script>
<style scoped>
  #mainApp {
    height: 100%;
    width: 100%;
    background-color: #636a6f;
  }
</style>
