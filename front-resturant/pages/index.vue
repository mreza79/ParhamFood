<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="6" md="8" style="max-width: 60%">
        <v-card justify-center style="margin-top: 10%">
          <v-card-title class="headline justify-center">
            داشبورد مدیران
          </v-card-title>
          <v-card-text>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn @click="login()">ورود</v-btn>
            <v-btn @click="signup()">ثبت نام</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-snackbar
      v-model="snackbar"
      :timeout="timeout"
    >
      {{ snackText }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue"
          text
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>

  export default {
    layout: "noNav",
    data() {
      return {
      
      }
    },
    mounted() {
      this.$vuetify.rtl = true
    },
    methods: {
    login(){
       this.$router.push('/login')
    },
    signup(){
       this.$router.push('/signup')
    }
    }
  }
</script>
